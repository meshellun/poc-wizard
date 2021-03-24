import React, { useState, useEffect } from 'react';
import {
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonToolbar,
  IonHeader,
  IonButton,
  IonCheckbox,
  IonLabel,
  IonRouterLink,
  IonModal,
  IonContent,
  IonProgressBar,
  IonInput
} from '@ionic/react';
import progressBarReview from '../../images/review.svg';
import progressBarReviewIfNotEditSavedPayee from '../../images/saved-payee-review.svg';
import { formatDateStringToDate, isPhone} from '../../helpers/Utils';
import { BillPayStep } from '../../pages/BillPay';

export interface BillPayReviewForm extends BillPayStep {
  setHasAgreed: any,
  hasAgreed: boolean,
  showSSNSignatureMissing: boolean, 
  setShowSSNSignatureMissing: Function,
  setBillPayment: Function
}

const BillPayReview: React.FC<BillPayReviewForm> = ({ setBillPayment, billPayment, setHasAgreed, hasAgreed, showSSNSignatureMissing, setShowSSNSignatureMissing, step, goToStep, billPaySteps }) => {
  const [showTermsOfService, setShowTermsOfService] = useState(false);
 
  useEffect(() => {
    const updateFormOnBack = () => {
      let currentStepIndex = billPaySteps.indexOf(step);
      goToStep( null, billPaySteps[currentStepIndex - 1]);
    }
    window.addEventListener('onbackbuttonclick', updateFormOnBack);

    return () => {
      window.removeEventListener('onbackbuttonclick', updateFormOnBack);
    }
  }, [billPaySteps, step, goToStep])

  
  const isAddOrEditSavedPayee = () => {
    return (billPayment.savedPayeeId === 'Add Payee' || billPayment.edit_payee);
  }

  const displayProgressBar = () => {
    if (isPhone()) return <IonProgressBar color="primary" value={1}></IonProgressBar>;
      return (isAddOrEditSavedPayee() ? <img data-test='image-with-four-steps' src={progressBarReview} alt="progress bar" width="100%" /> : <img data-test='image-with-two-steps' src={progressBarReviewIfNotEditSavedPayee} alt="progress bar" width="100%" />
    )
  }

  const goToEditStep = (e : any) => {
    console.log(e);
    const newStep = e.target.getAttribute('data-step'); 
    goToStep({edit_payee: true}, newStep);
  }

  const displayDeliveryInfo = () => {
    const mailingInfo = (
      <>
        <span data-test="mailing-street">
          <b>Mailing Street: </b> {billPayment.mailing_street} <br />
        </span>
        <span data-test="mailing-city">
          <b>Mailing City:</b> {billPayment.mailing_city} <br />
        </span>
        <span data-test="mailing-state">
          <b>Mailing State: </b> {billPayment.mailing_state} <br/>
        </span>
        <span data-test="mailing-zip">
          <b>Mailing Zip: </b> {billPayment.mailing_zip} <br/>
        </span>
      </>
    )
    const bankInfo = (
      <>
        <span data-test="routing-number">
          <b>Bank Routing Number:</b> {billPayment.routing_number}<br />
        </span>
        <span data-test="bank-name">
          <b>Bank Name:</b> {billPayment.bank_name}<br />
        </span>
        <span data-test="credit-account">
          <b>Credit Account #:</b> {billPayment.credit_account_number}<br />
        </span>
      </>
    )

    if (billPayment.delivery_method?.toLowerCase().includes('check')) {
     return  (
      <>
        <span data-test="co">
          <b>C/O:</b> {billPayment.c_o}<br />
        </span>
        {mailingInfo}
      </>
     );
    }

    if (billPayment.delivery_method === 'Direct Deposit') {
      return (
        <>
          {bankInfo}
          <span data-test="credit-account-type">
            <b>Credit Account Type:</b> {billPayment.credit_account_type}
          </span>
        </>
      )
    }

    if (billPayment.delivery_method?.toLowerCase().includes('domestic wire')) {
      return (
        <>
          {mailingInfo}
          {bankInfo}
        </>
      );
    }
  }

  const displayBillPaymentSpecificInfo = () => {
    switch (billPayment.bill_payment_type) {
      case 'Bill Payment':
        return (
        <span data-test="expense-type">
          <b>Expense Type:</b> {billPayment.expense_type} <br />
        </span>);
      case 'Real Estate Tax Payment':
        return (
          <>
            <span data-test='tax-year'>
              <b>Tax Year:</b> {billPayment.tax_year} <br />
            </span>
            <span data-test='full-partial'>
              <b>Full/Partial Payment:</b> {billPayment.full_or_partial} <br />
            </span>
          </>
        );
      default:
        return <></>;
    }
  }

  const onDigitalSignatureChange = (e: any) => {
    setBillPayment({
      [e.target.name]: e.target.value
    })
    setShowSSNSignatureMissing(false);
  }

  const displaySSNVerifyInputs = () => (
    (billPayment.amount && +billPayment.amount >= 1000) && 
      <IonRow>
        <IonLabel class="w-100 d-block"><b>Digital Signature</b></IonLabel>
          <p className="w-100 d-block">Enter the FIRST FIVE digits of your SSN to digitally sign this request</p>
        <IonInput data-test="ssn-first-three" className="mt-0 gr-border ion-padding-left ion-padding-right pl-1 pr-1" type="password" name="ssnSigFirstThree" size={3} maxlength={3} onIonChange={onDigitalSignatureChange} value={billPayment.ssnSigFirstThree} /><span className="last-four p-1">-</span>
        <IonInput data-test="ssn-next-two" className="mt-0 gr-border p-1 ion-padding-left ion-padding-right pl-1 pr-1" type="password" name="ssnSigNextTwo" size={2} maxlength={2} onIonChange={onDigitalSignatureChange} value={billPayment.ssnSigNextTwo} /><span className="last-four p-1">- XXXX</span>
      </IonRow>
  )
  

  return (
    <div data-test='bill-pay-review-component'>
       <IonRow class={(!isPhone()) ? "divider" : ''}>
        <IonCol className="p-1" sizeXs="12" sizeSm="12" sizeMd="7" sizeLg="7" sizeXl="7">
          {displayProgressBar()} 
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <h1>Review and Submit</h1>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol sizeXs="12">
          <IonList>
            <IonToolbar color="secondary">
              <IonHeader slot="start" className="review-header pl-2 pr-2 bar-header">Instructions</IonHeader>
              <IonButton slot="end" fill="clear" className="white-color" data-test='step-one-edit-button' data-step="select-account" onClick={goToEditStep}>Edit</IonButton>
            </IonToolbar>
            <IonItem>
              <p>
                <span data-test='account-info'>
                  <b>Account</b>: ACCOUNT INFO <br />
                </span>
                <span data-test='asset-info'>
                  <b>Related Asset</b>: {billPayment.selectedAssetLabel}
                </span>
              </p>
            </IonItem>
            <IonToolbar color="secondary">
              <IonHeader slot="start" className="review-header pl-2 pr-2 bar-header">Payment to</IonHeader>
              <IonButton slot="end" fill="clear" className="white-color" onClick={goToEditStep} data-test='step-two-edit-button' data-step="select-payee">Edit</IonButton>
            </IonToolbar>
            <IonItem>
              <p>
                <span data-test='payable-to'>
                  <b>Payable to</b>: {billPayment.payable_to} <br />
                </span>
                <span data-test='amount'>
                  <b>Amount</b>: $ {billPayment.amount}<br/>
                </span>
                <span data-test='process-date'>
                  <b>Process Date</b>: {formatDateStringToDate(billPayment.process_date)} 
                </span>
              </p>
            </IonItem>
            <IonToolbar color="secondary">
              <IonHeader slot="start" className="review-header pl-2 pr-2 bar-header">Specifics</IonHeader>
              <IonButton slot="end" fill="clear" className="white-color" onClick={goToEditStep} data-step="bill-pay-type">Edit</IonButton>
            </IonToolbar>
            <IonItem>
              <p>
                <span data-test='payment-type'>
                  <b>Bill Payment Type</b>: {billPayment.bill_payment_type} <br />
                </span>
                {displayBillPaymentSpecificInfo()}
                <span data-test='payment-memo'>
                  <b>Payment Memo</b>: {billPayment.payment_memo}
                </span>
                </p>
              </IonItem>
              <IonToolbar color="secondary">
                <IonHeader slot="start" class="review-header pl-2 pr-2 bar-header">Send via</IonHeader>
                <IonButton slot="end" fill="clear" className="white-color" onClick={goToEditStep} data-step="delivery-method">Edit</IonButton>
              </IonToolbar>
              <IonItem lines="none">
                <p>
                  <b>Delivery Method:</b> {billPayment.delivery_method} <br />
                  {displayDeliveryInfo()} 
                </p>
              </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
      <IonRow>
          <IonCol>
            <IonModal isOpen={showTermsOfService} onDidDismiss={() => setShowTermsOfService(false)} mode="ios">
              <IonContent class="tos">
                <h3 className="pl-3 pr-3">Terms of Service</h3>
                <p className="text-left pl-3 pr-3">I acknowledge and agree that my account and this transaction will be subject to the provisions of the Uniform Electronic Transactions Act, as passed in the state where Midland Trust is organized, and the Federal Electronic Signature in Global and National Commerce Act, as those laws pertain to electronic communication, electronic signatures, and electronic storage of Custodial Account records.</p>
                <p className="text-left pl-3 pr-3">I understand that, in lieu of the retention of the original records, Midland Trust, as the Custodian and/or Administrator, may cause any, or all, of their records, and records at any time in their custody, to be photographed or otherwise reproduced to permanent form, and any such photograph or reproduction shall have the same force and effect as the original thereof and may be admitted in evidence equally with the original if permitted by law.</p>
                <p className="text-left pl-3 pr-3">I hereby acknowledge and agree that I am solely responsible for any and all transactions. I shall hold harmless, protect, and indemnify Midland Trust, the Custodian and/or Administrator, from and against any and all liabilities, losses, damages, expenses, penalties, taxes and charges that Midland Trust, the Custodian and/or Administrator, may sustain or might sustain resulting directly or indirectly from this disbursement.</p>
              </IonContent>
              <IonButton onClick={() => setShowTermsOfService(false)}>Close</IonButton>
            </IonModal>          
            {
                displaySSNVerifyInputs()
            }
            <IonItem lines="none" className="mt-2 mb-1 ion-float-right ion-align-self-end">
                <IonCheckbox color="primary" slot="start" tabIndex={0} checked={hasAgreed} onIonChange={(event) => setHasAgreed(event.detail.checked)}/>  
                <IonLabel class="agree-text">
                  I agree to the <IonRouterLink onClick={() => setShowTermsOfService(true)} className="underline cursor-pointer">Terms of Service </IonRouterLink>.
                </IonLabel> 
            </IonItem>
          </IonCol>
        </IonRow>
        { showSSNSignatureMissing && (
            <IonItem className="mt-1" color="danger">
                <p className="white-color">Digital Signature required.</p>
            </IonItem>)
        }
    </div>
  );
};

export default BillPayReview;
