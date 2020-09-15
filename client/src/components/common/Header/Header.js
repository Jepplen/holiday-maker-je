import React from "react";
import styled from "styled-components";

// Components
import LoginModal from "../../modals/LoginModal"

// Styles
const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: #162C72;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
  box-shadow: 0px 3px 5px -3px rgba(0,0,0,0.5);
`;

const ContainerBtns = styled.div`
  padding-right: 10px;
`;

const Logo = styled.img`
  object-fit: contain;
  max-width: 90%;
  max-height: 90%;
  width: auto;
  height: auto;
  padding-left: 10px;
`;

const Header = () => {
  return (
    <Container>
      <Logo src={process.env.PUBLIC_URL + '/Holidaymaker-logo-BIG.png'} />
      <ContainerBtns>
        <LoginModal />
      </ContainerBtns>
    </Container>
  );
};

export default Header;
