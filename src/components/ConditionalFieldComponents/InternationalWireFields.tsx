import React, { Fragment } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import InputMask from 'react-input-mask';
import {
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/react';

const InternationalWireFields: React.FC = () => {

  interface formType {
    corresponding_bank: string;
    bank_routing_number: string;
    swift_code: string;
  }

  const getDefaultValues = ()=>{
    let defaultForm: formType = {
      corresponding_bank: '',
      bank_routing_number: '',
      swift_code: '',
    }
    return defaultForm
  } 

  const {control} = useForm<formType> ({
    mode: "onChange",
    defaultValues: getDefaultValues()
  });

  const correspondingBank: any = useWatch({
    name: 'corresponding_bank',
    control: control
  })

  return (
    <Fragment>
      <IonRow class="m-0 p-0">
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
          <IonRow class="mt-2 mb-1">
            <IonLabel>SWIFT Code</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0">
                <InputMask mask='***********' className="input-mask gr-border" type="text" />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
          <IonRow class="mt-2 mb-1">
            <IonLabel>Bank Name</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-1 lt-gr-bg">Read Only</IonCol>
          </IonRow>
        </IonCol>
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
          <IonRow class="mt-2 mb-1">
            <IonLabel>Bank Street</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0">
              <IonInput class="ion-text-left gr-border" name="bank_street" type="text" />
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
      <IonRow class="m-0 p-0">
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
          <IonRow class="mt-2 mb-1">
            <IonLabel>Bank City</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0">
              <IonInput class="ion-text-left gr-border" name="bank_city" type="text" />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
          <IonRow class="mt-2 mb-1">
            <IonLabel>Country Code</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0">
              <IonInput class="ion-text-left gr-border" name="country_code" type="text" />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
          <IonRow class="mt-2 mb-1">
            <IonLabel>Beneficiary Name</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0">
              <IonInput class="ion-text-left gr-border" name="beneficiary_name" type="text" />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
          <IonRow class="mt-2 mb-1">
            <IonLabel>Beneficiary Account Number</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0">
              <IonInput class="ion-text-left gr-border" name="beneficiary_account_number" type="text" />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
          <IonRow class="mt-2">
            <IonLabel>Payment Details</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0 ">
            <IonTextarea class="ion-text-left gr-border" name='payment_details' />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4" sizeXl="4">
          <IonRow class="mt-2 mb-1">
            <IonLabel>Corresponding Bank</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0 ">
              <Controller name="corresponding_bank" control={control} render={({ value, onBlur, onChange }) => <IonSelect class="w-100 gr-border p-1" tabIndex={0} interface='action-sheet' onIonChange={onChange} onIonBlur={onBlur} value={value} interfaceOptions={{ animated: true, mode: 'ios' }}>
                  <IonSelectOption>Yes</IonSelectOption>
                  <IonSelectOption>No</IonSelectOption>
                </IonSelect>
              } rules={{required:true}}/>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
    {(correspondingBank === 'Yes') ?
      <IonRow class="m-0 p-0">
        <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
          <IonRow class="mt-2 mb-1">
            <IonLabel>Bank Routing Number</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0">
              <Controller name='bank_routing_number' control={control} render={() => <InputMask mask='999999999' className="w-100 input-mask gr-border" />} rules={{required:true, pattern: /^[0-9]{9}$/}} />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
          <IonRow class="mt-2 mb-1">
            <IonLabel>Bank Name</IonLabel>
          </IonRow>
          <IonRow class="m-0 p-0">
            <IonCol class="m-0 p-0">
              <IonInput class="ion-text-left gr-border" name="bank_routing_number" type="text" />
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow> : ''}
    </Fragment>
  );
};

export default InternationalWireFields;
