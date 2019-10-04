import React, { useState } from 'react';
import { functions } from 'firebase';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import Spinner from 'react-spinkit';

import Logo from './logo';
import { emailChanged, toggleAccountModal } from '../../actions';
import FlatButton from './flatButton';
import ButtonText from './buttonText';

const NewsletterTextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: '#ccc',
    },
    '& .MuiFormLabel-root': {
      color: '#555',
    },
    '& label.Mui-focused': {
      color: '#777',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#222',
      },
      '&:hover fieldset': {
        borderColor: '#222',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#555',
      },
    },
  },
})(TextField);

const Container = styled.div`
  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 60px;
  padding-right: 60px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.925);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23423060' fill-opacity='0.1'%3E%3Cpath opacity='.35' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  @media (max-width: 1260px) {
    flex-direction: column;
  }
  @media (min-width: 1200px) {
    padding-left: 80px;
    padding-right: 80px;
  }
`;

const FooterMenu = styled.div`
  margin-right: 100px;
  display: flex;
  flex-direction: column;
`;
const FooterMenuTitle = styled.p`
  font-family: proxima-nova, sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #888;
  opacity: 0.65;
  letter-spacing: 4.2px;
  text-transform: uppercase;
  cursor: default;
  padding-top: 0px;
  padding-bottom: 10px;
  margin-top: 3px;
  @media (max-width: 1400px) {
    margin-top: 40px;
    padding-bottom: 0px;
  }
`;
const FooterMenuItem = styled.a`
  font-family: proxima-nova, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #eee;
  opacity: 0.65;
  letter-spacing: 4.2px;
  text-transform: uppercase;
  text-decoration: none;
  cursor: default;
  padding-top: 30px;
  padding-bottom: 5px;
  :hover,
  :active {
    opacity: 0.3;
  }
  cursor: pointer;
  max-width: 260px;
`;

const FooterText = styled.a`
  font-family: roboto-condensed, sans-serif;
  font-size: 12px;
  color: #777;
  margin-top: 5px;
  cursor: default;
`;

const FooterTextButton = styled.a`
  font-family: roboto-condensed, sans-serif;
  font-size: 12px;
  text-decoration: underline;
  text-decoration-color: #bebebe;
  text-align: center;
  color: #888;
  margin-top: 5px;
  cursor: pointer;
  :hover,
  :active {
    opacity: 0.65;
  }
`;

const FooterLogo = styled(Logo)`
  font-family: proxima-nova;
  font-weight: 900;
  font-style: black;
  font-size: 16px;
  color: #bebebe;
  letter-spacing: 5px;
  margin-top: 0px;
  margin-bottom: 0px;
  opacity: 0.45;
  cursor: default;
  text-transform: uppercase;
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    font-size: 14px;
  }
  @media (max-width: 600px) {
    max-width: 200px;
  }
  @media (max-width: 1400px) {
    display: none;
  }
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
`;

const SocialIconButton = styled.div`
  margin-right: 20px;
  margin-top: 20px;
  cursor: pointer;
  :hover {
    opacity: 0.65;
  }
  :active {
    opacity: 0.4;
  }
`;

const CopyrightText = styled.p`
  font-family: proxima-nova, sans-serif;
  font-size: 9px;
  font-weight: 600;
  color: #888;
  opacity: 0.9;
  letter-spacing: 4.2px;
  text-transform: uppercase;
  cursor: default;
  padding-top: 0px;
  margin-top: 0px;
`;

