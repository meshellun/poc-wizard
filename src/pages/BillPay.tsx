import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  IonRow,
  IonCol,
  IonItem
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import BillPayStepOne from '../components/BillPayStepComponents/BillPayStepOne';
import BillPayStepTwo from '../components/BillPayStepComponents/BillPayStepTwo';
import BillPayStepThree from '../components/BillPayStepComponents/BillPayStepThree';
import BillPayStepFour from '../components/BillPayStepComponents/BillPayStepFour';
import BillPayReview from '../components/BillPayStepComponents/BillPayReview';
import Spinner from '../components/Spinner'
import Wizard from '../components/Wizard';

type billPayStepString = 'select-account' | 'select-payee'| 'bill-pay-type' | 'delivery-method'| 'review';

export interface BillPayStep {
  formRef: React.RefObject<HTMLFormElement>,
  billPayment: Partial<BillPayment>,
  setErrorMessage: Function,
  clearErrorMessage: Function, 
  step: billPayStepString,
  goToStep: Function,
  billPaySteps: Array<billPayStepString>,
  id: billPayStepString
}

export const allBillPaySteps: Array<billPayStepString> = ['select-account', 'select-payee', 'bill-pay-type', 'delivery-method', 'review'];
export const initialBillPaySteps : Array<billPayStepString> = ['select-account', 'select-payee','review']

