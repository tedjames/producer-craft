import React, { Component } from 'react';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 10px;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
`;

const LeftArrowIcon = styled.div`
  flex: 0 0 auto;
  position: absolute;
  left: 10px;
  top: 130px;
  z-index: 20;
  opacity: ${props => (props.showLeftArrow ? '0.35' : '0')};
`;

const RightArrowIcon = styled.div`
  flex: 0 0 auto;
  position: absolute;
  right: 10px;
  top: 130px;
  z-index: 20;
  opacity: 0.35;
`;

const ArrowScrolling = styled.div`
  position: relative;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleArrowRight = this.handleArrowRight.bind(this);
    this.handleArrowLeft = this.handleArrowLeft.bind(this);
    this.handleInstructorsScroll = this.handleInstructorsScroll.bind(this);

    this.state = {
      isTouchDevice: false,
      showLeftArrow: false,
    };
  }

  // eslint-disable-next-line consistent-return
  componentDidMount() {
    if ('ontouchstart' in document.documentElement) {
      // disable arrows if on touch screen device
      return this.setState({ isTouchDevice: true });
    }
    // handle horizontal draggable scroll on non-touch devices
    const slider = document.querySelector('.horizontal-scroll');
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener('mousedown', e => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      // eslint-disable-next-line prefer-destructuring
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  componentWillUnmount() {
    const slider = document.querySelector('.horizontal-scroll');
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.removeEventListener('mousedown', e => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      // eslint-disable-next-line prefer-destructuring
      scrollLeft = slider.scrollLeft;
    });
    slider.removeEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.removeEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.removeEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  handleArrowRight() {
    const slider = document.querySelector('.horizontal-scroll');
    slider.scrollBy(500, 0);
  }

  handleArrowLeft() {
    const slider = document.querySelector('.horizontal-scroll');
    slider.scrollBy(-500, 0);
  }

  handleInstructorsScroll(e) {
    const { isTouchDevice } = this.state;
    if (!isTouchDevice) {
      if (e.target.scrollLeft > 0) {
        return this.setState({ showLeftArrow: true });
      }
      return e.target.scrollLeft === 0 && this.setState({ showLeftArrow: false });
    }
    return null;
  }

  render() {
    const { children, style } = this.props;
    const { showLeftArrow, isTouchDevice } = this.state;

    return [
      <>
        {!isTouchDevice && (
          <ArrowScrolling>
            <LeftArrowIcon onClick={this.handleArrowLeft} showLeftArrow={showLeftArrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                className="feather feather-arrow-left"
              >
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </LeftArrowIcon>
            <RightArrowIcon onClick={this.handleArrowRight}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                className="feather feather-arrow-left"
              >
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </RightArrowIcon>
          </ArrowScrolling>
        )}
      </>,

      <ScrollContainer
        style={style}
        className="horizontal-scroll"
        onScroll={this.handleInstructorsScroll}
      >
        {children}
        <div style={{ width: 20, height: 40, flex: '0 0 auto' }} />
      </ScrollContainer>,
    ];
  }
}
