import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Drawer, Icon, IconEnum, Navbar as JNavbar, ThemeContext } from '../Jet';


const links = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Me',
    href: '/about',
  },
  {
    label: 'My Work',
    href: '/work',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

const NavbarLinkStyle = styled.a.attrs((props: any) => props)`
  display: block;
  color: ${props => props.theme.colors.text[0]};
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  padding: 0.8rem;
  cursor: pointer;
  ${props => props.active && `border-bottom: solid 4px ${props.theme.colors.primary[5]};`}

  &:hover {
    background-color: ${props => props.theme.colors.primary[2]};
    text-decoration: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    ${props => props.active && `border-left: solid 4px ${props.theme.colors.primary[0]};`}
    border-bottom: none;
  }
`;

const MenuButtonStyle = styled(Icon).attrs((props: any) => props)`
  display: none;
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
  cursor: pointer;
`;

const NavbarStyle = styled(JNavbar)`
  background-color: ${props => props.theme.colors.primary[0]};
  padding: 0;
  min-height: 2.8rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
    text-align: center;

    .nav-links {
      display: none;
    }

    .menu-button {
      display: block;
    }
  }
`;

const DrawerStyle = styled(Drawer)`
  padding-top: 1.8rem;
  min-width: 25vw;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    min-width: 45vw;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 75vw;
  }
`;

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <NavbarStyle theme={theme}>
        <MenuButtonStyle className="menu-button" theme={theme} icon={IconEnum.menu} onClick={() => setDrawerOpen(true)} />
        <Box className="nav-links">
          {links.map(link => (
            <NavbarLinkStyle key={link.href} href={link.href} active={location.pathname === link.href} theme={theme}>
              {link.label}
            </NavbarLinkStyle>
          ))}
        </Box>
      </NavbarStyle>

      <DrawerStyle open={drawerOpen} onClose={() => setDrawerOpen(false)} theme={theme}>
        {links.map(link => (
          <NavbarLinkStyle key={link.href} href={link.href} active={location.pathname === link.href} theme={theme}>
            {link.label}
          </NavbarLinkStyle>
        ))}
      </DrawerStyle>
    </>
  );
}

export default Navbar;
