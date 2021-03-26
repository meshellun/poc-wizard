
import React, {useState, useEffect} from 'react';
import {
  IonRow,
  IonCol,
  IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

//show data and data collctor?
const Wizard: React.FC<{handleSubmit: any, handleNext: any, handleBack: any}> = ({children, handleSubmit, handleNext, handleBack}) => {
    console.log('MDY114 CHIDLREN '+ children);
    console.log('MDY114 TYPEOF CHILDREN ' + typeof children);
    let history = useHistory();
  const [steps, setSteps]= useState<any[]>([]);
  const [activeStep, setActiveStep] = useState<any>();
  useEffect(() => {
    const getSteps = () => React.Children.toArray(children);
    let stepArray : any[] = [];
    React.Children.map(getSteps(), (child) => {
      if (typeof child === 'object') {
        stepArray.push((child as any)?.props.id);
      }
    });
    setSteps([...stepArray])
  }, [children])

  useEffect(() => {
    setActiveStep(steps[0])
  },[steps])

  useEffect(() => {

  }, [history])

  const [activeChild] = React.Children.toArray(children).filter((child: any) => {
    console.log(child);
    return(child.props.id === activeStep)});
  console.log(activeChild);
  
  const showNextButton = () => (steps.indexOf(activeStep) !== (steps.length - 1)); 
  const showBackButton = () => (steps.indexOf(activeStep) !== 0);

  return (
    <div className="container">
        {activeChild}
        <IonRow>
          <IonCol>
              <IonRow>
                  <IonCol>
                            {(showNextButton()) ? 
                              (
                                <IonButton data-test='next-button' disabled={false} onClick={handleNext} class="ion-float-right" size="large">Next</IonButton>
                              )
                              : 
                              (
                                <IonButton data-test='submit-button' onClick={handleSubmit} class="ion-float-right" size="large">Submit</IonButton>
                              )
                            }
                            {(showBackButton()) && (<IonButton data-test='back-button' onClick={handleBack} color="light" class="ion-float-right" size="large">Back</IonButton>)}
                          </IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
    </div>
  );
};

export default Wizard;
