import { createGlobalStyle } from "styled-components";

const GlobalCSS = createGlobalStyle`

  body {
    background-color: rgba(8, 0, 54, 1);
    color: antiquewhite;
  }

  a {
    color: white;
    text-decoration: none;

  }

  .link {
    margin-bottom: 5%;
  }

`;

export default GlobalCSS;