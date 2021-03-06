import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
  Link,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { airportsIATA } from "../config/constants";
import { Redirect } from "react-router-dom";
import { generateFlightNumbers } from "../utils/generateFlightNumber";

const useStyle = makeStyles({
  paper: {
    padding: "24px",
    height: "100%",
  },
  checkoutButton: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
  },
  noFlightLink: {
    // position: "absolute",
    // bottom: 50,
    // left: "50%",
    // transform: "translateX(-50%)",
    color: "#162C72",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

const departureAirports = ["Malmö MMX", "Stockholm ARN", "Copenhagen CPH"];

const Flight = (props) => {
  const {
    state: { queryParams, hotel, rooms },
  } = useLocation();
  const [airport, setAirport] = useState(departureAirports[0]);
  const [flightInfo, setFlightInfo] = useState(null);
  const [redirectWithFlight, setRedirectWithFlight] = useState(false);
  const [redirectWithoutFlight, setRedirectWithoutFlight] = useState(false);
  const style = useStyle();

  const { amountOfAdults, amountOfChildren, date } = queryParams;

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/flights/?checkIn=${date.start}&checkOut=${date.end}&adults=${amountOfAdults}&children=${amountOfChildren}`,
        {
          headers: {
            "x-auth-token": window.localStorage.getItem("auth-token"),
          },
        }
      )
      .then((response) => {
        setFlightInfo(response.data.data);
      });
  }, [amountOfAdults, amountOfChildren, date]);

  function handleAirportChange(event) {
    setAirport(event.target.value);
  }

  console.log(queryParams);

  return !flightInfo ? (
    <h1>no flights yet, please wait</h1>
  ) : (
    <Container
      style={{
        boxSizing: "border-box",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "50px 0",
        alignItems: "center",
      }}
    >
      {redirectWithFlight && (
        <Redirect
          to={{
            pathname: "/checkout",
            state: {
              flight: {
                firstAirport: airport,
                finalAirport: airportsIATA[hotel.city],
                firstFlightNumber: generateFlightNumbers(),
                finalFlightNumber: generateFlightNumbers(),
                ...flightInfo,
              },
              queryParams,
              hotel,
              rooms,
            },
          }}
        />
      )}
      {redirectWithoutFlight && (
        <Redirect
          to={{ pathname: "/checkout", state: { queryParams, hotel, rooms } }}
        />
      )}
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={style.paper}>
            <Grid container mb={2} className={style.flex}>
              <Grid item xs={4}>
                <FormControl variant="outlined">
                  <InputLabel id="airport-select-label">Airport</InputLabel>
                  <Select
                    labelId="airport-select-label"
                    id="airport-select"
                    value={airport}
                    onChange={handleAirportChange}
                    label="Airport"
                  >
                    {departureAirports.map((a) => (
                      <MenuItem value={a}>{a}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  {new Date(flightInfo.departureDate).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Adults: {amountOfAdults} </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>Children: {amountOfChildren} </Typography>
              </Grid>
            </Grid>

            <Box mt={4}>
              <Grid container>
                <Grid item mt={5} xs={4}>
                  <Grid container alignContent="center" justify="flex-start">
                    <Grid item xs={5} style={{ marginLeft: "15px" }}>
                      <Typography>{airportsIATA[hotel.city]}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    {new Date(flightInfo.returnDate).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Adults: {amountOfAdults} </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Children: {amountOfChildren} </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={3} alignItems="flex-end">
          <Paper className={style.paper}>
            <Box m={2}>{flightInfo.price} SEK</Box>
          </Paper>
        </Grid>
      </Grid>
      <Link
        className={style.noFlightLink}
        onClick={() => setRedirectWithoutFlight(true)}
      >
        Continue without flight
      </Link>
      <Button
        variant="contained"
        color="primary"
        className={style.checkoutButton}
        onClick={() => setRedirectWithFlight(true)}
      >
        Checkout
      </Button>
    </Container>
  );
};

export default Flight;
