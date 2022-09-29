import React from "react";
import styled from "styled-components";

import Layout from "../../components/common/Layout";

export default function About() {
  return (
    <Container>
      <Layout>
        <h1>About</h1>
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;

  h1 {
    color: wheat;
  }
`;
