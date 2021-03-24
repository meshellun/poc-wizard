import React, { useEffect } from 'react';
import { Controller, useWatch, useForm } from 'react-hook-form';
import {
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonItem,
  IonProgressBar,
} from '@ionic/react';
import progressBarStepFour from '../../images/step-four.svg';
import { deliveryMethods, isPhone } from '../../helpers/Utils';
import CheckFields from './../ConditionalFieldComponents/CheckFields';
import DirectDepositFields from './../ConditionalFieldComponents/DirectDepositFields';
import DomesticWireFields from './../ConditionalFieldComponents/DomesticWireFields';
import InternationalWireFields from './../ConditionalFieldComponents/InternationalWireFields';
import { BillPayStep } from '../../pages/BillPay';

const BillPayStepFour: React.FC<BillPayStep> = ({ formRef, billPayment, step, goToStep, billPaySteps }) => {
  const getDefaultValues = ()=>{
    let defaultForm: Partial<BillPayment> = {
      delivery_method: '',
      mailing_street: '',
      mailing_city: '',
      mailing_state: '',
      mailing_zip: '',
      c_o: '',
      routing_number: '',
      credit_account_number: '',
      credit_account_type: '',
      ...billPayment
    }
    return defaultForm
  } 

  const {control, handleSubmit, setValue, errors, getValues} = useForm<Partial<BillPayment>> ({
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
  }, [])

  const deliveryMethod: string | undefined = useWatch({
    name: 'delivery_method',
    control: control
  });

  const onSubmit = (data: Partial<BillPayment>) => {
    let currentStepIndex = billPaySteps.indexOf(step);
    goToStep(data, billPaySteps[currentStepIndex+ 1]);
  }

  return (
    <div data-test="bill-pay-step-four">
      <IonRow class={(!isPhone()) ? "divider" : ''}>
        <IonCol class="p-1" sizeXs="12" sizeSm="12" sizeMd="7" sizeLg="7" sizeXl="7">
          {(!isPhone()) ? <img src={progressBarStepFour} alt="progress bar" width="100%" /> : <IonProgressBar color="primary" value={0.75}></IonProgressBar>}
        </IonCol>
      </IonRow>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} data-test="step-four-form">
          <IonRow class="mt-2 mb-1">
            <IonLabel>How would you like to send the payment?</IonLabel>
          </IonRow>
          <IonRow class="w-100">
            <Controller name='delivery_method' data-test="delivery-method" control={control} render={({ value, onBlur, onChange }) => <IonSelect class="w-100 gr-border p-1" tabIndex={0} interface='action-sheet' onIonChange={onChange} onIonBlur={onBlur} value={value} interfaceOptions={{ animated: true, mode: 'ios' }}>
                  {deliveryMethods.map((method, index) => <IonSelectOption value={method} key={index}>{method}</IonSelectOption>)}
                </IonSelect>
            } rules={{required:true}}/>
          </IonRow>
          {errors['delivery_method'] && <IonItem class="mt-1" color="danger" data-test="delivery-method-error"><p className="white-color">Please select a delivery method.</p></IonItem>}

        {deliveryMethod && ((deliveryMethod?.toLowerCase().includes('check')) ?
            <CheckFields control={control} errors={errors} setValue={setValue} deliveryMethod={deliveryMethod}/>
          : (deliveryMethod?.toLowerCase().includes('direct')) ? 
              <DirectDepositFields control={control} errors={errors} setValue={setValue} />
            : (deliveryMethod?.toLowerCase().includes('domestic')) ? 
                <DomesticWireFields control={control} setValue={setValue} errors={errors} />
              : (deliveryMethod?.toLowerCase().includes('international')) ? 
                  <InternationalWireFields />
                : '')}
        </form>
    </div>
  );
};

export default BillPayStepFour;
