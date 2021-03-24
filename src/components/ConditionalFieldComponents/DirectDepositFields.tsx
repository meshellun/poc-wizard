import React from 'react';
import {
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonItem,
  IonSelect, 
  IonSelectOption
} from '@ionic/react';
import { Controller } from 'react-hook-form';

const DirectDepositFields: React.FC<{control: any, errors: any, setValue: Function}> = ({control, errors, setValue}) => {
  const validateRoutingNumber = (event: any) => {
    let routingNumber = event.target.value; 
  }

  return (
    <>
      <IonRow className="m-0 p-0">
          <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
            <IonRow className="mt-2 mb-1">
              <IonLabel>Bank Routing Number</IonLabel>
            </IonRow>
            <IonRow className="m-0 p-0">
              <IonCol className="m-0 p-0">
                <Controller name='routing_number' control={control} render={({ value, onBlur, onChange }) =>
                  <IonInput className="ion-text-left gr-border pl-1 pr-1" name='bank_routing_number' type="text" maxlength={9} onIonChange={(e) => {
                    onChange(e);
                    validateRoutingNumber(e);
                  }} onIonBlur={onBlur} value={value} />
                } rules={{ required: true }} />
              </IonCol>
            </IonRow>
              {errors['routing_number'] && <IonItem className="mt-1" color="danger"><p className="white-color">Please enter routing number.</p></IonItem>}
          </IonCol>
          <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
            <IonRow className="mt-2 mb-1">
              <IonLabel>Bank Name</IonLabel>
            </IonRow>
            <IonRow className="m-0 p-0">
              <IonCol className="m-0 p-1 lt-gr-bg">
                <Controller name='bank_name' control={control} render={({value, onBlur, onChange}) => 
                  <IonInput className="ion-text-left gr-border" type="text" name="bank_name" id="bank_name" maxlength={100} disabled value={value} />
                } rules={{required: true}}/>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
        <IonRow className="m-0 p-0">
          <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
            <IonRow className="mt-2 mb-1">
              <IonLabel>Credit Account #</IonLabel>
            </IonRow>
            <IonRow className="m-0 p-0">
              <IonCol className="m-0 p-0 ">
                <Controller name='credit_account_number' control={control} render={({ value, onBlur, onChange }) =>
                  <IonInput class="ion-text-left gr-border pl-1 pr-1" name='credit_account_number' type="text" onIonChange={onChange} onIonBlur={onBlur} value={value} />
                } rules={{ required: true }} />
              </IonCol>
            </IonRow>
              {errors['credit_account_number'] && <IonItem className="mt-1" color="danger"><p className="white-color">Please enter credit account #.</p></IonItem>}
          </IonCol>
          <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
            <IonRow className="mt-2 mb-1">
              <IonLabel>Credit Account Type</IonLabel>
            </IonRow>
            <IonRow className="m-0 p-0">
              <IonCol className="m-0 p-0">
                <Controller name='credit_account_type' control={control} render={({ value, onBlur, onChange }) =>
                  <IonSelect className="ion-text-left gr-border pl-1 pr-1" interface="action-sheet" name='credit_account_type' tabIndex={0} onIonChange={onChange} onIonBlur={onBlur} value={value}  mode="ios">
                    <IonSelectOption>Checking</IonSelectOption>
                    <IonSelectOption>Savings</IonSelectOption>
                  </IonSelect>
                } rules={{ required: true }} />
              </IonCol>
            </IonRow>
              {errors['credit_account_type'] && <IonItem className="mt-1" color="danger"><p className="white-color">Please enter credit account type.</p></IonItem>}
          </IonCol>
        </IonRow>
    </>
  );
};

export default DirectDepositFields;
