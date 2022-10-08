import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiPost } from '../api/apiExecutor';
import { IconEnum } from '../Jet';


interface SessionEvent {
  type: 'start' | 'pageview' | 'click' | 'scroll' | 'login' | 'logout' | 'signup' | 'purchase'
  timestamp?: number;
  data: Object;
}

export const SessionTracker = () => {
  const location = useLocation();

  const XCV = (str: string, k: string) => {
    const k2 = k.split('').map((c) => c.charCodeAt(0));
    let s = '';

    for (let i = 0; i < str.length; i++)
      s += String.fromCharCode(str.charCodeAt(i) ^ k2[i % k2.length]);

    return s;
  }

  const sendUpdate = async (event: SessionEvent) => {
    const n = Date.now();
    const rx = Math.floor(Math.random() * 100000000000000000);
    const ldap = XCV('ldx', (rx ^ 0x35ed7 & n) + '.');

    event.timestamp = n;

    apiPost('al/u', {
      d: XCV(JSON.stringify(event), (n ^ 0x26af ^ rx) + ldap + String.fromCharCode(rx)),
      v: n,
      r: rx,
      ldap
    }, true);
  }

  const onPageChange = () => {
    sendUpdate({
      type: 'pageview',
      data: {
        page: location.pathname
      }
    });
  }

  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const btn = target.closest('button');
    const svg = target.closest('svg');
    const icon = svg !== null ? svg.getAttribute('data-icon') : null;

    const keys = Object.keys(IconEnum);
    keys.splice(0, keys.length / 2);

    sendUpdate({
      type: 'click',
      data: {
        page: location.pathname,
        target: {
          isButton: btn !== null,
          tagName: target.tagName,
          text: icon !== null ? keys[+icon!] : (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') ? (target as HTMLInputElement).placeholder : target.innerText,
        },
        x: e.clientX,
        y: e.clientY
      }
    });
  }

  const scrollState = {
    start: 0,
    startY: 0,
    end: 0,
    endY: 0,
    scrolling: false
  };
  const onScroll = () => {
    if (scrollState.scrolling) return scrollState.end = Date.now();
    scrollState.scrolling = true;
    scrollState.startY = window.scrollY;
    scrollState.start = Date.now();
  }

  const onScrollEnd = () => {
    sendUpdate({
      type: 'scroll',
      data: {
        page: location.pathname,
        start: scrollState.start,
        end: scrollState.end,
        startY: scrollState.startY,
        endY: scrollState.endY
      }
    });
  }

  useEffect(() => {
    sendUpdate({
      type: 'start',
      data: {
        start: Date.now(),
        device: {
          userAgent: navigator.userAgent,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          platform: navigator.platform,
          vendor: navigator.vendor,
          language: navigator.language,
          isBrave: (navigator as any).brave ? true : false,
        }
      }
    });
  }, []);

  useEffect(() => {
    onPageChange();

    window.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll);

    const interval = setInterval(() => {
      if (scrollState.scrolling && Date.now() - scrollState.end > 1000) {
        scrollState.scrolling = false;
        scrollState.endY = window.scrollY;

        if (scrollState.endY !== scrollState.startY)
          onScrollEnd();
      }
    }, 100);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
      clearInterval(interval);
    }
  }, [location]);

  return null;
}

export default SessionTracker;