const BillPay: React.FC<{selectedAccountId?: string }> = ({selectedAccountId}) => {
  let history :any = useHistory();
  const [billPaySteps, setBillPaySteps] = useState<Array<billPayStepString>>([...initialBillPaySteps])
  const [step, setStep] = useState<'select-account' | 'select-payee'| 'bill-pay-type' | 'delivery-method'| 'review'>('select-account');
  const [files, setFiles] = useState<Array<SFFile>>([]);
  const [billPayment, setBillPayment] = useState<Partial<BillPayment>>({
    edit_payee: false
  });

  useEffect(()=>{
    const backButtonOverride = (ev:any) => {
      ev.detail.register(10, () => {
        if(step === billPaySteps[0]){
          history.goBack()
        }else{
          onBackButtonClick()
        }
      });
    }
    document.addEventListener('ionBackButton', backButtonOverride);
    return () => {
      document.removeEventListener('ionBackButton',backButtonOverride)
    }
  },[history, step, billPaySteps]);

  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasAgreed, setHasAgreed] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [showSSNSignatureMissing, setShowSSNSignatureMissing] = useState<boolean>(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if(history && history.location && history.location.state && history.location.state.detail) {
      if (history.location.state.detail.billPayment) {
        setBillPayment(history.location.state.detail.billPayment);
      }
      setStep(history.location.state.detail.step);
    } else {
      setStep(billPaySteps[0]);
    }
  }, [history?.location?.state?.detail, setBillPayment, billPaySteps, history])

  useEffect(() => {    
    const resetBillPayment = () => {
      setBillPayment({edit_payee: false});
    }
      resetBillPayment();
  }, [selectedAccountId]);

  useEffect(() => {
    if (failedAttempts >= 4) {
      console.log('logging out due to bill pay');
      // logout();
    }
  }, [failedAttempts])

  useEffect(() => {
    const isAddOrEditSavedPayee = ()=> (billPayment.savedPayeeId === 'Add Payee' || billPayment.edit_payee);

    if (isAddOrEditSavedPayee()) {
      setBillPaySteps(allBillPaySteps);
    }
  }, [billPayment.savedPayeeId, billPayment.edit_payee])

  const goToStep = (data: any, newStep: billPayStepString) => {
    history.push({
      pathname: '/pay-a-bill',
      state: {detail: {
        billPayment: data, 
        step: newStep
      }}
    })
  }

  const isFinalBillPayStep = useCallback(() =>(billPaySteps.indexOf(step) === (billPaySteps.length - 1))
  , [billPaySteps, step])


  const submitStep = () => {
    if (formRef !== null && formRef.current !== null) {
      formRef.current.dispatchEvent(new Event('submit', {cancelable : true}));
    }
  }

  const onBackButtonClick = () => {
    let backButonClickEvent = new CustomEvent('onbackbuttonclick');
    window.dispatchEvent(backButonClickEvent);
  }

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000)
  }

  const createTransaction = async() => {
    if (!selectedAccountId) return; 
    if (billPayment.amount && (+billPayment.amount >= 1000) &&(!billPayment.ssnSigFirstThree || !billPayment.ssnSigNextTwo)) {
      setShowSSNSignatureMissing(true);
      return; 
    }
    if (billPayment.amount && (+billPayment.amount > 5000) && files.length === 0) {
      setErrorMessage('Please upload a Supporting Document to verify the amount of this bill payment');
      clearErrorMessage();
      return; 
    }
    setShowSpinner(true);
    setErrorMessage('');
    try {
      let ssnSignature; 
      if (billPayment.ssnSigFirstThree && billPayment.ssnSigNextTwo) {
        ssnSignature = billPayment.ssnSigFirstThree + billPayment.ssnSigNextTwo
      }
      billPayment.files = files; 

      const billPaymentBody : BillPaymentBody = {
        ...billPayment,
        failedIdAttempts: failedAttempts, 
        accountId: selectedAccountId,
        ssnSignature
      }

      setShowSpinner(false);
      history.push('/home');
    }
    catch (err) {
      let errorMessage = (err.response && err.response.data) ? err.response.data :  'Error creating bill payment.';
      if (errorMessage.toLowerCase().includes('error confirming ssn signature')) {
        setFailedAttempts(failedAttempts + 1);
      }
      setErrorMessage(errorMessage);
      clearErrorMessage();
      setShowSpinner(false);
      setHasAgreed(false)
    }
  }


  const props = {formRef, billPayment, setErrorMessage, clearErrorMessage, step, goToStep, billPaySteps, setBillPayment}
  let reviewProps = {...props, setHasAgreed, hasAgreed, showSSNSignatureMissing, setShowSSNSignatureMissing};
  let stepTwoProps = {...props, files, setFiles}

  const displayStep = () => {
    switch (step) {
      case 'select-account':
        return <BillPayStepOne {...props} id="select-account"/>
      case 'select-payee':
        return <BillPayStepTwo {...stepTwoProps} id="select-payee"/>
      case 'bill-pay-type':
        return <BillPayStepThree {...props} id="bill-pay-type" />
      case 'delivery-method':
        return <BillPayStepFour {...props} id="delivery-method" />
      case 'review':
        return <BillPayReview {...reviewProps} id="review" />;
      default:
    }
  }

  const shouldShowNextButton = () => {
    if (isFinalBillPayStep()) {
      return false; 
    }
    return true;
  }

  return (
    <IonRow class="p-1 mt-5 mb-5 container" data-test="bill-pay">
      <IonCol class="p-1" sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="12" sizeXl="12">
        <IonRow>
          <IonCol class="p-1 light-gr-bg">
            <IonRow>
              <IonCol class="pl-3 pr-3 pt-1 pb-3 gr-border white-bg">
                {(errorMessage !== '') &&
                (<IonItem class="mt-1" color="danger">
                  <p className="white-color">{errorMessage}</p>
                  </IonItem>)}
                {showSpinner ? <Spinner /> : 
                  <Wizard handleBack={onBackButtonClick} handleNext={submitStep} handleSubmit={createTransaction}>
                    <BillPayStepOne {...props} id="select-account"/>
                    <BillPayStepTwo {...stepTwoProps} id="select-payee"/>
                    <BillPayStepThree {...props} id="bill-pay-type" />
                    <BillPayStepFour {...props} id="delivery-method" />
                     <BillPayReview {...reviewProps} id="review" />
                  </Wizard>
                }
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  );
};

// const mapStateToProps = (rooteState: RootState) => {
//   return {
//     selectedAccountId: rooteState.UserState.selectedAccount?.id,
//     billPayment: rooteState.BillPayment
//   }
// }

// const mapDispatchToProps = (dispatch: AppDispatch) => {
//   return {
//     setBillPayment: (payload: Partial<BillPayment>) => dispatch({type: 'setBillPayment', payload}),
//     resetBillPayment: () => dispatch({type: "resetBillPayment"})
//   }
// }

export default BillPay;