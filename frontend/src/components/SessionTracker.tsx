import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IconEnum } from '../Jet';


const getWSUrl = (path: string) => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host;
  return `${protocol}//${host.replace(':3000', '')}${path}`;
}

const XCV = (str: string, k: string) => {
  const k2 = k.split('').map((c) => c.charCodeAt(0));
  let s = '';

  for (let i = 0; i < str.length; i++)
    s += String.fromCharCode(str.charCodeAt(i) ^ k2[i % k2.length]);

  return s;
}

const formatMsg = (event: SessionEvent) => {
  const n = Date.now();
  const rx = Math.floor(Math.random() * 100000000000000000);
  const ldap = XCV('ldx', (rx ^ 0x35ed7 & n) + '.'); // eslint-disable-line

  return {
    d: XCV(JSON.stringify(event), (n ^ 0x26af ^ rx) + ldap + String.fromCharCode(rx)),
    v: n,
    r: rx,
    ldap
  };
}

enum EventType {
  START = 'start',
  PAGE_VIEW = 'pageview',
  CLICK = 'click',
  SCROLL = 'scroll',
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNUP = 'signup',
  PURCHASE = 'purchase',
}

interface SessionEvent {
  type: EventType;
  timestamp: number;
  page: string;
  data: Object;
}

export const SessionTracker = () => {
  const location = useLocation();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [sendQueue, setSendQueue] = useState<SessionEvent[]>([]);

  const addToQueue = (type: EventType, data?: Object) => {
    const builtEvent: SessionEvent = {
      type,
      timestamp: Date.now(),
      page: location.pathname,
      data: data || {},
    }

    setSendQueue((queue) => [...queue, builtEvent]);
  };

  const processQueue = async () => {
    if (sendQueue.length === 0 || !ws || ws.readyState !== WebSocket.OPEN) return;

    ws.send(JSON.stringify(sendQueue.map(formatMsg)));
    setSendQueue([]);
  }

  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const svg = target.closest('svg');
    const icon = svg !== null ? svg.getAttribute('data-icon') : null;

    const keys = Object.keys(IconEnum);
    keys.splice(0, keys.length / 2);

    console.log('CLICK')
    addToQueue(EventType.CLICK, {
      target: {
        isButton: target.closest('button') !== null,
        tagName: icon ? 'SVG' : target.tagName,
        text: icon !== null ? keys[+icon!]
          : (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') ? (target as HTMLInputElement).placeholder
          : target.tagName === 'IMG' ? (target as HTMLImageElement).alt
          : target.innerText,
      },
      x: e.clientX,
      y: e.clientY,
    });
  }


  // Queue processing loop
  useEffect(() => {
    const interval = setInterval(processQueue, 2_000);
    return () => clearInterval(interval);
  });

  // Init func, setup websocket once per page refresh
  useEffect(() => {
    if (ws) return;
    setWs(new WebSocket(`${getWSUrl('/al/c')}?t=${sessionStorage.getItem('token')}`));
    
    addToQueue(EventType.START, {
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
    });
  }, [ws]);

  // Hooks for tracking events
  useEffect(() => {
    window.addEventListener('click', onClick);
    // window.addEventListener('scroll', onScroll);

    // const interval = setInterval(() => {
    //   if (scrollState.scrolling && Date.now() - scrollState.end > 1000) {
    //     scrollState.scrolling = false;
    //     scrollState.endY = window.scrollY;

    //     if (scrollState.endY !== scrollState.startY)
    //       onScrollEnd();
    //   }
    // }, 100);

    console.log('PAGE VIEW')
    addToQueue(EventType.PAGE_VIEW);
    return () => {
      window.removeEventListener('click', onClick);
      // window.removeEventListener('scroll', onScroll);
      // clearInterval(interval);
    }
  }, [location]); // eslint-disable-line

  return null;
}

export default SessionTracker;
