import React, { useState } from "react";
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const SelectDropDown = styled(Select)`
    width: 200px;
    height: 30px;
`



const SelectCity = ({ residentData }) => {
    const [city, setCity] = useState();

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    console.log('CHOSEN CITY --->', city);


    const mapCities = residentData.map((city) => {
        console.log(city.city);
        
        return <MenuItem key={city._id} value={city.city} onChange={handleChange}>{city.city}</MenuItem>
    })

    return (
        <>
            <InputLabel id="selectcity">City</InputLabel>
            <SelectDropDown
                value={city}
                displayEmpty
                id="selectcity"
                onChange={handleChange}
            >
                <MenuItem disabled>City</MenuItem>
                {mapCities}
            </SelectDropDown>
        </>
    )
};

export default SelectCity;





{/*                 <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
 */}