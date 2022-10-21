import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '../api/types';
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

export enum EventType {
  START = 'start',
  PAGE_VIEW = 'pageview',
  CLICK = 'click',
  SCROLL = 'scroll',
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNUP = 'signup',
  PURCHASE = 'purchase',
}

export interface StartEvent {
  start: number;
  startUrl: string;
  device: Device;
}

export interface ClickEvent {
  target: {
    isButton: boolean;
    tagName: string;
    text: string;
  },
  x: number;
  y: number;
}

export interface ScrollEvent {
  start: number;
  end: number;
  startY: number;
  endY: number;
}

export interface LoginEvent {
  user: string | User;
}

export interface SignUpEvent {
  email: string;
  passwordLength: number;
}

export interface PurchaseEvent {
  user?: string | User;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  username: string;
  affiliateCode: string;
  stripePaymentIntentId: string;
}

export type Event = StartEvent | ClickEvent | ScrollEvent | LoginEvent | SignUpEvent | PurchaseEvent;

export interface SessionEvent {
  type: EventType;
  timestamp: number;
  page: string;
  data: Event | {};
}

export interface Device {
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  platform: string;
  vendor: string;
  language: string;
  timezone: string;
  isBrave: boolean;
}

export interface Session {
  _id?: string;
  start: number;
  ipAddress: string;
  user: User;
  startUrl: string;
  device: Device;
  events: SessionEvent[];
  updatedAt?: string;
}

export interface SessionTrackerContextProps {
  addToQueue: (type: EventType, data?: Event) => void;
}
export const SessionTrackerContext = React.createContext<SessionTrackerContextProps>({
  addToQueue: () => {}
});

export const SessionTrackerProvider = ({ children }: any) => {
  const location = useLocation();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [sendQueue, setSendQueue] = useState<SessionEvent[]>([]);

  const addToQueue = (type: EventType, data?: Event) => {
    const builtEvent: SessionEvent = {
      type,
      timestamp: Date.now(),
      page: location.pathname,
      data: data || {},
    }

    setSendQueue((queue) => [...queue, builtEvent]);
  }

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

    const event = {
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
    };

    event.target.text = event.target.text === '' ? '[none]' : event.target.text;
    addToQueue(EventType.CLICK, event);
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
    addToQueue(EventType.SCROLL, {
      start: scrollState.start,
      end: scrollState.end === 0 ? Date.now() : scrollState.end,
      startY: scrollState.startY,
      endY: scrollState.endY
    });
  }


  // Queue processing loop
  useEffect(() => {
    const interval = setInterval(processQueue, 1_000);
    return () => clearInterval(interval);
  });

  // Init func, setup websocket once per page refresh
  useEffect(() => {
    if (ws) return;
    setWs(new WebSocket(`${getWSUrl('/al/c')}?t=${sessionStorage.getItem('token')}`));

    addToQueue(EventType.START, {
      start: Date.now(),
      startUrl: window.location.href,
      device: {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        platform: navigator.platform,
        vendor: navigator.vendor,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        isBrave: (navigator as any).brave ? true : false,
      }
    });
  }, [ws]); // eslint-disable-line

  // Hooks for tracking events
  useEffect(() => {
    window.addEventListener('click', onClick, true);
    window.addEventListener('scroll', onScroll);

    const interval = setInterval(() => {
      if (scrollState.scrolling && Date.now() - scrollState.end > 1000) {
        scrollState.scrolling = false;
        scrollState.endY = window.scrollY;

        if (scrollState.endY !== scrollState.startY)
          onScrollEnd();
      }
    }, 100);

    addToQueue(EventType.PAGE_VIEW);
    return () => {
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('scroll', onScroll);
      clearInterval(interval);
    }
  }, [location]); // eslint-disable-line

  return (
    <SessionTrackerContext.Provider value={{ addToQueue }}>
      {children}
    </SessionTrackerContext.Provider>
  );
}

export const useSessionTracker = () => React.useContext(SessionTrackerContext);