// eslint-disable-next-line no-shadow
const Footer = ({ emailChanged, email, user, toggleAccountModal }) => {
  const [loading, toggleLoading] = useState(false);
  const verifyEmail = e => {
    // uses regex to verify an email is valid
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };
  const handleSaveEmail = async () => {
    toggleLoading(true);
    const saveAnonymousUser = functions().httpsCallable('saveAnonymousUser');
    const emailValid = verifyEmail(email);
    if (emailValid) {
      try {
        await saveAnonymousUser({ email });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Success',
          text: 'We have added you to our newsletter. Thanks for joining!',
          type: 'success',
          confirmButtonText: 'Okay',
        });
        toggleLoading(false);
      } catch {
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Error',
          text: 'Unable to save your email at this time. Please try again later.',
          type: 'error',
          confirmButtonText: 'Okay',
        });
        toggleLoading(false);
      }
    } else {
      Swal.fire({
        customClass: {
          container: 'my-swal',
        },
        title: 'Error',
        text: 'Please enter a valid email',
        type: 'error',
        confirmButtonText: 'Okay',
      });
      toggleLoading(false);
    }
  };
  return (
    <Container id="footer">
      <FooterMenu>
        <FooterLogo />
      </FooterMenu>

      <FooterMenu>
        <FooterMenuTitle className="disable-selection">Menu</FooterMenuTitle>
        <FooterMenuItem
          onClick={() => browserHistory.push('/#home-hero')}
          className="disable-selection"
        >
          Home
        </FooterMenuItem>
        <FooterMenuItem
          onClick={() => browserHistory.push('/#my-classes')}
          className="disable-selection"
        >
          Classes
        </FooterMenuItem>
        <FooterMenuItem onClick={() => toggleAccountModal(true)} className="disable-selection">
          My Account
        </FooterMenuItem>
        <FooterMenuItem className="disable-selection">Support</FooterMenuItem>
      </FooterMenu>
      <FooterMenu>
        <FooterMenuTitle className="disable-selection">Learn More</FooterMenuTitle>
        <FooterMenuItem className="disable-selection">About Us</FooterMenuItem>
        <FooterMenuItem className="disable-selection">Subscriber Benefits </FooterMenuItem>
        <FooterMenuItem
          href="https://app.termly.io/document/terms-of-use-for-online-marketplace/a5bf5998-bb3c-4248-9b78-3b1bc389136f"
          target="_blank"
          className="disable-selection"
        >
          Privacy Policy
        </FooterMenuItem>
        <FooterMenuItem
          href="https://app.termly.io/document/terms-of-use-for-online-marketplace/a5bf5998-bb3c-4248-9b78-3b1bc389136f"
          target="_blank"
          className="disable-selection"
        >
          Terms of Use
        </FooterMenuItem>
        <FooterMenuItem className="disable-selection">Blog</FooterMenuItem>
      </FooterMenu>
      <FooterMenu style={{ marginRight: 0 }}>
        {!user ? (
          <>
            <FooterMenuTitle className="disable-selection">Newsletter</FooterMenuTitle>
            <NewsletterTextField
              onChange={e => emailChanged(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSaveEmail()}
              value={email}
              style={{ marginTop: 20 }}
              margin="dense"
              id="newsletterAddress"
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FooterText className="disable-selection">
              By giving us your email, you agree to our{' '}
              <FooterTextButton
                href="https://app.termly.io/document/terms-of-use-for-online-marketplace/a5bf5998-bb3c-4248-9b78-3b1bc389136f"
                target="_blank"
                className="disable-selection"
              >
                Terms of Service
              </FooterTextButton>{' '}
              and{' '}
              <FooterTextButton
                href="https://app.termly.io/document/terms-of-use-for-online-marketplace/a5bf5998-bb3c-4248-9b78-3b1bc389136f"
                target="_blank"
                className="disable-selection"
              >
                Privacy Policy
              </FooterTextButton>
            </FooterText>
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Spinner
                  style={{ transform: 'scale(0.5)', opacity: 0.65 }}
                  name="line-scale"
                  color="white"
                  fadeIn="quarter"
                />
                <FooterText
                  style={{ textDecoration: 'none', fontSize: 16, marginTop: 0, color: '#aaa' }}
                >
                  Loading...
                </FooterText>
              </div>
            ) : (
              <FlatButton
                onClick={handleSaveEmail}
                style={{ background: 'rgba(238,238,238,0.1)', marginTop: 20 }}
              >
                <ButtonText style={{ color: '#eee' }}>Submit</ButtonText>
              </FlatButton>
            )}
          </>
        ) : (
          <div style={{ height: 20, width: '100%' }} />
        )}

        <FooterRow>
          <SocialIconButton>
            <svg
              enableBackground="new 0 0 56.693 56.693"
              height="24"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 56.693 56.693"
              width="24"
              fill="#49a1eb"
              fillOpacity="0.8"
            >
              <path d="M52.837,15.065c-1.811,0.805-3.76,1.348-5.805,1.591c2.088-1.25,3.689-3.23,4.444-5.592c-1.953,1.159-4.115,2-6.418,2.454  c-1.843-1.964-4.47-3.192-7.377-3.192c-5.581,0-10.106,4.525-10.106,10.107c0,0.791,0.089,1.562,0.262,2.303  c-8.4-0.422-15.848-4.445-20.833-10.56c-0.87,1.492-1.368,3.228-1.368,5.082c0,3.506,1.784,6.6,4.496,8.412  c-1.656-0.053-3.215-0.508-4.578-1.265c-0.001,0.042-0.001,0.085-0.001,0.128c0,4.896,3.484,8.98,8.108,9.91  c-0.848,0.23-1.741,0.354-2.663,0.354c-0.652,0-1.285-0.063-1.902-0.182c1.287,4.015,5.019,6.938,9.441,7.019  c-3.459,2.711-7.816,4.327-12.552,4.327c-0.815,0-1.62-0.048-2.411-0.142c4.474,2.869,9.786,4.541,15.493,4.541  c18.591,0,28.756-15.4,28.756-28.756c0-0.438-0.009-0.875-0.028-1.309C49.769,18.873,51.483,17.092,52.837,15.065z" />
            </svg>
          </SocialIconButton>
          <SocialIconButton>
            <svg
              enableBackground="new 0 0 32 32"
              height="24px"
              id="Layer_1"
              viewBox="0 0 32 32"
              width="24px"
              fillOpacity="0.75"
            >
              <g>
                <path
                  d="M31.67,9.179c0,0-0.312-2.353-1.271-3.389c-1.217-1.358-2.58-1.366-3.205-1.443C22.717,4,16.002,4,16.002,4   h-0.015c0,0-6.715,0-11.191,0.347C4.171,4.424,2.809,4.432,1.591,5.79C0.633,6.826,0.32,9.179,0.32,9.179S0,11.94,0,14.701v2.588   c0,2.763,0.32,5.523,0.32,5.523s0.312,2.352,1.271,3.386c1.218,1.358,2.815,1.317,3.527,1.459C7.677,27.919,15.995,28,15.995,28   s6.722-0.012,11.199-0.355c0.625-0.08,1.988-0.088,3.205-1.446c0.958-1.034,1.271-3.386,1.271-3.386s0.32-2.761,0.32-5.523v-2.588   C31.99,11.94,31.67,9.179,31.67,9.179z"
                  fill="#E02F2F"
                />
                <polygon fill="#FFFFFF" points="12,10 12,22 22,16  " />
              </g>
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </SocialIconButton>
          <SocialIconButton>
            <svg
              height="26px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 67 67"
              width="26px"
              fill="#3f5996"
              fillOpacity="0.85"
            >
              <path d="M29.765,50.32h6.744V33.998h4.499l0.596-5.624h-5.095  l0.007-2.816c0-1.466,0.14-2.253,2.244-2.253h2.812V17.68h-4.5c-5.405,0-7.307,2.729-7.307,7.317v3.377h-3.369v5.625h3.369V50.32z   M34,64C17.432,64,4,50.568,4,34C4,17.431,17.432,4,34,4s30,13.431,30,30C64,50.568,50.568,64,34,64z" />
            </svg>
          </SocialIconButton>
          <SocialIconButton>
            <svg height="20" viewBox="0 0 32 32" width="20" xmlSpace="preserve" fillOpacity="0.75">
              <g>
                <g id="Instagram_1_">
                  <g id="Instagram">
                    <path
                      d="M28,0H4C1.8,0,0,1.8,0,4v8h32V4C32,1.8,30.2,0,28,0z"
                      id="Head"
                      fill="#895A4D"
                    />
                    <path
                      d="M2,0.6V12h2V0C3.3,0,2.6,0.2,2,0.6z"
                      id="Red_x5F_Stripes"
                      fill="#FF3939"
                    />
                    <rect height="12" id="Yellow_x5F_Stripes" fill="#FED049" width="2" x="4" />
                    <rect height="12" id="Green_x5F_Stripes" fill="#10DD76" width="2" x="6" />
                    <rect height="12" id="Blue_x5F_Stripes" fill="#5FCCFF" width="2" x="8" />
                    <circle cx="26" cy="6" id="Lens_1_" r="3" fill="#162838" />
                    <circle cx="26" cy="6" id="Lens_x5F_Outer" r="1.5" fill="#2C4356" />
                    <circle cx="26" cy="6" id="Lens_x5F_Inside" r="0.5" fill="#47637A" />
                    <path
                      d="M0,12v16c0,2.2,1.8,4,4,4h24c2.2,0,4-1.8,4-4V12H0z"
                      id="Body"
                      fill="#E5E0DC"
                    />
                    <g id="Shadow">
                      <polygon points="24.7,12 22.4,9.6 22.4,12 " fill="#75483D" />
                      <path
                        d="M20,12L9.6,22.4l9.6,9.6H28c2.2,0,4-1.8,4-4v-8.7L24.7,12H20z"
                        fill="#D0CBC5"
                        fillOpacity="0.1"
                      />
                    </g>
                    <circle cx="16" cy="16" id="Lens" r="9" fill="#DCD7D3" fillOpacity="0.2" />
                    <circle cx="16" cy="16" id="Inside_x5F_Lens" r="7" fill="#162838" />
                    <circle cx="16" cy="16" id="_x32_nd_Inner_Circle" r="4" fill="#2C4356" />
                    <circle cx="16" cy="16" id="Middle_Circle" r="2" fill="#162838" />
                    <circle cx="18.5" cy="13.5" id="Reflection" r="1.5" fill="#47637A" />
                  </g>
                </g>
              </g>
            </svg>
          </SocialIconButton>
        </FooterRow>
        <FooterRow>
          <div style={{ marginTop: 20 }}>
            <CopyrightText className="disable-selection">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeOpacity="0.65"
                  stroke="#333"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-lock"
                  style={{ marginRight: 10, position: 'relative', top: 2 }}
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              Secured with SSL
            </CopyrightText>
            <CopyrightText className="disable-selection">
              Copyright © 2019 Producer Craft
            </CopyrightText>
          </div>
        </FooterRow>
      </FooterMenu>
    </Container>
  );
};

const mapStateToProps = ({ auth }) => ({
  email: auth.email,
  user: auth.user,
});

export default connect(
  mapStateToProps,
  { emailChanged, toggleAccountModal },
)(Footer);
