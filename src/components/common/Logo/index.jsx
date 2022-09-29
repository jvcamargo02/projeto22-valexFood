import * as React from "react";
import styled from "styled-components";

import logo from "../../../assets/img/logo.png";

export default function Logo() {
    return (
        <Container>
            <img alt="difference" src={logo} />
            <nav>
                <span>Olá</span>
                <span>Olá</span>
                <span>Olá</span>
                <span>Olá</span>
                <span>Olá</span>
                <span>Olá</span>
            </nav>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-top: 40px;

    nav{
      position: absolute;
      right: 4vw;
      color: #FFF;
      font-weight: 700;
      display: flex;
      gap: 10px;

    }

    img {
        position: relative;
        width: 300px;
    }

    @media (max-width: 780px){
      nav{
        display: none;
      }
    }
`;
