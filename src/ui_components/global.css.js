import { createGlobalStyle } from "styled-components";

const GlobalCSS = createGlobalStyle`

  body {
    background-color: rgba(8, 0, 54, 1);
    color: antiquewhite;
    font-family: 'Varela Round', sans-serif;
  }

  html {
    overflow: scroll;
  }
  ::-webkit-scrollbar {
      width: 0px;
      background: transparent; /* make scrollbar transparent */
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a {
    color: white;
    text-decoration: none;

  }

  .link {
    margin-bottom: 5%;
  }

  .donut-container {
    border: 1px solid pink;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .line-container {
    border: 1px solid red;
    position: relative;
    width: 60%;
    height: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td, th {

    padding: 0.5rem;
    text-align: center;
  }

  .tableBackground {
    overflow: hidden;
  }


`;

export default GlobalCSS;