import styled from "styled-components";
import React, {useContext} from "react";


const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid;
  border-radius: 15px;
  width: 100%;
  height: auto;
  color: #35d7b7;
  font-size: small;
  padding: 20px;
`;

const StatusBar = styled.progress`
  width: 100%;
`;

const style = {
  "position": "absolute",
  "fontSize": "1.5em",
  "color": "#35d7b7",
  "left": "3px",
  "top": "2px"
}

const AlertMessage = ( {message, total} ) => {


  return (
    <>
      <MessageBox>
        <i className="ci-off_outline_close" style={style}></i>
        {message}
        {total !== null ?  <StatusBar value={total.replace(/\,/g,'')} max={35000}/> : <StatusBar value={0} max={35000}></StatusBar>}

      </MessageBox>
    </>
  )
};

export default AlertMessage;