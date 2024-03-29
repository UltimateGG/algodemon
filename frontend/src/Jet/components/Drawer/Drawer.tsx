import React, { useEffect } from 'react';
import { ThemeContext } from '../../theme/JetDesign';
import styled from 'styled-components';
import { Icon } from '../../icons';
import { IconEnum } from '../../icons/Icons';


export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  closeOnOutsideClick?: boolean;
}

const DrawerStyle = styled.div.attrs((props: DrawerProps) => props)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${props => props.open ? '0' : '-105%'};
  transition: transform 0.3s ease-in-out;
  transform: ${props => props.open ? 'translateX(0)' : 'translateX(-105%)'};
  padding: 0.6rem;
  padding-top: 1.2rem;
  min-width: 8vw;
  max-width: 30vw;
  overflow: auto;
  background-color: ${props => props.theme.colors.background[3]};
  color: ${props => props.theme.colors.text[0]};
  font-size: 1.2rem;
  box-shadow: 0px 0px 0.6rem 0.4rem rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 6;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 50vw;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 90vw;
  }
`;

const OverlayStyle = styled.div.attrs((props: DrawerProps) => props)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.open ? '1' : '0'};
  transition: opacity 0.3s ease-in-out;
  pointer-events: ${props => props.open ? 'auto' : 'none'};
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  z-index: 5;
`;

const Drawer = (props: DrawerProps) => {
  const { open, onClose, closeOnOutsideClick = true, ...rest } = props;
  const { theme } = React.useContext(ThemeContext);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnOutsideClick && e.key === 'Escape')
        onClose && onClose();
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [open, onClose, closeOnOutsideClick]);

  return (<>
    <OverlayStyle theme={theme} open={open} onClick={() => {
      if (closeOnOutsideClick)
        onClose && onClose();
    }} />
    <DrawerStyle
      theme={theme}
      {...rest}
      open={open}
    >
      <Icon
        icon={IconEnum.x}
        size={24}
        style={{
          position: 'absolute',
          top: '0.2rem',
          right: '0.2rem',
          cursor: 'pointer',
        }}
        onClick={onClose}
      />
      {props.children}
    </DrawerStyle>
    </>);
}

export default Drawer;
