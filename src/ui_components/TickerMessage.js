import styled, {keyframes} from "styled-components";


const TickerMessage = styled.div`
display: flex;
position: relative;
gap: 4em;
font-family: 'Press Start 2P';
font-size: xx-small;
left: 100%;
flex-shrink: 0;
align-items: center;
animation: slide-left linear infinite;
animation-duration: ${(props) => props.duration || '30s'};

&:hover {
  animation-play-state: paused;
  }
}

@keyframes slide-left {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(${(props) => props.rate || '-100%'} , 0, 0);
  }
}

`;

export default TickerMessage;