import React from 'react';
import { IonSpinner } from '@ionic/react';

const Spinner: React.FC = () => {
    return (
        <div data-test="spinner-div" className="ion-justify-content-center ion-text-center ion-padding">
            <IonSpinner name="crescent"/>
        </div> 
    )
}

export default Spinner; 