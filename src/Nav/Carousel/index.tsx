import React, { Component, ReactHTMLElement } from "react";
import styled from "@emotion/styled";
import KeyboardEventHandler from "react-keyboard-event-handler";
import classnames from "classnames";
import Slide from "../Slide/index";
import PropTypes from "prop-types";
import { NAV_DIRECTIONS, RIGHT, LEFT } from "../../utils/consts";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const NavigationButtons = styled.div`
  position: relative;
  display: flex;
  height: 40px;
  margin: 0 auto;
  width: 20%;
  margin-top: 1rem;
  justify-content: space-between;

  p {
    display: none;
  }

  img {
    height: 100%;
  }
`;

const DEFAULT_GO_TO_SLIDE_DELAY = 200;

interface IState {
  index: number;
  goToSlide: number | null;
  prevPropsGoToSlide: number;
  newSlide: boolean;
}

type Slide = {
  key: number;
  content: ReactHTMLElement<HTMLElement>;
  image: string;
  onClick: () => void;
};

interface IProps {
  slides: Slide[];
  goToSlide?: number;
  showNavigation: boolean;
  offsetRadius: number;
  animationConfig: object;
  goToSlideDelay: number;
}

function mod(a: number, b: number): number {
  return ((a % b) + b) % b;
}

class Carousel extends Component<IProps, IState> {
  state: IState = {
    index: 0,
    goToSlide: null,
    prevPropsGoToSlide: 0,
    newSlide: false
  };

  goToIn?: number;

  static propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any,
        content: PropTypes.object
      })
    ).isRequired,
    goToSlide: PropTypes.number,
    showNavigation: PropTypes.bool,
    offsetRadius: PropTypes.number,
    animationConfig: PropTypes.object,
    goToSlideDelay: PropTypes.number
  };

  static defaultProps = {
    offsetRadius: 2,
    animationConfig: { tension: 120, friction: 14 },
    goToSlideDelay: DEFAULT_GO_TO_SLIDE_DELAY
  };

  static getDerivedStateFromProps(props: IProps, state: IState) {
    const { goToSlide } = props;

    if (goToSlide !== state.prevPropsGoToSlide) {
      return { prevPropsGoToSlide: goToSlide, goToSlide, newSlide: true };
    }

    return null;
  }

  componentDidUpdate() {
    const { goToSlideDelay } = this.props;
    const { index, goToSlide, newSlide } = this.state;
    if (typeof goToSlide === "number") {
      if (newSlide) {
        this.handleGoToSlide();
      } else if (index !== goToSlide && typeof window !== "undefined") {
        window.clearTimeout(this.goToIn);
        this.goToIn = window.setTimeout(this.handleGoToSlide, goToSlideDelay);
      } else if (typeof window !== "undefined") {
        window.clearTimeout(this.goToIn);
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.clearTimeout(this.goToIn);
    }
  }

  modBySlidesLength = (index: number): number => {
    return mod(index, this.props.slides.length);
  };

  moveSlide = (direction: -1 | 1) => {
    this.setState({
      index: this.modBySlidesLength(this.state.index + direction),
      goToSlide: null
    });
  };

  getShortestDirection(from: number, to: number): -1 | 0 | 1 {
    if (from > to) {
      if (from - to > this.props.slides.length - 1 - from + to) {
        return 1;
      } else return -1;
    } else if (to > from) {
      if (to - from > from + this.props.slides.length - 1 - to) {
        return -1;
      } else return 1;
    }
    return 0;
  }

  handleGoToSlide = () => {
    if (typeof this.state.goToSlide !== "number") {
      return;
    }

    const { index } = this.state;

    const goToSlide = mod(this.state.goToSlide, this.props.slides.length);

    if (goToSlide !== index) {
      let direction = this.getShortestDirection(index, goToSlide);
      const isFinished =
        this.modBySlidesLength(index + direction) === goToSlide;

      this.setState({
        index: this.modBySlidesLength(index + direction),
        newSlide: isFinished,
        goToSlide: isFinished ? null : goToSlide
      });
    }
  };

  clampOffsetRadius(offsetRadius: number): number {
    const { slides } = this.props;
    const upperBound = Math.floor((slides.length - 1) / 2);

    if (offsetRadius < 0) {
      return 0;
    }
    if (offsetRadius > upperBound) {
      return upperBound;
    }

    return offsetRadius;
  }

  getPresentableSlides(): Slide[] {
    const { slides } = this.props;
    const { index } = this.state;
    let { offsetRadius } = this.props;
    offsetRadius = this.clampOffsetRadius(offsetRadius);
    const presentableSlides: Slide[] = new Array();

    for (let i = -offsetRadius; i < 1 + offsetRadius; i++) {
      presentableSlides.push(slides[this.modBySlidesLength(index + i)]);
    }

    return presentableSlides;
  }

  handleArrowNavigation(direction: string): void {
    if (direction === RIGHT.toLowerCase()) {
      this.moveSlide(1);
    } else if (direction === LEFT.toLowerCase()) {
      this.moveSlide(-1);
    }
  }

  calcDicstanceFactor(index: number, offset: number) {
    const thisOffset = offset;
    const thisOffsetFromCenter = index - thisOffset;
    const distanceFactor =
      1 - Math.abs(thisOffsetFromCenter / (thisOffset + 1));
    console.debug("index", distanceFactor);
    return distanceFactor;
  }

  render() {
    const { animationConfig, offsetRadius } = this.props;
    console.debug("this.props", this.props);
    return (
      <React.Fragment>
        <Wrapper>
          <div>
            {this.getPresentableSlides().map(
              (slide: Slide, presentableIndex: number) => (
                <Slide
                  key={slide.key}
                  thisKey={slide.key}
                  content={slide.image}
                  onClick={slide.onClick}
                  offsetRadius={this.clampOffsetRadius(offsetRadius)}
                  index={presentableIndex}
                  animationConfig={animationConfig}
                />
              )
            )}
          </div>
        </Wrapper>
        <NavigationButtons>
          <KeyboardEventHandler
            handleKeys={NAV_DIRECTIONS}
            onKeyEvent={(key) => this.handleArrowNavigation(key)}
          />
          <p onClick={() => this.moveSlide(-1)}>left</p>
          <p onClick={() => this.moveSlide(1)}>right</p>
          <DotList>
            {this.getPresentableSlides().map(
              (slide: Slide, presentableIndex: number) => (
                <Bullet
                  className={classnames(
                    presentableIndex === this.props.goToSlide ? "active" : null
                  )}
                >
                  <span onClick={slide.onClick} />
                </Bullet>
              )
            )}
          </DotList>
        </NavigationButtons>
      </React.Fragment>
    );
  }
}

export default Carousel;

const DotList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  padding: 20px 0;
  margin: 20px 0;
  justify-content: center;
  list-style-type: none;
  width: 100%;
`;

const Bullet = styled.li`
  margin-right: 20px;

  &:last-of-type {
    margin-right: 0;
  }

  span {
    width: 3px;
    height: 3px;
    border-radius: 100%;
    border: 2px solid #ffffff;
    opacity: 0.5;
    display: block;

    button {
      box-shadow: none;
      border: 0;
      margin: 0;
      padding: 0;
    }
  }

  &:hover {
    cursor: pointer;

    span {
      background: #ffffff;
      opacity: 1;
      transition: background 0.2s ease-in-out;
      position: relative;
    }
  }

  &.active {
    span {
      background: #ffffff;
      opacity: 1;
      transition: background 0.2s ease-in-out;
      position: relative;
    }
  }
`;
