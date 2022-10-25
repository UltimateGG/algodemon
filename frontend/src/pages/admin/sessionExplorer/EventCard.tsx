import React, { useContext } from 'react';
import styled from 'styled-components';
import { User } from '../../../api/types';
import { ClickEvent, EventType, PurchaseEvent, ScrollEvent, Session, SessionEvent, SignUpEvent } from '../../../contexts/SessionTrackerContext';
import { Icon, IconEnum, Paper, ThemeContext } from '../../../Jet';
import { getTimestamp, toDuration } from '../../../utils';


const CardStyle = styled(Paper).attrs((props: any) => props)`
`;

const getClickEvent = (event: ClickEvent) => {
  const keys = Object.keys(IconEnum);
  keys.splice(0, keys.length / 2);

  return (
    <>
      <p>X: {event.x}</p>
      <p>Y: {event.y}</p>
      {event.target.tagName === 'SVG' ? (
        <p style={{ display: 'flex', alignItems: 'center' }}>Icon:
          <Icon icon={keys.indexOf(event.target.text)} size={24} />
        </p>
      ) : (
        <>
          <p>Target: {event.target.tagName}{event.target.isButton && ' (Button)'}</p>
          <p>Text: <code style={{ wordBreak: 'break-word', fontSize: '0.8rem' }}>{event.target.text}</code></p>
        </>
      )}
    </>
  );
}

const getScrollEvent = (event: ScrollEvent, screenHeight: number) => {
  return (
    <>
      <p>Start: {getTimestamp(event.start, false)}</p>
      <p>End: {getTimestamp(event.end, false)}</p>
      <p>Duration: {toDuration(event.end - event.start)}</p>
      <p>Start Y: {event.startY.toFixed(0)}</p>
      <p>End Y: {event.endY.toFixed(0)}</p>
      <p>Px Scrolled: {(event.endY - event.startY).toFixed(0)} ({((event.endY - event.startY) / screenHeight).toFixed(2)}%)</p>
    </>
  );
}

const getSignUpEvent = (event: SignUpEvent) => {
  return (
    <>
      <p>Email: {event.email}</p>
      <p>Password Length: {event.passwordLength}</p>
    </>
  );
}

const getPurchaseEvent = (event: PurchaseEvent) => {
  return (
    <>
      <p>User: {event.user && (event.user as User).email}</p>
      <p>Name: {event.name}</p>
      <p>Email: {event.email}</p>
      <p>Address: {event.address}</p>
      <p>City: {event.city}</p>
      <p>State: {event.state}</p>
      <p>Zip: {event.zip}</p>
      <p>Country: {event.country}</p>
      <p>Username: {event.username}</p>
      <p>Affiliate Code: {event.affiliateCode}</p>
      <p>Payment ID: {event.paymentId}</p>
    </>
  );
}

const getContent = (event: SessionEvent, session: Session) => {
  switch (event.type) {
    case EventType.PAGE_VIEW:
      return null;
    case EventType.CLICK:
      return getClickEvent(event.data as ClickEvent);
    case EventType.SCROLL:
      return getScrollEvent(event.data as ScrollEvent, session.device.screenHeight);
    case EventType.SIGNUP:
      return getSignUpEvent(event.data as SignUpEvent);
    case EventType.PURCHASE:
      return getPurchaseEvent(event.data as PurchaseEvent);
    default:
      return null;
  }
}

export interface EventCardProps {
  session: Session;
  event: SessionEvent;
  prevTimestamp: number;
}

export const EventCard = ({ session, event, prevTimestamp }: EventCardProps) => {
  const { theme } = useContext(ThemeContext);
  const diff = Math.abs(event.timestamp - prevTimestamp);

  return (
    <CardStyle elevation={1} theme={theme}>
      <h1 style={{ margin: 0 }}>{event.type.substring(0, 1).toUpperCase() + event.type.substring(1)}</h1>
      <small>{getTimestamp(event.timestamp, false)}{prevTimestamp !== 0 && ` (Diff: ${toDuration(diff)})`}</small>
      <br />
      <small>Page: {event.page}</small>

      {getContent(event, session)}
    </CardStyle>
  );
}

export default EventCard;
