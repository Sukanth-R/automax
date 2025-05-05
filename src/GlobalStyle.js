// GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    background: linear-gradient(to right, #a8d0d6, #5f87a3); /* optional background */
}

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.125rem;
    font-weight: 400;
    max-width: 800px;
  }
`;
