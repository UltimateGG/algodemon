import React, { useEffect } from 'react';
import { useLocation } from 'react-router';


export const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }, [location]);

  return (<div style={{ width: '100%', height: '100%', scrollBehavior: 'smooth' }}>{children}</div>);
};

export default ScrollToTop;
