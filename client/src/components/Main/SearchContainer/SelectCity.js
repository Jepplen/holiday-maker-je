import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { isWithinInterval } from "date-fns";

const useStyles = makeStyles((theme) => ({
 root: {
  width: 150,
 },
 formControl: {
  margin: theme.spacing(1),
  minWidth: 150,
 },
 selectEmpty: {
  marginTop: theme.spacing(2),
 },
 select: {
  fontWeight: 500,
  background: "white",
 },
 icon: {
  fill: "#162C72",
 },
 menuItem: {
  fontSize: 20, // font size i drop down kommer jag ej åt
 },
 border: {
  width: 160,
  height: 40,
  borderRadius: 7,
  background: "white",
  borderColor: "#162C72",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
 },
}));

const SelectCity = ({ residentData, city, setCity }) => {
 const classes = useStyles();

 function handleChange(e) {
  let userInput = e.target.value;

  if (userInput === "None") return setCity("");

  setCity(userInput);
 }

 let uniqueCity = residentData.reduce(
  (unique, item) =>
   unique.includes(item.city) ? unique : [...unique, item.city],
  []
 );
 uniqueCity.unshift("City");

 return (
  <>
   <InputLabel id="selectcity">City</InputLabel>
   <Select value={city || "None"} id="selectcity" onChange={handleChange}>
    {uniqueCity.map((city, i) => {
     return (
      <MenuItem key={city + i} value={city} onChange={handleChange}>
       {city}
      </MenuItem>
     );
    })}
   </Select>
  </>
 );
};

export default SelectCity;
