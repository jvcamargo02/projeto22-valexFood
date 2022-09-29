import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import GlobalStyle from "./globalStyles/reset";
import Home from "./pages/Home";
import About from "./pages/About";
import {
  AnimatedRoutes,
  RouteTransition
} from "./components/AnimatedRoutes/RouteTransition/index.jsx";
import Logo from "./components/common/Logo/index";
import { useWindowSize } from "./utils/hooks/useWindowSize";

export default function App() {
  const pageMotion = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, transition: { duration: 2 } },
    exit: { opacity: 0, x: 0, transition: { duration: 2 } }
  };

  const size = useWindowSize();

  return (
    <Container>
      <GlobalStyle />
      <Router>
        <Route
          render={({ location }) => (
            <>
              <AnimatePresence exitBeforeEnter initial={false}>
                <MotionDiv
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageMotion}
                >
                  <Logo />
                </MotionDiv>
              </AnimatePresence>
              <AnimatedRoutes exitBeforeEnter initial={true}>
                <RouteTransition exact path="/" slideUp={0}>
                  <Home />
                </RouteTransition>
                <RouteTransition exact path="/about" slideUp={0}>
                  <About />
                </RouteTransition>
              </AnimatedRoutes>
            </>
          )}
        />
      </Router>
    </Container>
  );
}

const MotionDiv = styled(motion.div)`
  display: contents;
`;

const Container = styled.div`
  background-color: #002855;
`;
