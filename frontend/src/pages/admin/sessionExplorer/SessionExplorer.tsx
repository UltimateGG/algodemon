import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { apiGet } from '../../../api/apiExecutor';
import { useAuth } from '../../../contexts/AuthContext';
import { Session } from '../../../contexts/SessionTrackerContext';
import { NAME } from '../../../globals';
import { Box, Button, Icon, IconEnum, Progress, ThemeContext } from '../../../Jet';
import SessionCard from './SessionCard';
import SessionView from './SessionView';


const PageStyle = styled.div.attrs((props: any) => props)`
  margin-top: 6rem;
  margin-bottom: 2rem;

  .grid-list {
    margin: 0 2rem;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }

  @media (max-width: 1200px) {
    .grid-list {
      grid-template-columns: repeat(1, minmax(300px, 1fr));
    }
  }

  @media (max-width: 600px) {
    .heading {
      font-size: 1.5rem;
    }
  }
`;

export const SessionExplorer = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const [sessions, setSessions] = React.useState<Session[] | null>(null);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalSessions, setTotalSessions] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [viewing, setViewing] = React.useState<Session | null>(null);

  const fetchSessions = async (page: number) => {
    setLoading(true);
    setError('');
    
    apiGet('admin/sessions?page=' + page, true).then(res => {
      if (res.error) return setError(res.error);
      setSessions(res.data.sessions);
      setTotalPages(res.data.totalPages);
      setTotalSessions(res.data.totalSessions);
    }).finally(() => {
      setLoading(false);
    });
  }

  const changePage = (newPage: number) => {
    newPage = Math.max(1, newPage);
    newPage = Math.min(totalPages, newPage);

    if (newPage !== page) {
      setPage(newPage);
      fetchSessions(newPage);
    }
  }

  useEffect(() => {
    document.title = NAME + ' - Session Explorer';

    if (!user) {
      window.location.href = '#/login';
      return;
    }

    if (!sessions) fetchSessions(page);
  }, [user, sessions, page]);

  if (viewing)
    return (
      <SessionView
        session={viewing}
        onDelete={() => {
        setViewing(null);
        fetchSessions(page);
        }}
        onClose={() => setViewing(null)}
      />
    );

  return (
    <PageStyle theme={theme}>
      <Box alignItems="center" spacing="1.2rem" style={{ padding: '0 2rem', marginBottom: '1.2rem' }}>
        <Button color="secondary" style={{ padding: '0.2rem 0.4rem' }} onClick={() => window.location.href = '/#/dashboard'}>
          <Icon icon={IconEnum.left} />
        </Button>
        <h1 className="heading" style={{ textAlign: 'center', margin: 0, wordBreak: 'break-word' }}>Session Explorer ({totalSessions})</h1>
      </Box>

      {error !== '' && (
        <Box flexDirection="column" justifyContent="center" alignItems="center">
          <h1 style={{ color: theme.colors.danger[0], fontSize: '3rem' }}><Icon icon={IconEnum.error} size={36} color={theme.colors.danger[0]} /> Error</h1>
          <p>{error}</p>
        </Box>
      )}
      {loading ? (
        <Box justifyContent="center" alignItems="center">
          <Progress circular indeterminate />
        </Box>
      ) : sessions && (
        <Box className="grid-list" display="grid" spacing="1.2rem">
          {sessions.map((session) => (
          <SessionCard key={session._id} session={session} onDelete={() => fetchSessions(page)} onClick={() => setViewing(session)} />
        ))}
        </Box>
      )}

      <Box justifyContent="center" alignItems="center" style={{ margin: '1rem 0' }}>
        <Box alignItems="center" spacing="1.2rem" style={{ padding: '0 2rem' }}>
          <Button color="secondary" style={{ padding: '0.2rem 0.4rem' }} onClick={() => changePage(page - 1)} disabled={loading || page === 1}>
            <Icon icon={IconEnum.left} />
          </Button>
          <h3 style={{ textAlign: 'center', margin: 0 }}>{page} / {totalPages}</h3>
          <Button color="secondary" style={{ padding: '0.2rem 0.4rem' }} onClick={() => changePage(page + 1)} disabled={loading || page === totalPages}>
            <Icon icon={IconEnum.right} />
          </Button>
        </Box>
      </Box>
    </PageStyle>
  );
}

export default SessionExplorer;
