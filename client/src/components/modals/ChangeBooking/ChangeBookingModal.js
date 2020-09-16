import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import RadioGroup from "@material-ui/core/RadioGroup";

import SelectAmountOfAdults from "../../Main/SearchContainer/SelectAmountOfAdults";
import SelectAmountOfChildren from "../../Main/SearchContainer/SelectAmountOfChildren";

import ChildrenAgeSelects from "../../Main/SearchContainer/ChildrenAgeSelects";

import ChangeDates from "./ChangeDates";
import RenderFoodOption from "./RenderFoodOption";

export default function ChangeBookingModal({
  handleClose,
  open,
  bookings,
  hotelId,
}) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [date, setDate] = useState({start: '', end: ''});
  const bookedRooms = bookings.rooms;
  const [hotel, setHotel] = useState(null);
  const [editOrder, setEditOrder] = useState(bookings.rooms); // Lägg ändingarna i denna
  

  // (bookings.map(booking => {
  //   console.log(booking.bookingDates)
  //   // setStartDate(booking.bookingDates.start)
  //   // setEndDate(booking.bookingDates.end)
  // }))

  // {
  //   _id: {
  //     $oid: "5f5889d8daa2064fd4eb8a42",
  //   },
  //   userId: {
  //     $oid: "5f61c0cab5402617c07a742a",
  //   },
  //   bookingNumber: "k7cSt78z9k9v9n261lrv5364e",
  //   rooms: [
  //     {
  //       _id: {
  //         $oid: "5f5b7e5b36ac0355705b808c",
  //       },
  //       price: {newFood},
  //       option: "halfBoard",
  //       roomNumber: "103",
  //     },
  //   ],
  //   bookingDates: {
  //     start: {newstartdata},
  //     end: "2020-06-15T11:47:09.886Z",
  //   },
  //   hotel: {
  //     $oid: "5f5b7e5b36ac0355705b8087",
  //   },
  //   flight:
  //     "null" |
  //     {
  //       departureDate: "2020-06-01T11:46:29.258Z",
  //       returnDate: "2020-06-15T11:47:09.886Z",
  //       price: "Number",
  //     },
  // }


  function saveChanges(value){
    console.log('IAM ', value);
    // console.log('Before change ', editOrder);
      // const { value } = e.target;
      // const { name } = e.target;
      // setEditOrder({ ...editOrder, [name]: value });      
  }
  console.log('After change  ', editOrder);

  useEffect(() => {
    if(bookings){
      
      setDate((prevState => ({...prevState, start: startDate, end: endDate})));
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
    // console.log( id);
    let x;
    const roomsInHotel = hotel.rooms;
    roomsInHotel.map((HotelRoom) => {
      // console.log('This is rooms in HOTEL -> ',  HotelRoom._id);
      if (HotelRoom._id === id) {
        // console.log("*************************************", HotelRoom._id, id);
        // console.log(HotelRoom);
        return (x = HotelRoom);
      }
    });
    return x;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      {!hotel ? (
        <p>Loading...</p>
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
              console.log("This is my option ", room);

              const hotelRoom = findTheHotelRoomInHotel(room._id.$oid);
              

              return (
                <React.Fragment key={index}>
                  {/* <p>size: {hotelRoom.size}</p> */}
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
                  <RenderFoodOption
                    roomInfo={hotelRoom}
                    roomOption={room.price}
                    saveChanges={saveChanges}
                  />
                </React.Fragment>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel changes
            </Button>
            <Button onClick={handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
}
