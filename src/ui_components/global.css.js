import { createGlobalStyle } from "styled-components";

const GlobalCSS = createGlobalStyle`

  body {
    background-color: rgba(8, 0, 54, 1);
    color: antiquewhite;
    font-family: 'Varela Round', sans-serif;
  }

  a {
    color: white;
    text-decoration: none;

  }

  .link {
    margin-bottom: 5%;
  }

  .holdingGraph {
    width: 100%;
  }

`;

export default GlobalCSS;