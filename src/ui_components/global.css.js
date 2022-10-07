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
    color: white;
  }

  .link:hover {
    cursor: pointer;

  }


  .ticker-container {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    border: 1px solid red;
    width: 55%
  }

  .ticker-message {
    display: flex;
    position: relative;
    left: 100%;
    flex-shrink: 0;
    align-items: center;
    animation: slide-left 10s linear infinite;
  }

  .research-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: .5px solid green
  }

  button:hover {
    cursor: pointer;
  }

  .logout-btn {

  }

  .logout-btn: hover {
    cursor: pointer;
  }

  .donut-container {

    position: relative;
    width: 100%;
    height: 100%;
  }

  .line-container {
    position: relative;
    width: 100%;
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

  @keyframes slide-left {
    from {
      -webkit-transform: translateX(0);
              transform: translateX(0);
    }
    to {
      -webkit-transform: translateX(-300%);
              transform: translateX(-300%);
    }

`;

export default GlobalCSS;