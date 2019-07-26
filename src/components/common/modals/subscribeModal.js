/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import FlatButton from '../flatButton';
import ButtonText from '../buttonText';

import { toggleSubscribeModal } from '../../../actions';
import { MusicIcon, ShareIcon, SubscribeIcon } from '..';

const DialogTitle = styled.p`
  font-family: proxima-nova, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #888;
  letter-spacing: 4.2px;
  text-transform: uppercase;
  cursor: default;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 10px;
`;

const SignUpText = styled.p`
  font-family: roboto-condensed, sans-serif;
  color: #222;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 15px;
  cursor: default;
`;

const SignUpButton = styled.a`
  text-decoration: underline;
  text-decoration-color: #bebebe;
  color: #555;
  cursor: pointer;
  :hover,
  :active {
    opacity: 0.65;
  }
`;

const DialogTextButton = styled.a`
  font-family: roboto-condensed, sans-serif;
  font-size: 12px;
  text-align: center;
  color: #888;
  text-decoration: underline;
  text-decoration-color: #bebebe;
  margin-top: 5px;
  cursor: pointer;
  :hover,
  :active {
    opacity: 0.65;
  }
`;

const DialogText = styled.p`
  font-family: roboto-condensed, sans-serif;
  font-size: 12px;
  text-align: center;
  color: #888;
  text-decoration: underline;
  text-decoration-color: #bebebe;
  margin-top: 5px;
  cursor: default;
`;

const TextButton = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #aaa;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
  :hover {
    opacity: 0.9;
  }
  :active {
    opacity: 0.75;
  }
`;

const Description = styled.p`
  font-family: roboto-condensed, sans-serif;
  font-size: 17px;
  color: '#111';
  padding-top: 0px;
  margin-left: 3px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const ValuePropSection = styled.div``;

const DialogActionsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 12.5px;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 0px;
  @media (max-width: 800px) {
    justify-content: center;
    flex-direction: column-reverse;
  }
`;

class SubscriberModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('HANDLING SUBMIT');
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { open, toggleSubscribeModal, productId, error } = this.props;
    return (
      <Dialog
        open={open}
        onClose={() => toggleSubscribeModal(false)}
        aria-labelledby="form-dialog-title"
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        id="subscriberModal"
      >
        <DialogTitle
          style={{
            marginBottom: 0,
            paddingBottom: 0,
            color: '#aaa',
            display: 'flex',
            justifyContent: 'space-between',
            marginRight: 30,
          }}
        >
          <span style={{ display: 'flex', marginLeft: 27.5, alignItems: 'center' }}>
            <SubscribeIcon size={17} style={{ marginRight: 10, position: 'relative', top: 1 }} />
            Most Popular
          </span>
          <span>
            <svg
              onClick={() => toggleSubscribeModal(false)}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
              style={{ position: 'relative', top: 5 }}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </span>
        </DialogTitle>
        <DialogTitle
          style={{
            marginTop: 0,
            marginBottom: 5,
            paddingBottom: 0,
            paddingTop: 10,
            fontSize: 17,
            color: '#555',
            textAlign: 'left',
            marginLeft: 27.5,
            marginRight: 27.5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span>All-Access Pass</span>
          <span style={{ fontSize: 14, color: '#aaa', marginTop: 10 }}>$120 / year</span>
        </DialogTitle>
        <DialogContent style={{ paddingTop: 0 }}>
          {/* <form>
            <TextField
              style={{ marginBottom: 12.5 }}
              margin="dense"
              id="emailAddress"
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              margin="dense"
              id="password"
              label="Password"
              placeholder="********"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogText
              style={{ textDecoration: 'none', fontSize: 10, marginTop: 10, color: 'red' }}
            >
              {error}
            </DialogText>
          </form> */}
          <Description>
            Feel free to purchase our classes individually or consider subscribing for access to all
            of our content, samples and exclusive perks.
          </Description>
          <ValuePropSection>
            <ValuePropCard
              title="Unlimited Classes"
              description="Access all of our current and future courses"
              icon={<SubscribeIcon />}
            />
            <ValuePropCard
              title="Sample Packs"
              description="Download all sample packs made by our producers"
              icon={<MusicIcon />}
            />
            <ValuePropCard
              title="Exclusive Perks"
              description="Participate in exclusive events, contests and challenges"
              icon={<ShareIcon />}
            />
          </ValuePropSection>
        </DialogContent>
        <DialogActions>
          {productId ? (
            <DialogActionsContainer>
              <TextButton>PURCHASE SINGLE COURSE</TextButton>
              <FlatButton onClick={this.handleSubmit} style={{ width: 240, marginTop: 7.5 }}>
                <ButtonText>GET ALL-ACCESS</ButtonText>
              </FlatButton>
            </DialogActionsContainer>
          ) : (
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FlatButton
                onClick={this.handleSubmit}
                style={{ width: 240, marginTop: 7.5, alignSelf: 'flex-start', marginBottom: 10 }}
              >
                <ButtonText>GET ALL-ACCESS</ButtonText>
              </FlatButton>
            </div>
          )}

          {/* <DialogText
            style={{ textDecoration: 'none', fontSize: 10, marginTop: 0, color: '#bebebe' }}
          >
            By purchasing a subscription, you agree to our{' '}
            <DialogTextButton style={{ fontSize: 10, color: '#bebebe' }}>
              Privacy Policy
            </DialogTextButton>{' '}
            and{' '}
            <DialogTextButton style={{ fontSize: 10, color: '#bebebe' }}>
              Terms of Service
            </DialogTextButton>
            .
          </DialogText> */}
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth, view }) => ({
  open: view.showSubscribeModal,
  error: auth.error,
  loading: view.loading,
  userDetails: auth.userDetails,
  user: auth.user,
});

export default connect(
  mapStateToProps,
  {
    toggleSubscribeModal,
  },
)(SubscriberModal);

// VALUE PROP COMPONENTS

const Card = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: 20x;
  margin-right: 20px;
  padding-bottom: 15px;
  padding-left: 5px;
  padding-right: 25px;
  @media (max-width: 520px) {
    padding-right: 0px;
    padding-left: 0px;
    padding-bottom: 0px;
    margin-left: 2px;
    margin-right: 0px;
    margin-bottom: 0px;
  }
`;

const ValueTitle = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 900;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.3);
  cursor: default;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 9px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const ValueDescription = styled.p`
  font-family: roboto-condensed, sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: #111;
  margin-top: 0px;
  margin-bottom: 0px;
  cursor: default;
  line-height: 18px;
  @media (max-width: 480px) {
    font-size: 13px;
    margin-top: 0px;
  }
`;

const ValuePropCard = ({ icon, style, title, description }) => {
  return (
    <Card style={style}>
      {icon && icon}
      <div style={{ marginLeft: 17.5 }}>
        <ValueTitle className="disable-selection">{title}</ValueTitle>
        <ValueDescription className="disable-selection">{description}</ValueDescription>
      </div>
    </Card>
  );
};
