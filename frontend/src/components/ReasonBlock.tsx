import React, { useContext } from 'react';
import { Box, Icon, IconEnum, ThemeContext } from '../Jet';


export interface ReasonBlockProps {
  title: string;
  description: string;
  icon: IconEnum;
}

export const ReasonBlock = (props: ReasonBlockProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box flexDirection="column">
      <Icon className="background-primary" icon={props.icon} style={{ borderRadius: theme.rounded, padding: '0.4rem', marginBottom: '1.2rem' }} size={36} />
      <h5>{props.title}</h5>
      <p className="text-left">{props.description}</p>
    </Box>
  );
}

export default ReasonBlock;
