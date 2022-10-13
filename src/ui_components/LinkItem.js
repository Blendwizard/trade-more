import styled from "styled-components";

const LinkItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 0.3em;
  padding: 5px;
  border-radius: 10px;
  min-height: 2em;
  &:hover {
    background-color: #6a4feb3d;
    cursor: pointer;
  };
  background-color: ${(props) => props.active === true ? '#ffffff3d' : 'none'};
`;

export default LinkItem;