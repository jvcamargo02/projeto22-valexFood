import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "react-spring";
import styled from "styled-components";

import Carousel from "../../../Nav/Carousel/index.jsx";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";

export default function Navigator() {
  const [currSlide, setCurrSlide] = useState(0);
  const history = useHistory();

  function handleClick(e) {
    if (e !== currSlide) {
      setCurrSlide(e);
    } else {
      history.push("/about");
    }
  }
  const slides = [
    { key: 1, image: "https://picsum.photos/800/801/?random" },
    { key: 2, image: "https://picsum.photos/800/801/?random" },
    { key: 3, image: "https://picsum.photos/800/801/?random" },
    { key: 4, image: "https://picsum.photos/800/801/?random" },
    { key: 5, image: "https://picsum.photos/800/801/?random" }
  ].map((slide, index) => ({
    ...slide,
    onClick: () => handleClick(index)
  }));
  const windowSize = useWindowSize();
  return (
    <Container>
      <SliderContainer width="80%" height={windowSize.height * 0.5}>
        <Carousel
          slides={slides}
          animationConfig={config.gentle}
          goToSlide={currSlide}
          showNavigation
        />
      </SliderContainer>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
`;

const SliderContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height}px;
  margin: 0 auto;
`;
