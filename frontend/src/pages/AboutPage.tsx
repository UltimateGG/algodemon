import React, { useContext } from 'react';
import styled from 'styled-components';
import { Box, Button, Divider, ThemeContext } from '../Jet';


const PageStyle = styled.div.attrs((props: any) => props)`
  .about-container {
    padding: 2.8rem 4rem;
  }

  #me {
    float: left;
  }

  #lake {
    display: block;
    width: 100%;
    margin-bottom: 0.8rem;
  }

  #mic {
    float: left;
    margin-right: 1rem;
  }

  .certificates {
    grid-template-columns: repeat(4, 1fr);
  }

  .certificate {
    width: 400px;
    max-height: auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    .certificates {
      grid-template-columns: repeat(2, 1fr);
    }

    .top-section {
      flex-direction: column;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    .about-container {
      padding: 2.4rem;
    }

    #education-container {
      flex-direction: column;
    }

    .certificates {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 500px) {
    #me, #mic {
      display: block;
      width: 100%;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    #me, #mic {
      float: none;
      margin-bottom: 0.8rem;
    }

    .certificates-header {
      font-size: 2rem;
    }
  }
`;

export const AboutPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <PageStyle theme={theme}>
      <Box className="about-container" style={{ paddingTop: '4rem' }} spacing="2rem">
        <Box spacing="1.2rem">

          <Box flexDirection="column" spacing="1rem">
            <div>
              <h1>About Me</h1>
              <Divider />
            </div>

            <Box className="top-section" spacing="2rem">
              <p>
                <img id="me" src="/img/me.jpg" alt="Me" width="300px" style={{ borderRadius: theme.rounded, marginRight: '1rem' }} />
                Hello, I am Blake Fitzsimmons. I am 18 years old and my birthday is in July. Ever since I was a kid I have always been fascinated with technology. I always had a desire and passion to learn all I could about it. I got my first computer when I was very young and was able to start exploring software. I started first coding around 12-13 years old, in Java for a month or so. I took break for a few years and in 2019, when I was 15, I really got into coding. I am mainly self-taught and spent a lot of my time watching YouTube videos or buying courses. I made my first app in JavaScript and was even able to sell it to customers and made a lot of profit for what it was. I would rush to get my school work done, just so I could code more. It was very fun and that is where my journey began.
                
                <br /><br />I knew by 16 that I 100% wanted to have a career in technology. As I did more projects, I realized I specifically love web development. I started more and more projects, just for fun. I knew that it was my passion. I would make apps or websites for myself or my friends. I started to branch out into other coding languages and saw that the principals are the same.
              </p>

              <p>
                <img id="lake" src="/img/lake.jpg" alt="Me" width="300px" style={{ borderRadius: theme.rounded }} />
                I am generally a very outgoing and dependable person. I love animals, hanging out with my friends, spending time on the lake, and coding for fun. I live on a lake and it is awesome. I love the summer time and hot days.
              </p>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="about-container" id="education-container" spacing="1.2rem" style={{ backgroundColor: theme.colors.background[1] }}>
        <Box flexDirection="column" spacing="1rem">
          <h1>Education</h1>

          <div>
            <h4>MIC Program</h4>
            <p><img id="mic" src="/img/mic.jpg" alt="Me" width="300px" style={{ borderRadius: theme.rounded }} /> I am currently a student at Lee's Summit North high school. I am taking college classes that count as dual-credit for high school graduation. The MIC program (Missouri Innovation Campus) is a fast track, high intensity program for select students to earn a bachelors degree just two years after high school. I am majoring in <strong>software development</strong>.
            
            <br /><br />I attended Summit Technology Academy for Software Development I &amp; II. Summit Technology Academy has been recognized as one of the nation's leading schools for technology.</p>

            <br /><br />I earned the CompTIA IT Fundamentals+ Certification while in high school.
          </div>

          <div>
            <h4>Degree Track</h4>
            <p><strong>Bachelor of Science in Computer Science</strong><br />Spring 2025 | Metropolitan Community College</p>
            <br />
            <p><strong>Associates in Computer Science &amp; Information Systems</strong><br />Spring 2023 | Metropolitan Community College</p>
            <br />
            <p><strong>High School Diploma</strong><br />Spring 2023 | Lee's Summit North <small>3.8 GPA</small></p>
          </div>
        </Box>

        <img src="/img/cert/itf.png" alt="CompTIA ITF+ Certified" width="300px" style={{ maxHeight: '300px' }} />
      </Box>

      <Box className="about-container" spacing="1.2rem" flexDirection="column" justifyContent="center" alignItems="center">
        <h1 className="certificates-header">Udemy Courses</h1>
        <Box className="certificates" display="grid" spacing="1.2rem" justifyContent="center" alignItems="center">
          <a href="/img/cert/20projectsCourse.jpg" target="_blank" rel="noopener noreferrer">
            <img className="certificate" src="/img/cert/20projectsCourse.jpg" alt="20 Web Projects Certificate" />
          </a>
          <a href="/img/cert/htmlCssCourse.jpg" target="_blank" rel="noopener noreferrer">
            <img className="certificate" src="/img/cert/htmlCssCourse.jpg" alt="HTML / CSS Course Certificate" />
          </a>
          <a href="/img/cert/reactCourse.jpg" target="_blank" rel="noopener noreferrer">
            <img className="certificate" src="/img/cert/reactCourse.jpg" alt="React Course Certificate" />
          </a>
          <a href="/img/cert/reactMERNcourse.jpg" target="_blank" rel="noopener noreferrer">
            <img className="certificate" src="/img/cert/reactMERNcourse.jpg" alt="React MERN Stack Course Certificate" />
          </a>
        </Box>
      </Box>

      <Box className="about-container" spacing="1.2rem" flexDirection="column" justifyContent="center" alignItems="center" style={{ backgroundColor: theme.colors.primary[0] }}>
        <div>
          <h1 style={{ textAlign: 'center' }}>Resume</h1>
          <p style={{ textAlign: 'center' }}>View or download my official resume in PDF format</p>
        </div>

        <Button onClick={() => window.location.href = '/resume'} block style={{ marginTop: '2rem', maxWidth: '18rem', backgroundColor: theme.colors.primary[2] }}>See Resume</Button>
      </Box>
    </PageStyle>
  );
}

export default AboutPage;
