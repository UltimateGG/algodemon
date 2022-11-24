import React, { useContext } from 'react';
import { Box, ThemeContext } from '../Jet';


export interface ReviewProps {
  title: string;
  description: string;
  name: string;
  subtitle: string;
  avatar: string;
  backgroundColor?: number;
}

export const Review = (props: ReviewProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box flexDirection="column" style={{ border: 0, backgroundColor: theme.colors.background[props.backgroundColor || 0], padding: '1.4rem', borderRadius: theme.rounded, maxWidth: '40rem' }}>
      <h4 style={{ textAlign: 'left' }}>{props.title}</h4>
      <p style={{ textAlign: 'left', marginBottom: '1.4rem', fontSize: '1rem' }}>{props.description}</p>

      <Box style={{ marginTop: 'auto'}}>
        <img src={props.avatar} style={{ width: '3rem', height: '3rem', borderRadius: '50%', marginRight: '1rem' }} alt="Avatar" />
        
        <div>
          <p style={{ textAlign: 'left' }}>{props.name}</p>
          <small>{props.subtitle}</small>
        </div>
      </Box>
    </Box>
  );
}

export default Review;
