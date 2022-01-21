import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import WindSpeedToggle from "./WindSpeedToggle";
import WeatherService from '../services'



class ForecastContainer extends React.Component{
    state = {
        data:[],
        location:null,
        userData:null,
        loading:false, // important to handle loading
        error:false,   // important to do error handling
        degreeType:'fahrenheit',
        windSpeedUnit:'mph'
    }

    handleInputData = ({target:{name,value}}) =>{
        this.setState( prevState => ({
            userData : {...prevState.userData, [name] : value}
        }))
    }

    handleClick = () => {
        this.setState({loading:true})
        const weather = new WeatherService(Number(this.state.userData.zipCode))
        weather.fetchFiveDayForecast()
            .then( res => {
                if(res && res.res.ok){
                    this.setState({
                        data: res.data,
                        location:res.location,
                        loading:false,
                    })
                } else{
                    this.setState({
                        loading:false,
                    })
                }
            }, error => {
                console.log(error)
                this.setState({
                    loading:false,
                    error:true
                })
            })
    }

    updateForecastDegree = ( {target:{value}} ) => this.setState({degreeType: value})
    
    updateWindSpeedUnit = ( {target:{value}} ) => this.setState({windSpeedUnit: value})

    render(){

       const {data, location, loading, error, degreeType, 
                windSpeedUnit} = this.state

       return(
            <div className="container bg-primary p-2 text-dark bg-opacity-25 rounded mt-5" >
                <h1 className="display-1 jumbotron bg-light py-5 mb-5">5-day Weather Forecast</h1>
                <div className="zipCode input-group my-3 mx-auto"  style={{width:'300px'}} >
                    <input type="text" className="form-control" 
                    name="zipCode"
                    placeholder="city zip code" 
                    aria-label="city zip code" 
                    aria-describedby="basic-addon1"
                    onChange={this.handleInputData}/>
                    <button className="btn btn-outline-secondary" 
                    type="button" id="button-addon2" onClick={this.handleClick}>Search</button>
                </div>
                {location && <h5 className="text-muted">{location.name}, {location.country}</h5>}
                <DegreeToggle 
                updateForecastDegree={this.updateForecastDegree}
                degreeType={degreeType}
                />
                <WindSpeedToggle updateWindSpeedUnit={this.updateWindSpeedUnit}/>
                <div className="row justify-content-center">
                {!loading ? data.map( (item) => (
                    <DayCard 
                    data = {item} 
                    key={item.dt}
                    degreeType={degreeType}
                    windSpeedUnit={windSpeedUnit}
                    />)) :
                    <div>Loading</div>
                }
                {error && <div className="text-danger">Error loading data</div>}
                </div>
            </div>
        ) 
    }
    
}

export default ForecastContainer