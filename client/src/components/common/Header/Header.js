import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Components
import LoginModal from "../../modals/LoginModal";

// Styles
const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: #162c72;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 3px 5px -3px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 99;
`;

const ContainerBtns = styled.div`
  position: absolute;
  bottom: 5px;
  right: 10px;
`;

const Logo = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
`;

const Header = () => {
  return (
    <Container>
      <Link
        to="/"
        style={{
          maxWidth: "280px",
          maxHeight: "85px",
          width: "auto",
          height: "auto",
          paddingLeft: 10,
        }}
      >
        <Logo src={process.env.PUBLIC_URL + "/Holidaymaker-logo-BIG.png"} />
      </Link>
      <ContainerBtns>
        <LoginModal />
      </ContainerBtns>
    </Container>
  );
};

export default Header;
