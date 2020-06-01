import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserItemStyle } from '../../style';
import { Button, Heading, Text, UnorderedList, ListItem, Icon } from 'evergreen-ui';
import { userListState, statusState, userFormSaveState, userFormSubmitState, activeUser, stepState } from '../../state/atoms';
import { getEventData } from '../../state/selectors';
import { titleCase } from '../../utils/functions';

const UserItem = ({ props=false, userID=false, editable=true , className='' }) => { 
  const [userData, setUserData] = useState();
  const [moreText, setMoreText] = useState("");
  const [price, setPrice]       = useState("");

  const { currencySembol  }     = useRecoilValue(getEventData);
  const [showMore, setShowMore] = useState(editable ? userID ? false: true : false);
  const [userList, setUserList] = useRecoilState(userListState);

  const [, setStep]                       = useRecoilState(stepState);
  const [activeUserData, setEditUser]         = useRecoilState(activeUser)
  const [, setFormStatus]       = useRecoilState(statusState)
  const [, setFormSaveState]    = useRecoilState(userFormSaveState)
  const [, setUserFormSubmit]   = useRecoilState(userFormSubmitState);
  
  useEffect(() => {
    if(!editable){
      setUserData({
        ...activeUserData,
        fullName: `${titleCase(activeUserData?.userData?.fist_name)} ${titleCase(activeUserData?.userData?.last_name)}`
      });
    }else{
      setUserData({
        ...props, 
        fullName: `${titleCase(props?.userData?.fist_name)} ${titleCase(props?.userData?.last_name)}`
      })
    }
  }, [activeUserData])

  useEffect(() => {
    setPrice(`${currencySembol} ${priceSum()}`)
  }, [userData])


  useEffect(() => {
    setMoreText(showMore ? "Hide Items" : "Show Items")
  }, [showMore])

  const priceSum = () => {
    if(userData){
      return [
      userData?.selectType.event_registration_type_price, 
        ...userData?.selectWorkshops.map(i => i.price)]
        .reduce((x,y) => x+y, 0).toFixed(2);
    }else{
      return 0;
    }
  }

  const itemsLength = () => {
    return userData?.selectWorkshops.length + 1;
  }

  const deleteUserAt = () => {
    const users = [...userList];
    users.splice(userID, 1);
    setUserList(users);

    if(!users.length){
      setFormStatus(false);
      setFormSaveState(false);
      setUserFormSubmit(false);
    }
  };

  const editUserAt = () => {
    setEditUser({...userData, complete: userID});
    setStep(2);
  }

  const deleteWorkShop = (index) => {
    if(editable){
      let users = [...userList];
      const workshopList = userData?.selectWorkshops.filter((i, k) => {return k!==index});
      let updateUser = {
        ...userData,
        selectWorkshops: workshopList
      };
      users[userID] = updateUser;
      setUserData(updateUser);
      setUserList(users);
    }else{
      const workshopList = userData?.selectWorkshops.filter((i, k) => {return k!==index});
      setEditUser({...userData, selectWorkshops: workshopList});
    }
  }

  return (
    <UserItemStyle className={className}>
      <div className="card">
        <header className="card-header">
          <div className="left">
            <p className="card-header-title">Registration details for</p>
            <strong className="user-name-title">
              {userData?.fullName}
            </strong>
          </div>
          <div className="right">
            <span className="amount">AMOUNT</span>
            <strong className="user-price">{price}</strong>
          </div>

        </header>
        <div className="card-content">
          <div className="content">

            {showMore && (
              <div className="collapse">
                
                <div className="information user-box">
                  <Heading is="h5">Registration Information</Heading>
                  <Text className="user-information-name">

                      {editable && (
                      <Icon 
                      className="user-edit-icon"
                      onClick={() => editUserAt()}
                      icon="edit" size={27} />
                      )}
                      
                      <span className="user-name">
                        {userData?.fullName} - 
                        {userData?.selectType?.event_registration_type_title}
                      </span>

                    <span className="price">{`${currencySembol} ${userData?.selectType?.event_registration_type_price.toFixed(2)}`}</span>
                  </Text>
                </div>

                {userData?.selectWorkshops.length > 0 && (
                <div className="additional-services user-box">
                <Heading is="h5">Additional Services</Heading>
                <UnorderedList>
                  
                  {userData?.selectWorkshops.map((item, itemId) => (
                    <ListItem key={itemId}>
                      <Icon 
                        className="delete-workshop"
                        onClick={() => deleteWorkShop(itemId)}
                        icon="delete" size={27} />
                      
                      {item.title}

                      <span className="price">{item.priceText}</span>
                    </ListItem>))}
                  
                </UnorderedList>
                </div>
                )}

              </div>
            )}

            <Button 
              appearance="minimal" 
              className="show-more" 
              onClick={() => setShowMore(!showMore)}>
                {moreText} ({itemsLength()})
            </Button>

          </div>
          
          {editable && (
          <div className="user-button">
            <button className="editBtn" onClick={() => editUserAt()}>
              <i className="fas fa-edit" ></i>
            </button>

            <button className="deleteBtn" onClick={() => deleteUserAt()}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          )}


        </div>
        
      </div>
    </UserItemStyle>
  )
}

export default UserItem;