import React from "react";
import moment from "moment";

const toCelsius = val =>  Math.round((val - 32) * (5 / 9))

const DayCard = ({data, degreeType, windSpeedUnit}) => {
    const {temp, dt, imgId, desc, feelsLike, humidity, windSpeed} = data
    const newDate = new Date()
    newDate.setTime(dt * 1000)
    const icon = `owf owf-${imgId} owf-5zx`
    const fahrenheitTemp = Math.round(temp)
    const fahrenheitFeelsLike = Math.round(feelsLike)
    const mph = Math.round(windSpeed)
    const kph = Math.round(windSpeed * 1.609)

    return(
        <div className="col-sm-2 mb-5">
            <div className="card">
                <h3 className="cardTitle">{moment(newDate).format('dddd')}</h3>
                <p className="textMuted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
                <i className={icon}></i>
                <h2>
                    {degreeType === 'fahrenheit' ? `${fahrenheitTemp}°F` : `${toCelsius(fahrenheitTemp)}°C`}
                </h2>
                <div className="cardBody">
                    <p className="cardText">Humidity : {humidity} %</p>
                    <p className="cardText">
                        Wind Speed : {windSpeedUnit === 'mph' ? ` ${mph} mph` : ` ${kph} kph`}
                    </p>
                    <p className="cardText">
                        Feels Like : {degreeType === 'fahrenheit' ? 
                        `${fahrenheitFeelsLike}°F` : `${toCelsius(fahrenheitFeelsLike)}°C`}
                    </p>
                    <p className="cardText">{desc}</p>
                </div>
            </div>
        </div>
    )
}

export default DayCard