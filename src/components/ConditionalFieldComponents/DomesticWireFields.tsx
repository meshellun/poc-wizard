import React from 'react';
import {
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonItem
} from '@ionic/react';
import StateSelector from '../../components/StateSelector';
import { Controller } from 'react-hook-form';


const DomesticWireFields: React.FC<{control: any, setValue: Function, errors: any}> = ({control,setValue, errors}) => {
  const validateRoutingNumber = (event: any) => {
    let routingNumber = event.target.value;
  }

  return (
    <>
      <IonRow class="m-0 p-0">
          <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
            <IonRow class="mt-2 mb-1">
              <IonLabel>Mailing Street</IonLabel>
            </IonRow>
            <IonRow class="m-0 p-0">
              <IonCol class="m-0 p-0">
                <Controller name='mailing_street' control={control} render={({ value, onBlur, onChange }) =>
                  <IonInput class="ion-text-left gr-border pl-1 pr-1" name='mailing_street' type="text" maxlength={33} onIonChange={onChange} onIonBlur={onBlur} value={value} />
                } rules={{
                  required: true,
                  pattern: /^(?!.*(?:(.*((p|post)[-.\s]*(o|off|office)[-.\s]*(box|bin)[-.\s]*)|.*((p |post)[-.\s]*(box|bin)[-.\s]*)))).*$/i
                }} />
              </IonCol>
            </IonRow>
              {errors['mailing_street'] && <IonItem class="mt-1" color="danger"><p className="white-color">PO Boxes not available with the selected delivery method.</p></IonItem>}
          </IonCol>
          <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
            <IonRow class="mt-2 mb-1">
              <IonLabel>Mailing City</IonLabel>
            </IonRow>
            <IonRow class="m-0 p-0">
              <IonCol class="m-0 p-0">
                <Controller name='mailing_city' control={control} render={({ value, onBlur, onChange }) =>
                  <IonInput class="ion-text-left gr-border pl-1 pr-1" name='mailing_city' type="text" maxlength={26} onIonChange={onChange} onIonBlur={onBlur} value={value} />
                } rules={{ required: true }} />
              </IonCol>
            </IonRow>
              {errors['mailing_city'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please enter mailing city.</p></IonItem>}
          </IonCol>
      </IonRow>
      <IonRow class="m-0 p-0">
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
          <IonRow class="mt-2 mb-1">
            <IonLabel>Mailing State</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0 ">
             <StateSelector name='mailing_state' control={control} setValue={setValue}/>
            </IonCol>
          </IonRow>
          {errors['mailing_state'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please enter mailing state.</p></IonItem>}
        </IonCol>
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
            <IonRow class="mt-2 mb-1">
              <IonLabel>Mailing Zip</IonLabel>
            </IonRow>
            <IonRow class="m-0 p-0">
              <IonCol class="m-0 p-0">
                <Controller name='mailing_zip' control={control} render={({ value, onBlur, onChange }) =>
                  <IonInput class="ion-text-left gr-border pl-1 pr-1" name='mailing_zip' type="text" onIonChange={onChange} onIonBlur={onBlur} value={value} maxlength={5} />
                } rules={{ required: true }} />
              </IonCol>
            </IonRow>
              {errors['mailing_zip'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please enter mailing zip.</p></IonItem>}
          </IonCol>
          <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
            <IonRow class="mt-2 mb-1">
              <IonLabel>C/O</IonLabel>
            </IonRow>
            <IonRow class="m-0 p-0">
              <IonCol class="m-0 p-0">
                <Controller name='c_o' control={control} render={({ value, onBlur, onChange }) =>
                  <IonInput class="ion-text-left gr-border pl-1 pr-1" name='care_of' type="text" onIonChange={onChange} onIonBlur={onBlur} value={value} />
                } rules={{ required: false }} />
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
            <IonRow class="mt-2 mb-1">
              <IonLabel>Bank Routing Number</IonLabel>
            </IonRow>
            <IonRow class="m-0 p-0">
              <IonCol class="m-0 p-0">
                <Controller name='routing_number' control={control} render={({ value, onBlur, onChange }) =>
                  <IonInput class="ion-text-left gr-border pl-1 pr-1" name='bank_routing_number' type="text" onIonChange={(e) => {
                    onChange(e);
                    validateRoutingNumber(e);
                  }} onIonBlur={onBlur} value={value} maxlength={9} />
                } rules={{ required: true }} />
              </IonCol>
            </IonRow>
              {errors['routing_number'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please enter routing number.</p></IonItem>}
          </IonCol>
          <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
            <IonRow class="mt-2 mb-1">
              <IonLabel>Bank Name</IonLabel>
            </IonRow>
            <IonRow class="m-0 p-0">
              <IonCol class="m-0 p-1 lt-gr-bg">
                <Controller name='bank_name' control={control} render={({value, onBlur, onChange}) => 
                  <IonInput className="ion-text-left gr-border" type="text" name="bank_name" id="bank_name" maxlength={100} disabled value={value} />
                } rules={{required: true}}/>
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
            <IonRow class="mt-2 mb-1">
              <IonLabel>Credit Account #</IonLabel>
            </IonRow>
            <IonRow class="m-0 p-0">
              <IonCol class="m-0 p-0 ">
                <Controller name='credit_account_number' control={control} render={({ value, onBlur, onChange }) =>
                  <IonInput class="ion-text-left gr-border pl-1 pr-1" name='credit_account_number' type="number" onIonChange={onChange} onIonBlur={onBlur} value={value} />
                } rules={{ required: true }} />
              </IonCol>
            </IonRow>
              {errors['credit_account_number'] && <IonItem class="mt-1" color="danger"><p className="white-color">Please enter credit account number.</p></IonItem>}
          </IonCol>
        </IonRow>
    </>
  );
};

export default DomesticWireFields;
