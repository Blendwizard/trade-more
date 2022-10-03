import styled from "styled-components";

const DarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid #c4a7eb6b;
  border-radius: 45px;;
  background-color: rgba(4, 0, 31, 1);
  min-height: ${(props) => props.minHeight || 'auto' };
  align-items: ${(props) => props.align || 'normal' };
  justify-content: ${(props) => props.justify || 'normal' };
  gap: ${(props) => props.gap || 'none'};
`;

export default DarkContainer;
