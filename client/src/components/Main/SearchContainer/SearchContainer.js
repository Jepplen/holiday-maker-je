import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from "axios";
import Grid from '@material-ui/core/Grid';

import DatePicker from './DatePicker';

const Container = styled.div`
border: 2px solid red;
width: 90vw;
display: flex;
justify-content: center;
`;

const SearchContainer = () => {
  const [residentData, setResidentData] = useState([{}]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/residents/')
    .then((res) => {
      setResidentData(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    console.log('clicked');
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Grid
          className="search-top"
          container
          justify="space-around"
        >
          <DatePicker />
          <input type="submit" />
        </Grid>
        <Grid
          className="search-bottom"
          container
          justify="space-around"
        >
            BOTTOM
          </Grid>
        </form>
      </Container>
    );
  };

  export default SearchContainer;
