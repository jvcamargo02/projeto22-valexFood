import React from "react";
import styled from "styled-components";

export default function Layout({ children }) {
  return <Container>{children && children}</Container>;
}

const Container = styled.div`
  z-index: 9;
  position: relative;
`;
