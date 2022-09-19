import styled from "styled-components";
import FlexContainer from "./FlexContainer";

const DashBackground = styled(FlexContainer)`
display: flex;
width: 90%;
height: 40em;
justify-content: ${(props) => props.justify || 'normal'};
align-items: ${(props) => props.align || 'normal'};
background: #2C2461;
border-radius: 49px 49px 0px 0px;
`;

export default DashBackground