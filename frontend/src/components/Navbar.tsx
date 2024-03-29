import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { DISCORD_URL, NAME } from '../globals';
import { Box, Drawer, Icon, IconEnum, Navbar as JNavbar, ThemeContext, Button } from '../Jet';


const links = [
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Tutorial',
    href: '/tutorial',
  },
  {
    label: 'Discord',
    href: DISCORD_URL,
    newTab: true,
  }
];

const NavbarLinkStyle = styled.a.attrs((props: any) => props)`
  display: block;
  color: ${props => props.theme.colors.text[0]};
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  padding: 0.8rem;
  cursor: pointer;
  ${props => props.active && `border-bottom: solid 4px ${props.theme.colors.primary[0]};`}

  &:hover {
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
  top: 1.4rem;
  left: 1rem;
  cursor: pointer;

  @media (max-width: 390px) {
    top: 0.8rem;
    left: 0.8rem;
  }
`;

const NavbarStyle = styled(JNavbar)`
  background-color: ${props => props.theme.colors.background[1]};
  padding: 0;
  min-height: 2.8rem;
  padding: 0 1rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
    text-align: center;

    .nav-links {
      display: none;
    }

    .access-btn {
      display: none;
    }

    .menu-button {
      display: block;
    }
  }

  @media (max-width: 390px) {
    .logo {
      max-width: 200px;
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
  const { logout } = useAuth();

  return (
    <>
      <NavbarStyle theme={theme}>
        <MenuButtonStyle className="menu-button" theme={theme} icon={IconEnum.menu} onClick={() => setDrawerOpen(true)} />
        <Box alignItems="center" justifyContent="center" spacing="2rem">
          <a className="logo" href="#/"><img src="/img/logo.png" alt={NAME} style={{ maxHeight: '70px' }} /></a>
          <Box className="nav-links">
            {links.map(link => (
              <NavbarLinkStyle key={link.href} href={link.newTab ? link.href : '#' + link.href} target={link.newTab ? '_blank' : ''} rel="noopener noreferrer" active={location.pathname === link.href} theme={theme}>
                {link.label}
              </NavbarLinkStyle>
            ))}
          </Box>
        </Box>

        <Box spacing="1rem" alignItems="center">
          {localStorage.getItem('token') ? (
            <Box spacing="1rem">
              <Button className="access-btn" onClick={() => window.location.href = '#/admin/dashboard'}>Dashboard</Button>
              <Button className="access-btn" variant="outlined" onClick={logout}>Logout</Button>
            </Box>
          ) : (
            <Button className="access-btn" glowing onClick={() => window.location.href = '#/pricing'}>Purchase</Button>
          )}
        </Box>
      </NavbarStyle>

      <DrawerStyle open={drawerOpen} onClose={() => setDrawerOpen(false)} theme={theme}>
        {links.map(link => (
          <NavbarLinkStyle key={link.href} href={link.newTab ? link.href : '#' + link.href} target={link.newTab ? '_blank' : ''} rel="noopener noreferrer" onClick={() => setDrawerOpen(false)} active={location.pathname === link.href} theme={theme}>
            {link.label}
          </NavbarLinkStyle>
        ))}
        {localStorage.getItem('token') && (
          <NavbarLinkStyle href="#/admin/dashboard" active={location.pathname === '/admin/dashboard'} onClick={() => setDrawerOpen(false)} theme={theme}>Dashboard</NavbarLinkStyle>
        )}
      </DrawerStyle>
    </>
  );
}

export default Navbar;
