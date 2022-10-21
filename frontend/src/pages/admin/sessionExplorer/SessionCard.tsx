import React, { useContext } from 'react';
import styled from 'styled-components';
import { apiPost } from '../../../api/apiExecutor';
import { Session } from '../../../contexts/SessionTrackerContext';
import { URL } from '../../../globals';
import { Box, Icon, IconEnum, Paper, ThemeContext } from '../../../Jet';



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

const CardStyle = styled(Paper).attrs((props: any) => props)`
  padding: 1.2rem 0.8rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  position: relative;

  &:hover {
    background-color: ${props => props.theme.colors.background[3]};
  }

  .text-wrapping {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 600px) {
    .card-title {
      flex-direction: column;
    }
  }
`;

export interface SessionCardProps {
  session: Session;
  onDelete: () => void;
  onClick: () => void;
}

export const SessionCard = ({ session, onDelete, onClick }: SessionCardProps) => {
  const { theme } = useContext(ThemeContext);
  const duration = new Date(session.updatedAt || 0).getTime() - session.start;

  const handleDelete = () => {
    apiPost('admin/sessions/delete', { id: session._id }, true).then(res => {
      if (res.error) return alert(res.error);
      onDelete();
    });
  }

  return (
    <CardStyle elevation={1} theme={theme} onClick={onClick}>
      <Box className="card-title" justifyContent="space-between">
        <h4 className="text-wrapping" style={{ margin: 0 }}>{session.ipAddress}</h4>
        <Box flexDirection="column" style={{ position: 'relative' }}>
          <h4 className="text-wrapping" style={{ margin: 0 }}>{getTimestamp(session.start)}</h4>
          <small style={{ position: 'absolute', right: 0, top: '85%' }}>{toDuration(Date.now() - new Date(session.updatedAt || 0).getTime())} ago</small>
        </Box>

        <Icon icon={IconEnum.x} size={16} color={theme.colors.text[8]} style={{ position: 'absolute', right: 5, top: 5 }} onClick={() => handleDelete()} />
      </Box>
      <h6>{toDuration(duration)}</h6>
      <Box alignItems="center">
        {!session.startUrl.startsWith(URL) && <Icon icon={IconEnum.warning} size={18} color={theme.colors.warning[0]} />}
        <small>{session.events.length} event{session.events.length === 1 ? '' : 's'} | {session.startUrl}</small>
      </Box>

      {session.user && (
      <Box alignItems="center" spacing="0.2rem">
        <Icon icon={IconEnum.account} size={18} color={theme.colors.text[5]} />
        <small>{session.user.email}</small>
      </Box>
      )}

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
        <small className="text-wrapping">{session.device.platform} {session.device.userAgent}</small>
      </Box>

      {session.device.isBrave && (
        <Box alignItems="center" spacing="0.2rem">
          <Icon icon={IconEnum.lock} size={18} color={theme.colors.text[5]} />
          <small>Brave Browser</small>
        </Box>
      )}
    </CardStyle>
  );
}

export default SessionCard;
