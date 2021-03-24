import React, { useState, useEffect } from 'react';
import {
  IonRow,
  IonCol,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonProgressBar,
} from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import progressBarStepOne from '../../images/step-one.svg';
import { BillPayStep } from '../../pages/BillPay';
import Spinner from '../Spinner';

export interface StepOne extends BillPayStep {
  selectedAccountId?: string
}

interface RelatedAssetOption {
  Id: string,
  Label: string
}

const BillPayStepOne: React.FC<StepOne> = ({
  formRef, selectedAccountId, billPayment, setErrorMessage, clearErrorMessage, step, goToStep, billPaySteps
}) => {
  const [assetOptions, setAssetOptions] = useState<RelatedAssetOption[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const { handleSubmit, control, errors } = useForm<Partial<BillPayment>>({
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    let assetOptionsClone = [...assetOptions];
    let assetIdChosen = data.assetId;
    let dataToSubmit = {...data};
    let selectedAsset = assetOptionsClone.filter(asset => (asset.Id === assetIdChosen))[0];
    
    if (selectedAsset) {
        dataToSubmit = {...data, selectedAssetLabel: selectedAsset.Label};
    }
    let currentStepIndex = billPaySteps.indexOf(step);

    goToStep(dataToSubmit, billPaySteps[currentStepIndex + 1]);
  }

  return (
    <>
      <IonRow class="divider">
        <IonCol class="p-1" size="12" sizeSm="12" sizeMd="7" sizeLg="7" sizeXl="7">
          {<img src={progressBarStepOne} alt="progress bar" width="100%" />}
        </IonCol>
      </IonRow>
      <IonRow class="divider">
        <h1 className="ion-text-left">Bill Pay Instructions:</h1>
        <ul>
          <li>Using this system, you can request to pay expenses related to your IRA-owned assets. Commonly allowed expenses include tax bills, insurance bills, homeowner dues and utility bills.</li>
          <li>The Process Date must be at least one business day in the future from today. Midland reserves the right to verify any and all client and or/payee information before funds are sent out for any transaction.</li>
        </ul>
      </IonRow>
      {
        showSpinner ? 
        (
          <Spinner />
        ) 
        :
        (<form ref={formRef} data-test="bill-pay-step-one-form" onSubmit={handleSubmit(onSubmit)}>
          <IonRow>
            <IonCol size="12">
              <IonRow>
                <IonCol>
                  <IonRow class="mt-2 mb-1">
                    <IonLabel>Select Account</IonLabel>
                  </IonRow>
                  <IonRow class="w-100 gr-border p-1">
                    <IonCol size="12">
                      Account Selected Here
                    </IonCol>
                  </IonRow>
                  <IonRow class="mt-2 mb-1">
                    <IonLabel>Related Asset</IonLabel>
                  </IonRow>
                  <IonRow class="w-100">
                      {/* <Controller data-test='select-asset-controller' name='assetId' control={control} defaultValue={billPayment.assetId ? billPayment.assetId : ''} render={({value, onBlur, onChange}) => {
                        return <IonSelect class="w-100 gr-border p-1" interface="action-sheet" tabIndex={0} mode="ios" name='assetId' onIonChange={onChange} onIonBlur={onBlur} value={value}>
                          {assetOptions.map((asset) => (
                            <IonSelectOption key={asset.Id} value={asset.Id}>{asset.Label}</IonSelectOption>
                          ))}
                        </IonSelect>
                      }
                      
                      } rules={{required: true}} /> */}
                      Asset Options HERE
                  </IonRow>
                  {errors['assetId'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please select a related asset.</p></IonItem>}
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </form>)
      }
    </>
  );
};

export default BillPayStepOne;
