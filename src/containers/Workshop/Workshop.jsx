import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getEventData } from '../../state/selectors';
import WorkShopItem from './WorkShopItem';
import { WorkshopPage } from '../../style';
import { Heading, Icon } from 'evergreen-ui';
import UserItem from '../../components/UserItem';

const Workshop = _ => { 
  
  const { workshops, currencySembol  }  = useRecoilValue(getEventData);


  return (
    <WorkshopPage>

      <UserItem
        className="user-information"
        editable={false}
      />


      <Heading is="h3" className="page-title">
        <Icon size={25} icon="wrench" /> Workshop
      </Heading>

      {workshops.map(item => 
        <WorkShopItem
          key={item?.event_workshop_id}
          props={{
            id: item?.event_workshop_id,
            title: item?.event_workshop_title,
            price: item?.event_workshop_price,
            priceText: `${currencySembol} ${parseInt(item?.event_workshop_price).toFixed(2)}`,
          }} />
        )}
      
    </WorkshopPage>
  )
}

export default Workshop;