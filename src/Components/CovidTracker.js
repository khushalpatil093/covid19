import React from "react";
import axios from "axios";
import { useState } from "react";

const CovidTracker = () => {

    const [countrydata, setCountrydata] = useState(null);
    const [countryName, setCountryName] = useState('');

    const fetchData = async () => {
        if(countryName) {
            try {
                const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${countryName}`)
                const data = await response.data;
                console.log(data);
                setCountrydata(data)
            } 
            catch (error) {
                console.log("Error fetching data : ",error);
            }    
        }
    }

    const handleInput = (e) => {
        setCountryName(e.target.value);
    }

    return (
        <div>
            <input type="text" placeholder="Country Name"
                value={countryName}
                onChange={handleInput}
            />
            <button onClick={fetchData}>Search</button>
            <div>
                {
                    countrydata && (
                        <div>
                            <h4>Country : {countrydata.country}</h4>
                            <p>Continent : {countrydata.continent}</p>
                            <p>Cases : {countrydata.cases}</p>
                            <p>recovered : {countrydata.recovered}</p>
                            <p>Population : {countrydata.population}</p>
                            <p>todayCases : {countrydata.todayCases}</p>
                            <p>todayDeaths : {countrydata.todayDeaths}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CovidTracker;