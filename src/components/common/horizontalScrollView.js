// BUG: Arrow scrolling does not work for multiple instances of this component
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
  &::-webkit-scrollbar-track {
    display: none;
  }
  scrollbar-color: transparent;
  z-index: 180;
`;

const LeftArrowIcon = styled.div`
  flex: 0 0 auto;
  position: absolute;
  left: 10px;
  top: 130px;
  z-index: 200;
  opacity: ${props => (props.showLeftArrow ? '0.2' : '0')};
  transition: opacity 300ms ease;
`;

const RightArrowIcon = styled.div`
  flex: 0 0 auto;
  position: absolute;
  right: 10px;
  top: 130px;
  z-index: 200;
  opacity: ${props => (props.showRightArrow ? '0.2' : '0')};
  transition: opacity 300ms ease;
`;

const ArrowScrolling = styled.div`
  position: relative;
  z-index: 190;
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
      showRightArrow: true,
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
    console.log('Handling arrow right', slider);
  }

  handleArrowLeft() {
    const slider = document.querySelector('.horizontal-scroll');
    slider.scrollBy(-500, 0);
    console.log('Handling arrow left', slider);
  }

  handleInstructorsScroll(e) {
    const { isTouchDevice } = this.state;

    if (!isTouchDevice) {
      if (e.target.scrollLeft > 0) {
        this.setState({ showLeftArrow: true });
      } else {
        this.setState({ showLeftArrow: false });
      }
      if (e.target.scrollLeft > e.target.scrollWidth - 500) {
        this.setState({ showRightArrow: false });
      } else {
        this.setState({ showRightArrow: true });
      }
    }
    return null;
  }

  render() {
    const { children, style, arrowColor } = this.props;
    const { showLeftArrow, isTouchDevice, showRightArrow } = this.state;

    return (
      <div key="horizonatal-scrollview-container">
        {!isTouchDevice && (
          <ArrowScrolling key="arrow-scrolling">
            <LeftArrowIcon showLeftArrow={showLeftArrow}>
              <svg
                onClick={this.handleArrowLeft}
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke={arrowColor || '#fff'}
                strokeWidth="1.5"
                className="feather feather-arrow-left"
              >
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </LeftArrowIcon>
            <RightArrowIcon showRightArrow={showRightArrow}>
              <svg
                onClick={this.handleArrowRight}
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke={arrowColor || '#fff'}
                strokeWidth="1.5"
                className="feather feather-arrow-left"
              >
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </RightArrowIcon>
          </ArrowScrolling>
        )}

        <ScrollContainer
          style={style}
          className="horizontal-scroll"
          onScroll={this.handleInstructorsScroll}
          key="scroll-container"
        >
          {children}
          <div style={{ width: 20, height: 40, flex: '0 0 auto' }} />
        </ScrollContainer>
      </div>
    );
  }
}
