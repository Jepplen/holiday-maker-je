import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

import SelectAmountOfAdults from "../../Main/SearchContainer/SelectAmountOfAdults";
import SelectAmountOfChildren from "../../Main/SearchContainer/SelectAmountOfChildren";

import ChildrenAgeSelects from "../../Main/SearchContainer/ChildrenAgeSelects";

import ChangeDates from "./ChangeDates";
import RenderFoodOption from "./RenderFoodOption";
import filterDate from "../../../utils/filterDate";
import { DataFoodOptions } from "./DataFoodOptions";
import {handleEdit} from '../../MyBookings/ContainerButtons';

export default function ChangeBookingModal({
  handleClose,
  open,
  bookings,
  hotelId,
  setOrder
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [date, setDate] = useState({ start: "", end: "" });
  const [hotel, setHotel] = useState(null);
  const [newStartDate, setNewStartDate] = useState('')
  const [newEndDate, setNewEndDate] = useState('');
  const [newRoomOptions, setNewRoomOptions] = useState(bookings.rooms[0]);
  

  const bookedRooms = bookings.rooms;


  useEffect(() => {
    if (bookings) {
      setDate((prevState) => ({
        ...prevState,
        start: bookings.bookingDates.start,
        end: bookings.bookingDates.end,
      }));
    }
  }, [bookings]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/residences/${hotelId}`)
      .then((res) => {
        // console.log("Hotel Res ", res);
        setHotel(res.data.data);
      })
      .catch((error) => {
        console.error(
          "An error occured while retrieving data from the server",
          error
        );
      });
  }, [hotelId]);

  function findTheHotelRoomInHotel(id) {
    let x;
    const roomsInHotel = hotel.rooms;
    roomsInHotel.map((HotelRoom) => {
      if (HotelRoom._id === id) {
        return (x = HotelRoom);
      }
    });
    return x;
  }

  function saveChanges(){
    console.log('THIS IS THE OLD ORDER ', bookings);
    setNewRoomOptions({...newRoomOptions}, delete newRoomOptions.name);
    bookings.bookingDates.start = date.start;
    bookings.bookingDates.end = date.end;
    let data = {...bookings, ...bookedRooms.splice(0,1,newRoomOptions)  };
    console.log('....... THE HOLE NEW ORDER ', data);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      {!hotel ? (
        <Typography>Loading...</Typography>
      ) : (
        <div>
          <DialogTitle id="form-dialog-title">{hotel.name}</DialogTitle>
          <DialogContent>
            <ChangeDates date={date} setDate={setDate} />
            {/*             
        <SelectAmountOfAdults />
        <SelectAmountOfChildren />
        <ChildrenAgeSelects /> */}
            {/* Extra bed */}
            {/* flight */}
            {/* Need price */}
            {bookedRooms.map((room, index) => {
              const hotelRoom = findTheHotelRoomInHotel(room._id);
              //console.log(hotelRoom);
              const data = DataFoodOptions(hotelRoom);

              return (
                <React.Fragment key={index}>
                  {/* <FormControlLabel
                value={hotelRoom.extraBed}
                control={<Checkbox color="default" />}
                onChange={handleCheck}
                label={
                  <p style={{ paddingRight: "10vw" }}>
                    Extra Bed: {hotelRoom.extraBed}
                  </p>
                }
                labelPlacement="start"
              />
              */}
                  <Typography> Food options</Typography>
                  <RenderFoodOption
                    initiallySelected={room.option}
                    setNewRoomOptions={setNewRoomOptions}
                    newRoomOptions={newRoomOptions}
                    data={data}
                  />
                </React.Fragment>
              );
            })}
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="primary">
              Cancel changes
            </Button>
            <Button onClick={saveChanges} variant="outlined" color="primary">
              Save changes
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
}
