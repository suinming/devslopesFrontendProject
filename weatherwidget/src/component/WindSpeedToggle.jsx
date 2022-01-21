import React from "react";

const WindSpeedToggle = ({updateWindSpeedUnit}) => {

    return(
        <React.Fragment>
                <select 
                name="windSpeed" 
                className="form-select form-select-sm mx-auto my-3"
                style={{width:'300px'}}
                onChange={updateWindSpeedUnit}
                >
                <option value="mph" defaultValue>Select the unit of the wind speed</option>
                <option value="mph">mph</option>
                <option value="kph">kph</option>
                </select>
        </React.Fragment>
       
    )
}

export default WindSpeedToggle