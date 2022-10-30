import React, { useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import CheckoutForm from '../components/CheckoutForm';
import FAQ from '../components/FAQ';
import { useNotifications } from '../contexts/NotificationContext';
import Review from '../components/Review';
import { NAME, PRICE } from '../globals';
import { Box, Button, Divider, FileInput, Icon, IconEnum, Modal, Progress, TextArea, TextField, ThemeContext } from '../Jet';
import { apiGet } from '../api/apiExecutor';
import { EventType, useSessionTracker } from '../contexts/SessionTrackerContext';
import { useAuth } from '../contexts/AuthContext';


const PageStyle = styled.div.attrs((props: any) => props)`
  margin-top: 4rem;

  .purchase-box {
    border-radius: ${props => props.theme.rounded};
    background-color: #fff;
    max-width: 60rem;
    margin: 0 4rem;
    margin-bottom: 4rem;
    transform: translateY(-8rem);

    h1, h2, h3, h4, h5, p, span, a, s {
      color: #000;
    }
  }

  .code-p {
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.text[2]};
    padding: 0.2rem 0.4rem;
    border-radius: ${props => props.theme.rounded};
    margin-top: 1rem;
  }

  .package-section {
    padding: 2rem 4rem;
  }

  .reviews {
    grid-template-columns: repeat(2, 1fr);
  }

  .info-section {
    padding: 4rem 6rem;
    text-align: center;
  }

  h4 {
    text-align: left;
  }

  @media (max-width: 728px) {
    .purchase-box {
      transform: translateY(-2rem);

      h4 {
        font-size: 1.2rem;
      }
    }

    .package-section {
      padding: 1.4rem;
    }

    .info-section {
      padding: 4rem 2rem !important;
    }

    .reviews {
      grid-template-columns: 1fr;
    }

    .faq {
      flex-direction: column;
    }

    .section-header {
      margin-bottom: 2rem;
      font-size: 1.8rem;
    }
  }
`;

export const PricingPage = () => {
  const { theme } = useContext(ThemeContext);
  const [showCheckoutModal, setShowCheckoutModal] = React.useState(false);
  const [textField, setTextField] = React.useState('');
  const [affiliateCode, setAffiliateCode] = React.useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = React.useState(PRICE + '');
  const [submittingReivew, setSubmittingReview] = React.useState(false);
  const [reviewError, setReviewError] = React.useState('');
  const { addNotification } = useNotifications();
  const { addToQueue } = useSessionTracker();
  const { user } = useAuth();

  const handleSetCode = useCallback((code: string) => {
    apiGet('affiliates?code=' + code).then(res => {
      if (res.error) {
        setCurrentPrice(PRICE + '');
        localStorage.removeItem('ref');
        return addNotification({ text: 'Invalid referral code', variant: 'danger', position: 'top' });
      }

      localStorage.setItem('ref', code);
      setAffiliateCode(code);
      setCurrentPrice((PRICE * 0.2).toFixed(2));
    });
  }, [addNotification]);

  useEffect(() => {
    if (!localStorage.getItem('ref')) localStorage.setItem('ref', 'dmn'); // TODO - temp till affiliate program is ready
  }, []);

  useEffect(() => {
    document.title = `${NAME} - Pricing`;

    const ref = localStorage.getItem('ref'); 
    if (ref) handleSetCode(ref);
  }, [handleSetCode]);

  return (
    <PageStyle theme={theme}>
      <Box className="info-section background-primary" flexDirection="column" alignItems="center" style={{ paddingBottom: '12rem' }}>
        <h5 className="pretitle">Pricing</h5>
        <h1>Get Access</h1>
        <p style={{ maxWidth: '25rem', marginTop: '1.6rem' }}>Purchase life-time access to the most accurate trading indicator for just a one time payment.</p>
      </Box>

      <Box justifyContent="center">
        <Box className="purchase-box" flexDirection="column" justifyContent="center" alignItems="center">
          <div className="package-section">
            <h1>${currentPrice}
              {affiliateCode && <span style={{ display: 'inline', marginLeft: '1rem', fontSize: '1.4rem' }}><s style={{ color: theme.colors.text[8] }}>${PRICE}</s></span>}
            </h1>
            <p style={{ textAlign: 'center' }}>One Time Payment</p>
          </div>

          <Box style={{ width: '100%' }} justifyContent="center" alignItems="center">
            <Divider style={{ borderColor: theme.colors.text[3] }} fullWidth />
            <h5 style={{ margin: '0 1rem', color: '#000', textAlign: 'center', whiteSpace: 'nowrap' }}>{affiliateCode ? '80% OFF!' : `OR $${(PRICE * 0.2).toFixed(2)}`}</h5>
            <Divider style={{ borderColor: theme.colors.text[3] }} fullWidth />
          </Box>

          {affiliateCode ? (
            <p className="code-p">
              Code "{affiliateCode}"
              <Icon style={{ cursor: 'pointer', marginLeft: '0.2rem' }} icon={IconEnum.x} size={20} color={theme.colors.text[6]} onClick={() => {
                localStorage.removeItem('ref');
                setAffiliateCode(null);
                setCurrentPrice(PRICE + '');
              }} />
            </p>
          ) : (
            <Box className="package-section" spacing="0.2rem" style={{ maxHeight: '2.8rem', marginTop: '1rem' }} justifyContent="center" alignItems="center">
              <TextField placeholder="Enter referral code" value={textField} onChanged={setTextField} />
              <Button style={{ minHeight: '100%', padding: '0.2rem', margin: 0 }} onClick={() => handleSetCode(textField)}>
                <Icon icon={IconEnum.checkmark} size={24} />
              </Button>
            </Box>
          )}
          
          <div className="package-section">
            <div>
              <p>🟣 Buy &amp; Sell Signals</p>
              <p>🟣 2 Take Profit Signals</p>
              <p>🟣 Free Updates</p>
              <p>🟣 24/7 Support</p>
            </div>

            <Button block large glowing style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: 0 }} onClick={() => setShowCheckoutModal(true)}>Get Access</Button>
          </div>
        </Box>
      </Box>

      <Box className="info-section" flexDirection="column" alignItems="center" style={{ backgroundColor: theme.colors.background[1], paddingBottom: '6rem' }}>
        <h5 className="pretitle">Top Reviews</h5>
        <h1 className="section-header" style={{ marginBottom: '4rem' }}>See what our customers say</h1>

        <Box className="reviews" display="grid" spacing="2rem">
          <Review
            title="Good Indicator"
            description={`I was skeptical when buying ${NAME} because I've tried similar indicators that haven't worked but I was amazed after what I made with my first trade.`}
            avatar="https://i.imgur.com/qSHZSKw.png"
            name="Lxgan"
            subtitle="Options Trader"
          />

          <Review
            title="Best Choice I've Made"
            description={`Paid for itself already. I've been using it for a month now and i've never made so much money trading futures. Highly recommend it to anyone beginner, or advanced.`}
            avatar="https://i.imgur.com/OioRfhl.png"
            name="Cptp"
            subtitle="Futures Trader"
          />

          <Review
            title="Saved My Trading Account"
            description={`Before using ${NAME} I was constantly losing money and blowing up my account, it was so frustrating and I was about to give up. But once I started using ${NAME} I have been making consistent profits and I'm finally back on track.`}
            avatar="https://i.imgur.com/pCDVL6G.png"
            name="Luxy"
            subtitle="Forex Day Trader"
          />

          <Review
            title="Nice"
            description={`This tool offers way more features for a cheaper price from other indicators i've tried.. also the signals actually work and I was able to make back the cost of the algo within the first day of purchasing. I definitely recommend it.`}
            avatar="https://i.imgur.com/U9H3Be4.png"
            name="Pot_Rapid"
            subtitle="Stock Swing Trader"
          />
        </Box>

        <Box flexDirection="column">
          <h5 className="pretitle" style={{ marginTop: '6rem' }}>Write a Review</h5>
          <h1 className="section-header" style={{ marginBottom: '2rem' }}>Share your experience</h1>

          <Box justifyContent="center" display="grid">
            {submittingReivew ? (
              <Progress circular indeterminate />
            ) : (
              <>
                {reviewError !== '' && (
                  <Box flexDirection="column" justifyContent="center" alignItems="center">
                    <h1 style={{ color: theme.colors.danger[0], fontSize: '3rem' }}><Icon icon={IconEnum.error} size={36} color={theme.colors.danger[0]} /> Error</h1>
                    <p>{reviewError}</p>
                  </Box>
                )}
                <Box spacing="1rem">
                  <TextField placeholder="Your Name" fullWidth />
                  <TextField placeholder="Your Role" fullWidth />
                </Box>

                <div style={{ margin: '1rem 0' }}>
                  <label style={{ float: 'left' }}>Profile Picture</label>
                  <FileInput tooltipPosition="left" placeholder="Upload a photo" />
                </div>

                <TextField placeholder="Review Title" fullWidth />
                <TextArea placeholder="Your Review" fullWidth></TextArea>

                <Button block style={{ marginBottom: 0 }} onClick={() => {
                  setSubmittingReview(true);
                  setTimeout(() => {
                    setSubmittingReview(false);
                    setReviewError('You must purchase the indicator to write a review.');
                  }, 2000);
                }}>Submit Review</Button>
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Box className="info-section faq" alignItems="center" justifyContent='space-around' style={{ paddingBottom: '6rem' }}>
        <h1 className="section-header" style={{ textAlign: 'left' }}>Frequently Asked Questions</h1>

        <Box flexDirection="column" spacing="2rem">
          <FAQ title={`Does ${NAME} work for forex?`}>
            Yes, the algorithm works for all markets and all timeframes.
          </FAQ>

          <FAQ title="How do I setup the algorithm?">
            Its very simple to setup/use, please see the tutorial <a href="#/tutorial">here</a>.
          </FAQ>

          <FAQ title="Does it work for the free version of Tradingview?">
            Yes, {NAME} works perfectly with the free version of Tradingview.
          </FAQ>

          <FAQ title={`How can I contact the ${NAME} team?`}>
            We offer 24/7 support, just <a href="#/contact">send us a message</a>!
          </FAQ>
        </Box>
      </Box>


      <Modal open={showCheckoutModal} onClose={() => setShowCheckoutModal(false)} title={'Purchase ' + NAME}>
        <CheckoutForm
          price={Number(currentPrice)}
          onSuccessfulCheckout={(data, username, ref, id) => {
            addToQueue(EventType.PURCHASE, {
              ...data,
              user: user?._id,
              username,
              affiliateCode: ref,
              paymentId: id,
            });
            window.location.href = '#/success';
          }}
        />
      </Modal>
    </PageStyle>
  );
}

export default PricingPage;
