import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { App, FixedFooterMenu } from "../style";
import EventHeader from "../components/EventHeader";
import RegistrationSummary from "../containers/RegistrationSummary";
import RegistrationTypes from "../containers/RegistrationTypes";
import { getEventData } from "../state/selectors";
import {
  stepState,
  statusState,
  userFormSubmitState,
  userFormSaveState,
  userListState,
  activeUser,
} from "../state/atoms";
import Workshop from "../containers/Workshop";
import { Button, toaster } from "evergreen-ui";
import Loading from "../components/Loading";


function EventPage() {
  const [loading, setLoading] = useState(true);
  const eventData = useRecoilValue(getEventData);

  const [everythingOK] = useRecoilState(statusState);
  const [activeStep, setStep] = useRecoilState(stepState);
  const [userList, setUserList] = useRecoilState(userListState);
  const [user] = useRecoilState(activeUser);
  const [userFormSubmit, setUserFormSubmit] = useRecoilState(
    userFormSubmitState
  );
  const [formSaveState] = useRecoilState(userFormSaveState);
  const activeUserReset = useResetRecoilState(activeUser);

  useEffect(() => {
    if (userFormSubmit && formSaveState) {
      setStep(activeStep + 1);
    }
  }, [userFormSubmit, formSaveState]);

  useEffect(() => {
    if (!userList.length) {
      setStep(2);

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }

  }, [userList]);


  const formSendAPI = () => {

    let total_amount = userList.map(userData => { return [
    userData.selectType.event_registration_type_price, 
    ...userData.selectWorkshops.map(i => i.price)]
    .reduce((x,y) => x+y, 0) }).reduce((x,y) => x+y, 0);

    let postData = {
      "registrations": [],
      "total_amount": total_amount
    }

    userList.map(val => {
      let postItem = {
        event_registration_firstname: val?.userData?.fist_name,
        event_registration_lastname: val?.userData?.last_name,
        event_registration_email: val?.userData?.email,
        event_registration_type_id: val?.selectType?.event_registration_type_id,
        event_registration_type_price: val?.selectType?.event_registration_type_price,
        workshops: []
      }
      val.selectWorkshops.map(shopVal => {
        postItem["workshops"].push({
          "event_workshop_id": shopVal?.id,
          "event_workshop_price": shopVal?.price
        })
      })
      postData["registrations"].push(postItem);
    });

    (async () => {
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/save-ticket`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      const content = await rawResponse.json();
      return content;

    })();
  }


  const nextStep = () => {
    if (everythingOK) {
      if (activeStep === 3) {
        setStep(1);
        
        if(Number.isInteger(user.complete)){
          // if user update 
          let users = [...userList];
          users[user.complete] = user;
          setUserList(users);
          
        }else{
          setUserList([...userList, user]);
        }

        activeUserReset();

      } else if(activeStep === 1){
        formSendAPI();
        
      } else {
        setStep(activeStep + 1);
      }
    } else {
      switch (activeStep) {
        case 2:
          if (!userFormSubmit) {
            setUserFormSubmit(true);
          }
          break;

        default:
          console.log("activeStep : ", activeStep);
          break;
      }
    }
  };

  return (
    <div className="container">
      <App>
        <EventHeader
          props={{
            name: eventData?.event_long_name,
            title: eventData?.venue?.event_venue_title,
            city: `${eventData?.venue?.event_venue_city} - ${eventData?.countryName}`,
            date: `${eventData?.date?.start} - ${eventData?.date?.end}`,
          }}
        />
        {loading ? <Loading /> : (
        <div className="content">
          {activeStep === 1 && <RegistrationSummary />}

          {activeStep === 2 && <RegistrationTypes />}

          {activeStep === 3 && <Workshop />}

          {activeStep === 4 && <RegistrationSummary />}
        </div>
        )}

        <FixedFooterMenu>
          <div className="container">
            <Button className="next-stepBtn" onClick={() => nextStep()}>
              Next Step
            </Button>
          </div>
        </FixedFooterMenu>
      </App>
    </div>
  );
}

export default EventPage;
