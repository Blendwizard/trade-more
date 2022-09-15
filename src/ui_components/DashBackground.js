import styled from "styled-components";

const DashBackground = styled.div`
display: flex;
width: 100%;
height: 40em;
justify-content: ${(props) => props.justify || 'normal'};
align-items: ${(props) => props.align || 'normal'};
background: #2C2461;
border-radius: 49px 49px 0px 0px;
`;

export default DashBackground