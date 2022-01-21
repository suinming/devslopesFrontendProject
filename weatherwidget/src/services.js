import { WEATHER_URL, WEATHER_API } from './constant'

class WeatherService {
    constructor(zipCode) {
        this.zipCode = zipCode;
    }

    async fetchFiveDayForecast() {
        const url = `${WEATHER_URL}zip=${this.zipCode}&units=imperial&appid=${WEATHER_API}`
        return new Promise(async (success, failure) => {
            try {
                const res = await fetch(url)
                if (res.ok) {
                    const json = await res.json()
                    const location = json.city
                    const data = json.list
                        .filter(item => item.dt_txt.includes('00:00:00'))
                        .map(item => ({
                            temp: item.main.temp,
                            dt: item.dt,
                            date: item.dt_txt,
                            imgId: item.weather[0].icon,
                            desc: item.weather[0].description,
                            feelsLike: item.main.feels_like,
                            humidity: item.main.humidity,
                            windSpeed: item.wind.speed,
                        }))
                    success({ res, data, location })
                } else {
                    failure({ error: 'Invalid http request' })
                }
            } catch (error) {
                failure(error)
            }
        })

    }
}

export default WeatherService