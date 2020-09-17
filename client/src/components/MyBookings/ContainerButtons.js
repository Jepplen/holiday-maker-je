import React from "react";
// import { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  .buttonContainer {
    display: flex;
    justify-content: space-between;
  }
`;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ContainerButtons = (props) => {
  const classes = useStyles();
  //   const [deleteModal, setDeleteModal] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const handleDeleteModal = () => {
  //     setDeleteModal(!deleteModal);
  //   };

  const handleDelete = () => {
    console.log(props.orderId);
    axios
      .delete(`http://localhost:8080/api/myBooking/${props.orderId}`)
      .then((res) => {
        props.setUpdate(props.update + 1);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const handleEdit = () => {
  //     axios
  //       .put(`http://localhost:8080/api/myBooking/${props.orderId}`, hårdkokt)
  //       .then((res) => {
  //         props.setUpdate(props.update + 1);
  //         console.log("UPDATED BUT STILL THE SAME");
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  const body = (
    <Container style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Delete Order</h2>
      <p id="simple-modal-description">Are you sure you want to delete your order?</p>
      <div className="buttonContainer">
        <Button variant="outlined" color="primary" onClick={handleDelete}>
          Yes
        </Button>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          No
        </Button>
      </div>
    </Container>
  );

  return (
    <div>
      <Button type="button" variant="outlined" color="primary" onClick={handleOpen}>
        Delete
      </Button>
      {/* <Button variant="outlined" color="primary" onClick={() => props.saveOrder(props.myBooking)}>
        Change
      </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default ContainerButtons;
