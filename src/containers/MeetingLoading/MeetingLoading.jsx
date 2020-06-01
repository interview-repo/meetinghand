import React from 'react';
import { Pane, Spinner, Heading } from 'evergreen-ui';

const MeetingLoading = ({text}) => { 
  return (
    <React.Fragment>
      <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
        <Heading is="h2" marginRight={30} >{text}</Heading>
        <Spinner />
      </Pane>
    </React.Fragment>
  )
}

export default MeetingLoading;