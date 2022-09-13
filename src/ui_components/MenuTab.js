import styled from "styled-components";


const MenuTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #6659B6;
  border-radius: 49px 49px 0px 0px;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '7%'};
  margin-bottom: ${(props) => props.marginBottom || '0'};
`;

export default MenuTab;