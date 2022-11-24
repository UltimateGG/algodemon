import React, { useContext } from 'react';
import { Box, ThemeContext } from '../Jet';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Review from './Review';
import { NAME } from '../globals';


export const ReviewsCarousel = ({ backgroundColor, primaryBackgroundColor } : { backgroundColor?: number, primaryBackgroundColor?: number }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box className="container" flexDirection="column" style={{ padding: '2rem 1.4rem', overflowX: 'hidden', backgroundColor: theme.colors.background[primaryBackgroundColor || 0] }} spacing="1.6rem">
      <Box flexDirection="column" justifyContent="center" alignItems="center">
        <h1 className="reasons-text">What <span className="text-primary" style={{ fontWeight: 500 }}>traders</span> are saying</h1>
        <p style={{ marginBottom: '2rem' }}>See what other traders are saying about {NAME}.</p>
      </Box>

      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        infiniteLoop
        autoPlay
        interval={5000}
        transitionTime={500}
        stopOnHover
        emulateTouch
        swipeable
        useKeyboardArrows
      >
        <Box style={{ width: '100%' }} justifyContent="center">
          <Review
            title="Changed My Life"
            description={`I used to work at Walmart and I was making $10 an hour, I was so depressed and I didn't know what to do. I was about to quit my job and go back to school but then I found ${NAME} and I was able to make $10,000 in my first month of trading. I'm now able to pay off my student loans and I'm able to live a comfortable life. Thank you so much for this indicator.`}
            avatar="https://i.imgur.com/YPtexXS.png"
            name="! Jacob"
            subtitle="Options Trader"
            backgroundColor={backgroundColor}
          />
        </Box>

        <Box style={{ width: '100%' }} justifyContent="center">
          <Review
            title="Good Indicator"
            description={`I was skeptical when buying ${NAME} because I've tried similar indicators that haven't worked but I was amazed after what I made with my first trade.`}
            avatar="https://i.imgur.com/qSHZSKw.png"
            name="Lxgan"
            subtitle="Options Trader"
            backgroundColor={backgroundColor}
          />
        </Box>

        <Box style={{ width: '100%' }} justifyContent="center">
          <Review
            title="Best Choice I've Made"
            description={`Paid for itself already. I've been using it for a month now and i've never made so much money trading futures. Highly recommend it to anyone beginner, or advanced.`}
            avatar="https://i.imgur.com/OioRfhl.png"
            name="Cptp"
            subtitle="Futures Trader"
            backgroundColor={backgroundColor}
          />
        </Box>

        <Box style={{ width: '100%' }} justifyContent="center">
          <Review
            title="Saved My Trading Account"
            description={`Before using ${NAME} I was constantly losing money and blowing up my account, it was so frustrating and I was about to give up. But once I started using ${NAME} I have been making consistent profits and I'm finally back on track.`}
            avatar="https://i.imgur.com/pCDVL6G.png"
            name="Luxy"
            subtitle="Forex Day Trader"
            backgroundColor={backgroundColor}
          />
        </Box>

        <Box style={{ width: '100%' }} justifyContent="center">
          <Review
            title="Nice"
            description={`This tool offers way more features for a cheaper price from other indicators i've tried.. also the signals actually work and I was able to make back the cost of the algo within the first day of purchasing. I definitely recommend it.`}
            avatar="https://i.imgur.com/U9H3Be4.png"
            name="Pot_Rapid"
            subtitle="Stock Swing Trader"
            backgroundColor={backgroundColor}
          />
        </Box>
      </Carousel>
    </Box>
  );
}

export default Review;
