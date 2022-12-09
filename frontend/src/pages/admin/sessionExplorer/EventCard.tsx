import React, { useContext } from 'react';
import styled from 'styled-components';
import { ClickEvent, EventType, ScrollEvent, Session, SessionEvent } from '../../../contexts/SessionTrackerContext';
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

const getContent = (event: SessionEvent, session: Session) => {
  switch (event.type) {
    case EventType.PAGE_VIEW:
      return null;
    case EventType.CLICK:
      return getClickEvent(event.data as ClickEvent);
    case EventType.SCROLL:
      return getScrollEvent(event.data as ScrollEvent, session.device.screenHeight);
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
