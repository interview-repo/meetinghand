import React, { useEffect, useState } from 'react';
import { RegistrationTypeStyle } from '../../style';
import TypeItem from './TypeItem';
import UserForm from '../../components/UserForm';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getEventData } from '../../state/selectors';
import { activeUser, userFormSubmitState } from '../../state/atoms';


const RegistrationTypes = _ => { 
  const [user, setUser]                         = useRecoilState(activeUser);
  const { registration_types, currencySembol  } = useRecoilValue(getEventData);
  const [,setUserFormSubmit]                    = useRecoilState(userFormSubmitState)

  const [selectedType, setSelectedType] = useState(false);


  useEffect(() => {
    setUserFormSubmit(false);
    if(user?.selectType?.event_registration_type_id){
      setSelectedType(selectedType ? selectedType : user?.selectType?.event_registration_type_id);
    }
    setUser({ 
      ...user, 
      selectType: selectedType ? 
        registration_types.find(i => i.event_registration_type_id === parseInt(selectedType)) 
        : false
    })
  }, [selectedType, user.selectType]);

  
  const resetType = () => {
    setUser({
      ...user,
      selectType: false
    })
  }

  return (
    <RegistrationTypeStyle>
      <div className="control">
        
        {selectedType ? (
          <>
            
            <TypeItem  
              active={true}
              setType={setSelectedType}
              resetType={resetType}
              props={{
                id: parseInt(user?.selectType?.event_registration_type_id),
                title: user?.selectType?.event_registration_type_title,
                price: `${currencySembol} ${parseInt(user?.selectType?.event_registration_type_price).toFixed(2)}`,
                active: true
              }} />
            <UserForm />

          </>
        ) : (
        <>
          {registration_types.map(type => 
            <TypeItem 
              key={type?.event_registration_type_id}
              setType={setSelectedType}
              props={{
                id: type?.event_registration_type_id,
                title: type?.event_registration_type_title,
                price: `${currencySembol} ${type?.event_registration_type_price.toFixed(2)}`
              }} />)}
          

        </>)}

      </div>
    </RegistrationTypeStyle>
  )
}

export default RegistrationTypes;