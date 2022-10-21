import React, { useContext } from 'react';
import styled from 'styled-components';
import { SessionEvent } from '../../../contexts/SessionTrackerContext';
import { Box, Paper, ThemeContext } from '../../../Jet';


const CardStyle = styled(Paper).attrs((props: any) => props)`
`;

export interface EventCardProps {
  event: SessionEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <CardStyle elevation={1} theme={theme}>
      <h1>{event.type.substring(0, 1).toUpperCase() + event.type.substring(1)}</h1>
      <small>Page: {event.page}</small>
    </CardStyle>
  );
}

export default EventCard;
