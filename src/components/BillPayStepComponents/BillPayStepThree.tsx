import React, { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import InputMask from 'react-input-mask';
import {
  IonRow,
  IonCol,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonItem,
  IonProgressBar,
} from '@ionic/react';
import progressBarStepThree from '../../images/step-three.svg';
import { BillPayStep } from '../../pages/BillPay';

const BillPayStepThree: React.FC<BillPayStep> = ({ formRef, billPayment, step, goToStep, billPaySteps }) => {
  const getDefaultValues = ()=>{
    let defaultForm: Partial<BillPayment> = {
      bill_payment_type: '',
      expense_type: '',
      tax_year: '',
      payment_memo: '',
      full_or_partial: '',
      ...billPayment
    }
    return defaultForm
  } 

  const {control, handleSubmit, errors, getValues} = useForm<Partial<BillPayment>> ({
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
  }, [billPaySteps, getValues, goToStep, step])

  const onSubmit = (data: Partial<BillPayment>) => {
    let currentStepIndex = billPaySteps.indexOf(step);
    goToStep(data, billPaySteps[currentStepIndex + 1]);
  }

  const billPaymentType = useWatch({
    name: 'bill_payment_type',
    control: control
  });

  return (
    <div data-test="bill-pay-step-three">
      <IonRow class= "divider" >
        <IonCol class="p-1" sizeXs="12" sizeSm="12" sizeMd="7" sizeLg="7" sizeXl="7">
          <img src={progressBarStepThree} alt="progress bar" width="100%" />
        </IonCol>
      </IonRow>
      <form data-test="bill-pay-step-three-form" ref={formRef} onSubmit={handleSubmit(onSubmit)}> 
        <IonRow>
          <IonCol size="12">
            <IonRow>
              <IonCol>
                <IonRow class="mt-2 mb-1">
                  <IonLabel>What type of bill is this?</IonLabel>
                </IonRow>
                <IonRow class="w-100">
                <Controller data-test="bill-payment-type" name='bill_payment_type' control={control} render={({ value, onBlur, onChange }) =>
                  <IonSelect class="w-100 gr-border p-1" name="bill-payment-type" tabIndex={0} interface='action-sheet' onIonChange={onChange} onIonBlur={onBlur} value={value} interfaceOptions={{ animated: true, mode: 'ios' }}>
                      <IonSelectOption>Bill Payment</IonSelectOption>
                      <IonSelectOption>Note Payable Payment</IonSelectOption>
                      <IonSelectOption>Real Estate Tax Payment</IonSelectOption>
                    </IonSelect>
                  } rules={{
                    required: true,
                    validate: (value) => { return value !== null }
                    }} />
                </IonRow>
                {errors['bill_payment_type'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please add the type of bill you'd like to pay.</p></IonItem>}

                {(billPaymentType === 'Bill Payment') &&
                  <>
                    <IonRow class="mt-2 mb-1">
                      <IonLabel>Expense Type</IonLabel>
                    </IonRow>
                    <IonRow class="w-100">
                    <Controller name='expense_type' data-test="expense-type" control={control} render={({ value, onBlur, onChange }) =>
                      <IonSelect class="w-100 gr-border p-1" tabIndex={0} interface="action-sheet" mode="ios" name="expense-type" onIonChange={onChange} onIonBlur={onBlur} value={value} interfaceOptions={{ animated: true, mode: 'ios' }}>
                        <IonSelectOption value="Insurance">Insurance</IonSelectOption>
                        <IonSelectOption value="Homeowner Dues">Homeowner Dues</IonSelectOption>
                        <IonSelectOption value="Taxes">Taxes</IonSelectOption>
                        <IonSelectOption value="Utilities">Utilities</IonSelectOption>
                        <IonSelectOption value="Other">Other</IonSelectOption>
                      </IonSelect>
                    } rules={{
                      required: true,
                      validate: (value) => { return value !== null }
                      }} /> 
                    </IonRow>
                    {errors['expense_type'] && <IonItem class="mt-1" color="danger" data-test="expense-type-error"><p className="white-color">Please select the proper expense type.</p></IonItem>}
                  </>}

                {(billPaymentType === 'Real Estate Tax Payment') &&
                  <>
                    <IonRow class="mt-2 mb-1">
                      <IonLabel>Tax Year</IonLabel>
                    </IonRow>
                    <IonRow>
                      <Controller data-test="tax-year" name="tax_year" control={control} as={
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
                    <Controller name='full_or_partial' data-test='full-partial' control={control} render={({ value, onBlur, onChange }) =>
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
                  }
                     
                <IonRow class="mt-2 mb-1">   
                  {(billPaymentType === 'Real Estate Tax Payment') ?
                    <IonLabel data-test="parcel-memo-label">Parcel Number/Memo (This memo will be provided to the payee to help recipient properly credit your payment. Examples include a parcel number, invoice number, account number or reference number. Maximum 30 characters.)</IonLabel>
                    : 
                    <IonLabel data-test='payment-memo-label'>Payment Memo (This memo will be provided to the payee to help recipient properly credit your payment. Examples include an invoice number, account number or reference number. Maximum 30 characters.)</IonLabel>
                  }
                </IonRow>
                <IonRow>
                  <Controller name="payment_memo" control={control} render={({ value, onBlur, onChange }) =>
                    <IonInput class="ion-text-left mt-0 gr-border pl-1 pr-1" type="text" name="payment_memo" maxlength={30} onIonBlur={onBlur} onIonChange={onChange} value={value} />
                  } rules={{
                    required: true,
                    validate: (value) => { return value !== null }
                    }} />
                </IonRow>
                {errors['payment_memo'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please enter memo or parcel number to help the recipient properly credit your payment.</p></IonItem>}
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </form>
    </div>
  );
};

export default BillPayStepThree;
