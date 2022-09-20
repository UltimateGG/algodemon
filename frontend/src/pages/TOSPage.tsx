import React from 'react';
import styled from 'styled-components';
import { NAME } from '../globals';
import { Box } from '../Jet';


const PageStyle = styled.div.attrs((props: any) => props)`
  .container {
    padding: 2rem 6rem;
    margin-top: 4rem;

    h1 {
      font-size: 3.6rem;
    }

    p {
      line-height: 1.8;
      color: #fff;
    }

    strong {
      text-decoration: underline;
      font-weight: bold;
    }
  }

  @media (max-width: 500px) {
    .container {
      padding: 2rem;

      h1 {
        font-size: 2.4rem;
      }
    } 
  }
`;

export const TOSPage = () => {
  return (
    <PageStyle>
      <Box className="container" flexDirection="column" justifyContent="center" alignItems="center" spacing="1.6rem">
        <h1>Disclaimer / Refund Policy</h1>

        <p>Our site is for educational use only and should not be considered financial advice. By viewing any material or using the information within this Site, you agree that this is general education material, and you will not hold any person or entity responsible for loss or damages resulting from the content or general information provided by us. Trading is risky. You must be aware of the risks and be willing to bear any level of risk to invest in financial markets. Past performance is not necessarily indicative of future results. This Site and all individuals and entities affiliated with this Site assume no responsibility for your trading results or investments. Information for trading is believed to be reliable, but we do not warrant it completeness or accuracy. Also, our partners or affiliated companies are in no way associated with the proprietary information provided by this Site. This Site cannot accept responsibility for any errors or omissions to the accuracy of information contained on this Site. We recommend that visitors and users seek advice from an independent financial advisor before buying or selling securities. We ({NAME}.com) do not and will not offer refunds for any reason. This is a digital product by agreeing to the terms of service you agree that <strong>we do not give out refunds</strong> under any circumstance. Our site is for educational use only and should not be considered financial advice. By viewing any material or using the information within this Site, you agree that this is general education material, and you will not hold any person or entity responsible for loss or damages resulting from the content or general information provided by {NAME}.com. Trading is risky. You must be aware of the risks and be willing to bear any level of risk to invest in financial markets. Past performance is not necessarily indicative of future results. {NAME}.com, and all individuals and entities affiliated with this site assume no responsibility for your trading results or investments. Information for trading is believed to be reliable, but we do not warrant it completeness or accuracy. Also, our partners or affiliated companies are in no way associated with the proprietary information provided by this Site. {NAME}.com cannot accept responsibility for any errors or omissions to the accuracy of information contained on this Site or by the product. ACCURACY, COMPLETENESS, AND TIMELINESS OF INFORMATION - We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or timelier sources of information. Any reliance on the material on this site is at your own risk. This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site. MODIFICATIONS TO THE SERVICE AND PRICES - Prices and/or fees for our service are subject to change without notice. Platform Fees are Non-Refundable. Non-Negotiable. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We reserve the right to modify the platform fees at any time for any merchant to any rate for any reason. We shall not be liable to you or to any third-party for any modification, price change, suspension, bugs, errors, omissions or discontinuance of the Service. We have the right to refuse or discontinue service to anyone at any time.</p>
      </Box>
    </PageStyle>
  );
}

export default TOSPage;
