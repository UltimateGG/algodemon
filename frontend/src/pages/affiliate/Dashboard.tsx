import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AFFILIATE_PERCENT } from '../../globals';
import { Box, Icon, IconEnum, ThemeContext } from '../../Jet';


const PageStyle = styled.div.attrs((props: any) => props)`
  margin-top: 6rem;
  margin-bottom: 2rem;

  code {
    background-color: ${props => props.theme.colors.background[2]};
    border-radius: ${props => props.theme.rounded};
    padding: 0.2rem 0.5rem;
    font-size: 1.9rem;
    margin-top: 0.2rem;
    word-break: break-all;
  }

  .account-info {
    display: flex;
    align-items: center;
    whitespace: nowrap;

    h4, p {
      margin: 0;
    }

    p {
      margin-left: 1rem;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;

    th, td {
      padding: 0.5rem;
      border: 1px solid ${props => props.theme.colors.background[2]};
      text-align: center;
    }

    th {
      background-color: ${props => props.theme.colors.background[2]};
      font-weight: 500;
    }

    tr:nth-child(2n) {
      background-color: ${props => props.theme.colors.background[1]};
    }
  }

  .table-container {
    overflow-x: auto;
    
    table {
      width: 100%;
    }
  }
`;

export const DashboardPage = () => {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = React.useState<any>(null);

  const getUser = () => {
    fetch('/api/user', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(res => {
      if (res.status !== 200) {
        sessionStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        res.json().then(json => setUser(json));
      }
    });
  }

  useEffect(() => {
    if (!sessionStorage.getItem('token')) window.location.href = '/login';
    else getUser();
  }, []);

  if (!user) return null;

  return (
    <PageStyle theme={theme}>
      <h1 style={{ textAlign: 'center' }}>Affiliate Dashboard</h1>

      <Box style={{ padding: '2rem' }} flexDirection="column" spacing="1.2rem">
        <div>
          <h2>Referrals</h2>
          <p>Here are all of your referrals. You will be paid {AFFILIATE_PERCENT}% from every purchase made using your referral code.</p>
        </div>

        <Box spacing="1rem">
          <p>Total Referrals: <strong>{user.referrals.length}</strong></p>
          <p>Total Earned: <strong>${user.referrals.reduce((acc: number, referral: any) => acc + referral.amount, 0).toFixed(2)}</strong></p>
        </Box>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Paid Out</th>
                <th>Username</th>
                <th>Earned</th>
              </tr>
            </thead>
            <tbody>
              {user.referrals.map((referral: any) => (
                <tr>
                  <td>{new Date(referral.date).toLocaleDateString()}</td>
                  <td>{referral.paidOut ? (
                    <Icon icon={IconEnum.checkmark} color={theme.colors.success[0]} />
                  ) : (
                    <Icon icon={IconEnum.x} color={theme.colors.danger[0]} />
                  )}</td>
                  <td>{referral.username}</td>
                  <td>${referral.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>

      <Box style={{ padding: '2rem' }} flexDirection="column" spacing="1.2rem">
        <Box flexDirection="column">
          <h2>Account Info</h2>

          <p>PayPal Email: <strong>{user.email}</strong></p>
          <p>Referral Code: <strong>{user.affiliateCode}</strong></p>
          <p>Referrals: <strong>{user.referrals.length}</strong></p>
        
          <p><a onClick={() => { // eslint-disable-line
            sessionStorage.removeItem('token');
            window.location.href = '/';
          }}>Logout</a></p>
        </Box>

        <Box flexDirection="column" >
          <h2>Payment Info</h2>
          <p>You will be paid {AFFILIATE_PERCENT}% from every purchase made using your referral code. Payments are sent to your PayPal account using the email listed on this page. You should receive payments within a week of referral. If you have any issues, please feel free to <a href="/contact">contact us</a>.</p>
        </Box>
      </Box>


      <Box flexDirection="column" className="background-primary" style={{ padding: '2rem' }}>
        <h1>Referral Link</h1>
        <p>Share this link to earn money!</p>
        <code>{window.location.origin}/?r={user.affiliateCode}</code>

        <p style={{ marginTop: '2rem' }}>Give to users to manually enter</p>
        <small>If you can't put a link in your TikTok bio yet</small>
        <code>{user.affiliateCode}</code>
      </Box>
    </PageStyle>
  );
}

export default DashboardPage;
