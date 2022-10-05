import React, { createContext, ReactNode, useEffect } from 'react';
import { shiftColor, Theme, themeDefault } from './Theme';


export const ThemeContext = createContext({
  theme: themeDefault,
  setTheme: (theme: Theme) => {},
});

interface JetDesignProps {
  children: ReactNode;
  theme?: Theme;
}

const getGlobalStyles = (props: any) => `
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
    scroll-behavior: smooth;
    color: ${props.theme.colors.text[0]};
    font-family: ${props.theme.fontFamily};
  }

  body, #root {
    height: 100vh;
    min-height: 100vh;
    background-color: ${props.theme.colors.background[0]};
    font-size: ${props.theme.fontSize};
  }

  button {
    font-size: ${props.theme.fontSize};
  }

  h1 { font-size: 2.6rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  a {
    cursor: pointer;
    color: ${shiftColor(props.theme.colors.primary[0], -0.3)};
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }

  a:hover {
    text-decoration: underline;
  }

  p, i, strong, em, span, b, li {
    line-height: 1.4;
    font-weight: 100;
  }

  p, li {
    color: ${props.theme.colors.text[5]};
    font-size: 1.2rem;
  }

  .pretitle {
    font-size: 1.25rem;
    color: ${props.theme.colors.text[6]};
    text-transform: uppercase;
    text-align: center;
  }

  .text-primary {
    color: ${props.theme.colors.primary[0]};
  }

  .background-primary {
    background-color: ${props.theme.colors.primary[0]};
  }

  small {
    font-size: 0.75rem;
    color: ${props.theme.colors.text[6]};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::-webkit-scrollbar {
    width: 0.6rem;
  }
  
  ::-webkit-scrollbar-track {
    background-color: ${props.theme.colors.background[1]};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${props.theme.colors.background[3]};
    border-radius: ${props.theme.rounded};
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${props.theme.colors.background[4]};
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: ${props.theme.colors.background[5]};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  th, td {
    padding: 0.5rem;
    border: 1px solid ${props.theme.colors.background[2]};
    text-align: center;
  }

  th {
    background-color: ${props.theme.colors.background[2]};
    font-weight: 500;
  }

  tr:nth-child(2n) {
    background-color: ${props.theme.colors.background[1]};
  }

  .table-container {
    overflow-x: auto;
  }
  
  .table-container table {
    width: 100%;
  }
`;

const JetDesign = ({ children, theme: initial = themeDefault }: JetDesignProps) => {
  const [theme, setTheme] = React.useState<Theme>(initial);

  // Inject fonts into head
  useEffect(() => {
    if (document.head.querySelector('[data-jet-injected]')) return;

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = theme.font;

    document.head.appendChild(fontLink);

    const globalStyles = document.createElement('style');
    globalStyles.innerHTML = getGlobalStyles({ theme });
    document.head.appendChild(globalStyles);

    const configElem = document.createElement('div');
    configElem.setAttribute('data-jet-injected', 'true');
    document.head.appendChild(configElem);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default JetDesign;
