import React, { useContext } from 'react';
import { Icon, IconEnum, ThemeContext } from '../Jet';


export const ReferralList = ({ user }: any) => {
  const { theme } = useContext(ThemeContext);

  return (
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
          {user.referrals.map((referral: any, index: number) => (
            <tr key={index}>
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
  );
}

export default ReferralList;
