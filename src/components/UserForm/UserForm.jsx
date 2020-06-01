import React, { useEffect, useState } from 'react';
import { FormField, TextInputField, Pane } from 'evergreen-ui';
import { Form } from '../../style';
import { userFormSubmitState, activeUser, statusState, userFormSaveState } from '../../state/atoms';
import { useRecoilState } from 'recoil';
import * as EmailValidator from 'email-validator';


const UserForm = () => { 
  const [formData, setFormData] = useState({
    fist_name: false,
    last_name: false,
    email: false
  });
  const [user, setUser] = useRecoilState(activeUser);
  const [userFormSubmit, setUserFormSubmit] = useRecoilState(userFormSubmitState)
  const [, setFormSaveState] = useRecoilState(userFormSaveState)
  const [, setFormStatus] = useRecoilState(statusState)

  useEffect(() => {
    if(user.userData){
      setFormData(user.userData);
    }
  }, [])

  useEffect(() => {
    if(userFormSubmit){
      let status = Object.keys(formData).map(item => { return formValid(item) ? false : true })
      if(!status.includes(false)){
        setUser({ 
          ...user, 
          userData: formData
        });
        setFormStatus(true);
        setFormSaveState(true);
        
      }else{
        setUserFormSubmit(false);
      } 
    }
  }, [userFormSubmit])

  const onChange = (key, val) => {
    setFormData({
      ...formData,
      [key]: val
    })
  }

  const formValid = (key) => {
    switch(key){
      case 'fist_name':
      case 'last_name':
        return formData[key]?.length ? false : 'Please provide information';

      default:
        let email_check = EmailValidator.validate(formData[key]);
        return formData[key] ? 
          email_check ? false : "Doesn't look like a valid email"
          : 'The E-mail field must be a valid email';
    }
  }

  return (
  <Form >
    <Pane display="flex" marginTop={10} height={120}>
      <Pane flex={20} display="flex">
        <FormField 
          className="user-form-input"
          width="90%"
          label={<TextInputField
            id="fist_name"
            label="Fist Name"
            required={true}
            placeholder="Fist Name"
            value={formData.fist_name ? formData.fist_name : ''}
            onChange={e => onChange('fist_name', e.target.value)}
            validationMessage={formValid('fist_name')}
          />}
          labelFor="first_name"
        />
      </Pane>
      <Pane flex={20} display="flex">
        <FormField 
          className="user-form-input"
          width="100%"
          label={<TextInputField
            id="last_name"
            label="Last Name"
            required={true}
            placeholder="Last Name"
            value={formData.last_name ? formData.last_name : ''}
            onChange={e => onChange('last_name', e.target.value)}
            validationMessage={formValid('last_name')}
          />}
          labelFor="last_name"
        />
      </Pane>
      </Pane>

      <Pane marginTop={-20} >
        <FormField 
          className="user-form-input"
          label={<TextInputField
            id="email"
            label="E-Mail"
            required={true}
            placeholder="E-Mail"
            value={formData.email ? formData.email : ''}
            onChange={e => onChange('email', e.target.value)}
            validationMessage={formValid('email')}
          />}
          labelFor="email"
        />
      </Pane>

      

    </Form>
  )
}

export default UserForm;