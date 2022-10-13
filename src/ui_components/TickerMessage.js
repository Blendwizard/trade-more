import styled, {keyframes} from "styled-components";


const slideLeft = keyframes`
    0% {
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(-400%, 0, 0);
    }
`;

const TickerMessage = styled.div`
display: flex;
position: relative;
gap: 4em;
font-family: 'Press Start 2P';
font-size: xx-small;
left: 100%;
flex-shrink: 0;
align-items: center;
animation: ${slideLeft} linear infinite;
animation-duration: 30s;

&:hover {
  animation-play-state: paused;
  }
}

`;

export default TickerMessage;