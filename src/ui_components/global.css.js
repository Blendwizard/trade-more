import { createGlobalStyle } from "styled-components";

const GlobalCSS = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, #0c0022 100%);
    color: antiquewhite;
    font-family: 'Varela Round', sans-serif;
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

  .nav-title {
    color: #36d7b7;
    font-family: 'Press Start 2P', 'sans-serif';
    font-size: smaller;
  }


  .ticker-container {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    min-height: 25px;
    width: 100%
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
      -webkit-transform: translateX(-135%);
              transform: translateX(-135%);
    }

`;

export default GlobalCSS;