import React, { useEffect, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import {
  IonRow,
  IonCol,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonInput,
  IonProgressBar,
} from '@ionic/react';
import progressBarStepTwo from '../../images/step-two.svg';
import progressBarSavedPayeeReviewDeselected from '../../images/saved-payee-review-deselected.svg';
import progressBarStepsAfterTwoDeselected from '../../images/steps-after-two-deselected.svg';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Spinner from '../Spinner';
import InputMask from 'react-input-mask';
import { isPlatform } from '@ionic/react';
import { BillPayStep } from '../../pages/BillPay';

interface Payee {
  Id: string, 
  Name: string,
  DeliveryMethod?: string, 
  To?: string, 
  MailingStreet?: string,
  MailingCity?: string,
  MailingState?: string,
  MailingZip?: string, 
  BankName?: string, 
  BankRoutingNumber?: string, 
  CreditAccountName?: string, 
  CreditAccountNumber?: string, 
  BankAccountType?: string,  
  PaymentMemo?: string, 
  BillPayment?: string, 
  Expense?: string,
  CO?: string 
}

interface BillPayWithFiles extends BillPayStep {
  files: Array<SFFile>, 
  setFiles: Function
}

const BillPayStepTwo: React.FC<BillPayWithFiles> = ({ formRef, billPayment, setErrorMessage, clearErrorMessage, step, files, setFiles, goToStep, billPaySteps }) => {
  const [payeeOptions, setPayeeOptions] = useState<Payee[]>([{
    Id: 'test', 
    Name: 'test'
  }]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const getDefaultValues = () => {
    return {
      savedPayeeId: '', 
      amount: 0.00,
      payment_memo: '',
      process_date: '',
      payable_to: '',
      tax_year: '',
      full_or_partial: '',
      ...billPayment
    }
  }
  
  const {control, setValue, handleSubmit, trigger, getValues, errors, setError, clearErrors} = useForm<Partial<BillPayment>> ({
    mode: "onChange",
    defaultValues: getDefaultValues()
  });
 
  useEffect(() => {
    const updateFormOnBack = () => {
      let data = getValues();
      let currentStepIndex = billPaySteps.indexOf(step);
      goToStep(data, billPaySteps[currentStepIndex - 1]);
    }
    window.addEventListener('onbackbuttonclick', updateFormOnBack);

    return () => {
      window.removeEventListener('onbackbuttonclick', updateFormOnBack);
    }
  }, [goToStep, billPaySteps, getValues, step]) 

  const onSubmit = (data: Partial<BillPayment>) => {
    let dataForBillPayment: Partial<BillPayment> = {...data };
    
    if (data.savedPayeeId && (data.savedPayeeId !== billPayment.savedPayeeId) && data.savedPayeeId !== 'Add Payee') {
      let savedPayeeInfo = getSavedPayeeInfo(data.savedPayeeId);
      dataForBillPayment = {
        ...dataForBillPayment, 
        ...savedPayeeInfo 
      }
    }

    let currentStepIndex = billPaySteps.indexOf(step);

    goToStep(dataForBillPayment, billPaySteps[currentStepIndex + 1]);
  } 

  const getSavedPayeeInfo = (id: string | undefined) => {
    const payeeOptionsClone = [...payeeOptions];
    const payeeChosen = payeeOptionsClone.filter(payee => payee.Id === id)[0];
      if (!payeeChosen) return; 
      
    let bankNameToDisplay = ''; 
    if (payeeChosen.BankName){
        bankNameToDisplay = payeeChosen.BankName
    }
    if (payeeChosen.CreditAccountName) {
        bankNameToDisplay = payeeChosen.CreditAccountName
    }
    let transformedPayeeInfo: Partial<BillPayment> = {
        payable_to: payeeChosen.To ? payeeChosen.To : '', 
        delivery_method: payeeChosen.DeliveryMethod ? payeeChosen.DeliveryMethod : '',
        mailing_street: payeeChosen.MailingStreet ? payeeChosen.MailingStreet : '', 
        mailing_city: payeeChosen.MailingCity ? payeeChosen.MailingStreet : '',
        mailing_state: payeeChosen.MailingState ? payeeChosen.MailingState : '',
        mailing_zip: payeeChosen.MailingZip ? payeeChosen.MailingZip : '',
        bank_name: bankNameToDisplay, 
        routing_number: payeeChosen.BankRoutingNumber ? payeeChosen.BankRoutingNumber : '', 
        credit_account_number: payeeChosen.CreditAccountNumber ? payeeChosen.CreditAccountNumber : '',
        credit_account_type: payeeChosen.BankAccountType ? payeeChosen.BankAccountType : '', 
        payment_memo: payeeChosen.PaymentMemo ? payeeChosen.PaymentMemo : '', 
        bill_payment_type: payeeChosen.BillPayment ? payeeChosen.BillPayment : '', 
        expense_type: payeeChosen.Expense ? payeeChosen.Expense : '', 
        c_o: payeeChosen.CO ? payeeChosen.CO : ''
    }
    return transformedPayeeInfo; 
  }

  const convertStringDateToDate = (dateString?: string | undefined | null) => {
    if (dateString)
    {
      return new Date(dateString.replace(/-/g, '/'))
    }
    return null
  }

  const selectedPayee: string | undefined = useWatch({
    name: 'savedPayeeId',
    control: control
  });

  useEffect(() => {
    if (selectedPayee && selectedPayee !== 'Add Payee') {
      const payeeOptionsClone = [...payeeOptions];
      const payeeChosen = payeeOptionsClone.filter(payee => payee.Id === selectedPayee)[0];
      if (!payeeChosen) return; 
      setValue('payment_memo', payeeChosen.PaymentMemo); 
      setValue('payable_to', payeeChosen.To);
    }
  }, [selectedPayee, payeeOptions, setValue])

  const showProgressBarStep = () => {
    if (!selectedPayee) {
      return <img data-test="image-with-two-steps" src={progressBarStepTwo} alt="progress bar" width="100%" /> 
    }
    
    if (billPayment.edit_payee || selectedPayee === 'Add Payee') {
      return (<img data-test="image-with-four-steps" src={progressBarStepsAfterTwoDeselected} alt="progress bar" width="100%" />)
    }

    return (<img data-test="image-with-two-steps-review" src={progressBarSavedPayeeReviewDeselected} alt="progress bar" width="100%" />) 
  }

  const customActionSheetOptions = () => {
    let actionSheetOptions : any = { 
      animated: true, 
      mode: 'ios'
    }
    if (payeeOptions.length > 5) {
      actionSheetOptions = {
        ...actionSheetOptions, 
        cssClass: 'long-select' 
      }
    }
    return actionSheetOptions;
  }

  const showRealEstateTaxPaymentInputs = () => {
     let showRealEstateInputs = false;
     if (selectedPayee !== 'Add Payee' && !billPayment.edit_payee) {
      const payeeOptionsClone = [...payeeOptions];
      const payeeChosen = payeeOptionsClone.filter(payee => payee.Id === selectedPayee)[0];

      showRealEstateInputs =  (payeeChosen && payeeChosen.BillPayment === 'Real Estate Tax Payment') 
     }
     return showRealEstateInputs; 
  }

  const onFileChange = (e : any) => {
    const base64 = 'base64,';
    let files = e.target.files;

    clearErrors('files');
    
    if (!isUploadedDocsSizeBelowMaxSize(files)) {
      setError('files', {
        types: {
          fileTooLarge: 'File size is too large. Please limit your document to a total of 3 MB.'
        }
      });
      return;
    }
    
    for (let i = 0; i < files.length; i++) {  
        let reader = new FileReader();   
        let newFile : SFFile;
        reader.addEventListener('load', function() {

          let fileContents = typeof reader.result === 'string' ? reader.result : '';
          let dataStart = fileContents?.indexOf(base64) + base64.length;
          let blob = fileContents?.substring(dataStart);

          newFile = {
            'name': files[i].name, 
            'base64_string': blob
          };

          // setFiles((prevFiles) => [...prevFiles, newFile]); 
        });
        reader.readAsDataURL(files[i]);
    }
  }

  const amount: number | undefined = useWatch({
    name: 'amount',
    control: control
  })

  useEffect(() => {
    let allFiles = files; 
    
    if (amount && amount > 5000 && (!allFiles || allFiles.length === 0)) {
      console.log('setting files errors');
      setError('files', {
        types: {
          fileRequiredForLargeAmount: 'Please upload a Supporting Document to verify the amount of this bill payment.'
        }
      });
    }
    else {
      clearErrors('files');  
    }
  }, [amount, files, setError, clearErrors])

  const isUploadedDocsSizeBelowMaxSize = (uploadedFilesList : Array<any>) => {
    const maxAcceptedSize = 3145355;
    let fileSizeArr : Array<any> = []; 
    for (let i = 0; i < uploadedFilesList.length; i++) {
        fileSizeArr.push(uploadedFilesList[i].size);
    }
    let docsSizeInBytes = fileSizeArr.reduce((size1, size2) => size1 + size2);
    return docsSizeInBytes <= maxAcceptedSize;
  }

  const fileInputAcceptParams = () => {
    return isPlatform('android') ? 'image/*, .doc' : '.pdf, .jpg, .jpeg, .png, .doc, .docx, .xls, xlsx';
  }
  
  return (
    <>
      {showSpinner ? ( <Spinner /> ) : 
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} data-test="bill-pay-step-two">
          <IonRow class="divider" >
            <IonCol class="p-1" sizeXs="12" sizeSm="12" sizeMd="7" sizeLg="7" sizeXl="7">
              {showProgressBarStep()}
            </IonCol>
          </IonRow> 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <IonRow class="w-100">
                <IonCol class="w-100">
                  <IonRow class="mt-2 mb-1">
                    <IonLabel>Who would you like to pay?</IonLabel>
                  </IonRow>
                  <IonRow class="w-100">
                    <Controller name='savedPayeeId' control={control} render={({ value, onChange }) =>
                      <IonSelect class="w-100 gr-border p-1" tabIndex={0} interface='action-sheet' onIonChange={onChange} value={value} interfaceOptions={customActionSheetOptions()}>
                        <IonSelectOption value='Add Payee'>Add Payee</IonSelectOption>
                        {payeeOptions.map((payee) => (
                          <IonSelectOption key={payee.Id} value={payee.Id}>
                            {payee.Name}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    } rules={{
                      required: true,
                      validate: (value) => { return value !== null }
                      }} />
                  </IonRow>
                  {errors['savedPayeeId'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please select a payee.</p></IonItem>}

                  {(selectedPayee) &&
                    <>
                      {(selectedPayee === 'Add Payee' || billPayment.edit_payee) &&
                        <>
                          <IonRow class="mt-2 mb-1">
                            <IonLabel>Payable To</IonLabel>
                          </IonRow>
                          <IonRow class="w-100">
                        <Controller name='payable_to' control={control} render={({ value, onBlur, onChange }) =>
                          <IonInput class="ion-text-left gr-border" name='payable-to' value={value} onIonBlur={onBlur} onIonChange={onChange} maxlength={26}/>
                        } rules={{
                          required: true,
                          validate: (value) => { return value !== null }
                          }} />
                          </IonRow>
                          {errors['payable_to'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please add the name for who you'd like to pay.</p></IonItem>}
                        </>
                      }

                      <IonRow class="mt-2 mb-1">
                        <IonLabel>Amount (USD)</IonLabel>
                      </IonRow>
                      <IonRow class="m-0 p-0">
                        <IonCol class="m-0 p-0" sizeXs="12" sizeSm="12" sizeMd="2" sizeLg="2" sizeXl="2">
                          <Controller name='amount' control={control} render={({ value, onBlur, onChange }) =>
                            <IonItem class="gr-border" lines="none">$<IonInput class="ion-text-left ml-1" name='amount' type="number" value={value} onIonBlur={onBlur} onIonChange={onChange}/></IonItem>
                          } rules={{
                            required: true,
                            validate: (value) => (
                              value !== null && (+value > 0)
                            ),
                            pattern: /^\d+(\.\d{2})?$/
                          }} />
                        </IonCol>
                      </IonRow>
                      {errors['amount'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please add the amount you'd like to pay.</p></IonItem>}

                      <IonRow class="mt-2 mb-1">
                        <IonLabel>Supporting Document(s)</IonLabel>
                      </IonRow>
                      <IonRow class="m-0 p-0">
                        <IonCol class="m-0 p-0" sizeXs="12" sizeSm="12" sizeMd="2" sizeLg="2" sizeXl="2">
                          <input type='file' name={'files'} onChange={onFileChange} accept={fileInputAcceptParams()} multiple/>
                        </IonCol>
                      </IonRow>
                      {errors.files && (errors.files as any)?.types.fileTooLarge &&  (
                        <IonItem class="mt-1" color="danger"><p className="white-color">{(errors.files as any)?.types.fileTooLarge}</p></IonItem>
                      )}
                      {errors.files && (errors.files as any)?.types.fileRequiredForLargeAmount &&  (
                        <IonItem class="mt-1" color="danger"><p className="white-color">{(errors.files as any)?.types.fileRequiredForLargeAmount}</p></IonItem>
                      )}
                      
                      {showRealEstateTaxPaymentInputs() && (
                        <>
                          <IonRow class="mt-2 mb-1">
                            <IonLabel>Tax Year</IonLabel>
                          </IonRow>
                          <IonRow>
                            <Controller name="tax_year" control={control} as={
                              <InputMask mask='9999' className="input-mask mt-0 gr-border" type="text" name="tax-year"/>
                            } rules={{
                              required: true,
                              validate: (value) => { return value !== null },
                              pattern: /^(19|20)\d{2}$/
                            }} />
                          </IonRow>
                          {errors['tax_year'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please enter the tax year.</p></IonItem>}
                          <IonRow class="mt-2 mb-1">
                            <IonLabel>Full/Partial Payment</IonLabel>
                          </IonRow>
                          <IonRow class="w-100">
                            <Controller name='full_or_partial' control={control} render={({ value, onBlur, onChange }) =>
                              <IonSelect class="w-100 gr-border p-1" name="full_or_partial" tabIndex={0} interface="action-sheet" mode="ios" onIonChange={onChange} onIonBlur={onBlur} value={value} interfaceOptions={{ animated: true, mode: 'ios' }}>
                                <IonSelectOption>Full Payment</IonSelectOption>
                                <IonSelectOption>Partial Payment</IonSelectOption>
                              </IonSelect>
                          } rules={{
                            required: true,
                            validate: (value) => { return value !== null }
                            }} />
                          </IonRow>
                          {errors['full_or_partial'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please select whether this is a full or partial payment.</p></IonItem>}
                        </>
                      )}
                      
                      {(selectedPayee !== 'Add Payee' && !billPayment.edit_payee) &&
                        <>
                          <IonRow class="mt-2 mb-1">
                              <IonLabel>Payment Memo (This memo will be provided to the payee to help recipient properly credit your payment. Examples include an invoice number, account number or reference number. Maximum 30 characters.)</IonLabel>
                          </IonRow>
                          <IonRow>
                            <Controller name='payment_memo' control={control} render={({ value, onBlur, onChange }) =>
                              <IonInput class="ion-text-left mt-0 gr-border" type="text" name="payment-memo" maxlength={30} value={value} onIonBlur={onBlur} onIonChange={onChange}/>
                            } rules={{
                              required: true,
                              validate: (value) => { return value !== null }
                          }} />
                          </IonRow>
                          {errors['payment_memo'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please add a payment memo to help the recipient properly credit your payment.</p></IonItem>}
                        </>}

                      <IonRow class="mt-2 mb-1">
                        <IonLabel>Process Date *</IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonItem className="ion-text-left gr-border date-width white-bg" lines="none">
                        <Controller name='process_date' defaultValue={null} control={control} render={({ value }) =>
                          {
                            return <KeyboardDatePicker
                              className="date-width" name="process-date" disablePast={true} margin='normal' placeholder="mm/dd/yyyy" value={convertStringDateToDate(value)} format="MM/dd/yyyy" InputProps={{ disableUnderline: true }} animateYearScrolling={true} KeyboardButtonProps={{ 'aria-label': 'change-date' }} onChange={(date) => {
                                if (date) {
                                  setValue('process_date', date);
                                  trigger('process_date');
                                }
                              } } />;
                          }
                            } rules={{
                              required: true,
                              validate: (value) => {
                                const inputDate = new Date(value),
                                  currentDate = new Date();
                                return value !== null && (inputDate.getUTCDay() !== 0 && inputDate.getUTCDay() !== 6) && (inputDate.getTime() >= currentDate.getTime() || (inputDate.getUTCMonth() >= currentDate.getUTCMonth() && (inputDate.getUTCDate() + 1) >= currentDate.getUTCDate() && inputDate.getUTCFullYear() >= currentDate.getUTCFullYear()));
                              },
                              pattern: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/
                          }} />
                        </IonItem>
                      </IonRow>
                      {errors['process_date'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please select the date which you would like the payment to process. Must be a week day.</p></IonItem>}
                    </>}
                </IonCol>
              </IonRow>
            </MuiPickersUtilsProvider>
          </form>
      }
    </>
  );
};


export default BillPayStepTwo;
