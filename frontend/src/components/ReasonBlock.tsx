import React, { useContext } from 'react';
import { LIGHT_THEME } from '../globals';
import { Box, Icon, IconEnum, ThemeContext } from '../Jet';


export interface ReasonBlockProps {
  title: string;
  description: string | JSX.Element;
  icon: IconEnum;
}

export const ReasonBlock = (props: ReasonBlockProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box flexDirection="column">
      <Icon className="background-primary" icon={props.icon} style={{ borderRadius: theme.rounded, padding: '0.4rem', marginBottom: '1.2rem' }} size={36} />
      <h5>{props.title}</h5>
      {typeof props.description === 'string' ? <p className="text-left">{props.description}</p> : props.description}
    </Box>
  );
}

export default ReasonBlock;
