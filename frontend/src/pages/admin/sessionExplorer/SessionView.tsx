import React, { useContext } from 'react';
import styled from 'styled-components';
import { apiPost } from '../../../api/apiExecutor';
import { Session } from '../../../contexts/SessionTrackerContext';
import { URL } from '../../../globals';
import { Box, Button, Icon, IconEnum, Paper, ThemeContext } from '../../../Jet';



const getTimestamp = (ms: number) => {
  const date = new Date(ms);
  const time = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0');

  return `${getDate(ms)} at ${time}`;
}

const getDate = (ms: number) => {
  let today = new Date(ms);
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}

const toDuration = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const secondsLeft = seconds % 60;
  const minutesLeft = minutes % 60;
  const hoursLeft = hours % 24;

  if (days > 0) return days + 'd ';
  if (hoursLeft > 0) return hoursLeft + 'h ';
  if (minutesLeft > 0) return minutesLeft + 'm ';
  if (secondsLeft > 0) return secondsLeft + 's ';
}

const PageStyle = styled.div.attrs((props: any) => props)`
  margin-top: 6rem;
  margin-bottom: 2rem;
  padding: 0 2rem;
  position: relative;
`;

export interface SessionViewProps {
  session: Session;
  onDelete: () => void;
  onClose: () => void;
}

export const SessionView = ({ session, onDelete, onClose }: SessionViewProps) => {
  const { theme } = useContext(ThemeContext);
  const duration = new Date(session.updatedAt || 0).getTime() - session.start;

  const handleDelete = () => {
    apiPost('admin/sessions/delete', { id: session._id }, true).then(res => {
      if (res.error) return alert(res.error);
      onDelete();
      window.location.href = '/#/admin/sessions';
    });
  }

  return (
    <PageStyle theme={theme}>
      <Box flexDirection="column" style={{ marginBottom: '1rem' }}>
        <h2 className="text-wrapping" style={{ margin: 0 }}>
          <Button color="secondary" style={{ padding: '0.2rem 0.4rem', marginRight: '1rem' }} onClick={onClose}>
            <Icon icon={IconEnum.left} />
          </Button>
          Session @ {getTimestamp(session.start)}
        </h2>
        <small>{toDuration(Date.now() - new Date(session.updatedAt || 0).getTime())} ago</small>
      </Box>

      <Icon icon={IconEnum.trash} size={26} color={theme.colors.danger[0]} style={{ cursor: 'pointer', position: 'absolute', right: '2rem', top: 0 }} onClick={() => handleDelete()} />
      
      <h4 className="text-wrapping" style={{ margin: 0 }}>IP:</h4>
      <h6>{session.ipAddress}</h6>

      <h4 className="text-wrapping" style={{ margin: 0 }}>Duration:</h4>
      <h6>{toDuration(duration)}</h6>

      <h4 className="text-wrapping" style={{ margin: 0 }}>User:</h4>
      <h6>{session.user ? session.user.email : 'Unknown'}</h6>

      <h4 className="text-wrapping" style={{ margin: 0 }}>Events:</h4>
      <h6>{session.events.length}</h6>

      <h4 className="text-wrapping" style={{ margin: 0 }}>User Agent:</h4>
      <Box alignItems="center" spacing="0.2rem">
        <div>
          {(session.device.platform === 'iPhone' || session.device.platform === 'Android') ? (
            <Icon icon={IconEnum.phone} size={18} color={theme.colors.text[5]} />
          ) : (session.device.platform.startsWith('Win') || session.device.platform.includes('Linux')) ? (
            <>
              {session.device.platform.includes('Linux') && <Icon icon={IconEnum.warning} size={18} color={theme.colors.warning[0]} />}
              <Icon icon={IconEnum.computer} size={18} color={theme.colors.text[5]} />
            </>
          ) : (
            <Icon icon={IconEnum.info} size={18} color={theme.colors.text[5]} />
          )}
        </div>
        <small className="text-wrapping">{session.device.platform} - {session.device.userAgent}</small>
      </Box>

      <h4 className="text-wrapping" style={{ margin: 0 }}>Screen:</h4>
      <h6>{session.device.screenWidth}x{session.device.screenHeight}</h6>

      <h4 className="text-wrapping" style={{ margin: 0 }}>Vendor:</h4>
      <h6>{session.device.vendor}</h6>

      <h4 className="text-wrapping" style={{ margin: 0 }}>Timezone:</h4>
      <h6>{session.device.timezone}</h6>

      <h4 className="text-wrapping" style={{ margin: 0 }}>Start URL:</h4>
      <h6>{session.startUrl}</h6>

      <h4 className="text-wrapping" style={{ margin: 0, display: 'flex', alignItems: 'center' }}>Brave Browser: <Icon style={{ marginLeft: '0.4rem' }} icon={session.device.isBrave ? IconEnum.checkmark : IconEnum.x} color={session.device.isBrave ? theme.colors.success[0] : theme.colors.danger[0]} /></h4>
    </PageStyle>
  );
}

export default SessionView;
