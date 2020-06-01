import React, { useState, useEffect } from 'react';
import UserItem from '../../components/UserItem/UserItem';
import { Button, Dialog, UnorderedList, ListItem, Heading, Pane } from 'evergreen-ui'
import { useRecoilState, useRecoilValue } from 'recoil';
import { 
  stepState, userListState, statusState, 
  userFormSaveState, userFormSubmitState 
} from '../../state/atoms';
import { RegistrationSummaryPage } from '../../style';
import { getEventData } from '../../state/selectors';
import PaymentMethod from '../../components/PaymentMethod';


const RegistrationSummary = _ => { 
  const { currencySembol  } = useRecoilValue(getEventData);
  const [termModal, setTermModal] = useState(false);
  const [termStatus, setTermStatus] = useState(false);
  const [, setStep] = useRecoilState(stepState);
  const [userList] = useRecoilState(userListState);
  const [, setFormStatus] = useRecoilState(statusState)
  const [, setFormSaveState] = useRecoilState(userFormSaveState)
  const [, setUserFormSubmit] = useRecoilState(userFormSubmitState);


  const totalPrice = () => {
    return userList.map(userData => { return [
    userData.selectType.event_registration_type_price, 
    ...userData.selectWorkshops.map(i => i.price)]
    .reduce((x,y) => x+y, 0) }).reduce((x,y) => x+y, 0)
  }

  useEffect(() => {
    if(termStatus){
      setStep(2);
      setFormStatus(false);
      setFormSaveState(false);
      setUserFormSubmit(false);
    }
  }, [termStatus])
  
  return (
    <RegistrationSummaryPage>
      <h1 className="title is-4">Registration Summary</h1>

      {userList.map((userData, userID) => 

        <UserItem 
          key={userID} 
          userID={userID} 
          props={userData} />)}
      


      <Dialog
        isShown={termModal}
        title="Add New Participant"
        onCloseComplete={() => setTermModal(false)}
        onConfirm={() => { setTermModal(false); setTermStatus(true);  }}
        confirmLabel="ACCEPT TERMS"
      >
        <div>
          <Heading is="h3">TERMS</Heading>
          You are about to register another person now! 
          <UnorderedList>
          <ListItem>In this step, you can register as many persons as you want until you complete your registration. </ListItem>
          <ListItem>After you complete this step, the persons you registered can access and manage their accounts by using login details we will send them by a notification email. </ListItem>
          <ListItem>If this is a paid event, registration fees of each participant you registered will be added to your account. </ListItem>
          <ListItem>You can cancel this process and return to your account page by clicking "CANCEL" button below. </ListItem>
          </UnorderedList>
        </div>
      </Dialog>

      <Pane display="flex" marginTop={10} height={120}>
          <Pane flex={20} display="flex">
            <Button 
              onClick={() => setTermModal(true)} 
              appearance="primary" 
              iconBefore="user"
            >  
              Add New Participant
            </Button>
          </Pane>
          <Pane >
            <div className="total">
              <span>TOTAL</span>
              <strong>{currencySembol} {totalPrice().toFixed(2)}</strong>
            </div>
          </Pane>
      </Pane>
      

      <PaymentMethod />
      

    </RegistrationSummaryPage>
  )
}


export default RegistrationSummary;