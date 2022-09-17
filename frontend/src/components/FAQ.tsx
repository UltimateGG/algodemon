import React, { useContext } from 'react';
import { Box, ThemeContext } from '../Jet';


export interface FAQProps {
  title: string;
  children: React.ReactNode;
}

export const FAQ = (props: FAQProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box flexDirection="column" style={{ backgroundColor: theme.colors.background[1], padding: '1.4rem', borderRadius: theme.rounded, maxWidth: '40rem' }}>
      <h4>{props.title}</h4>
      <p style={{ textAlign: 'left' }}>{props.children}</p>
    </Box>
);
}

export default FAQ;
