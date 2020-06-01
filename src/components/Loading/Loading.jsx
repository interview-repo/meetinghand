import React from 'react';
import { LoadingStyle } from '../../style';

const Loading = _ => { 
  //fas fa-spinner fa-pulse
  return (
    <LoadingStyle>
      <span className="icon is-medium">
        <span className="fa-stack">
          <i className="fas fa-pulse fa-spinner fa-stack-1x fa-inverse"></i>
        </span>
      </span>
    </LoadingStyle>
  )
}

export default Loading;