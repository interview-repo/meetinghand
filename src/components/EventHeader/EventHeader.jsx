import React from 'react';
import PropTypes from 'prop-types';
import { EventHeaderBox } from '../../style'

const EventHeader = ({ props }) => { 
  return (
    <EventHeaderBox className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title event-name">
            {props?.name}
          </h1>
          <h2 className="subtitle">
            <strong className="event-title">{props?.title}</strong>
            <strong className="event-city">{props?.city}</strong>
            <strong className="event-date">{props?.date}</strong>
          </h2>
        </div>
      </div>
    </EventHeaderBox>
  )
}

EventHeader.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    city: PropTypes.string,
    date: PropTypes.string
  })
};
export default EventHeader;