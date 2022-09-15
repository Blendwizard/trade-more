import styled from "styled-components";

const FlexContainer = styled.div`
position: relative;
display: flex;
flex-direction: ${(props) => props.direction};
gap: ${(props) => props.gap || '3em'};
justify-content: ${(props) => props.justify};
align-items: ${(props) => props.align};
flex-wrap: ${(props) => props.wrap || 'nowrap'};
margin: ${(props) => props.margin || '0'};
border-bottom ${(props) => props.borderbottom || '0'};
padding: ${(props) => props.padding || '0'};
width: ${(props) => props.width || '100%'};
height: ${(props) => props.height || 'auto'};
border: ${(props) => props.border || 'none'};
`;

export default FlexContainer;