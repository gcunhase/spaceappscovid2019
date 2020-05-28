import React, { useState, useEffect } from 'react';
import ReactSearchBox from 'react-search-box'; //https://www.npmjs.com/package/react-search-box
//import 'react-date-range/dist/styles.css'; // main style file
//import 'react-date-range/dist/theme/default.css'; // theme css file
//import { Calendar } from 'react-date-range';
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';


const App = () => {

  var data = [
      {key: 'fhaz', value: 'fhaz'},
      {key: 'rhaz', value: 'rhaz'},
      {key: 'mast', value: 'mast'},
      {key: 'chemcam', value: 'chemcam'},
      {key: 'mahli', value: 'mahli'},
      {key: 'mardi', value: 'mardi'},
      {key: 'navcam', value: 'navcam'},
      {key: 'pancam', value: 'pancam'},
      {key: 'minites', value: 'minites'},
    ]

  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date("2019-02-03"))
  const [selectedCamera, setSelectedCamera] = useState("")

  const DEMO_KEY = 'jwIG0mMTh5mcGZT9FP8GgLxGRAJUlXpSkZ07OIdc' //Copy the NASA Key here
  const url_root = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?` // NASA URL TODO: earth_date: input from website!
  const [url, setUrl] = useState(`${url_root}earth_date=${format(selectedDate, "yyyy-MM-dd")}&api_key=${DEMO_KEY}`) // NASA URL TODO: earth_date: input from website!

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);

      try {
        console.log(url);
        const res = await fetch(url);
        //console.log(res);
        if (res) {
          const json = await res.json();
          setResponse(json)
        }
        setIsLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    fetchData();
  }, [url]) //Watcher variables

  function filterImage(record) {
      if (typeof record === 'string') {
        if (record.trim().length == 0) {  //reset search bar
          console.log('Search: ', record.length);
          setSelectedCamera(record);
          updateUrl(selectedDate, record);
        }
      } else { //search bar has value
        console.log('Search: ', record.value);
        setSelectedCamera(record.value);
        updateUrl(selectedDate, record.value);
      }
  }

  function searchDate(date) {
      setSelectedDate(date);
      updateUrl(date, selectedCamera);
  }

  function updateUrl(date, camera) {
    console.log("Date: %s, camera: %s", date, camera);
    setResponse(null);
    setError(null);
    setIsLoading(true);
    if (camera.trim().length == 0) {
      setUrl(`${url_root}earth_date=${format(date, "yyyy-MM-dd")}&api_key=${DEMO_KEY}`)
    } else {
      setUrl(`${url_root}earth_date=${format(date, "yyyy-MM-dd")}&camera=${camera}&api_key=${DEMO_KEY}`)
    }
    //setUrl(`${url_root}earth_date=${format(date, "yyyy-MM-dd")}&api_key=${DEMO_KEY}`)
  }

  return (
    <div className="App">
        <div className="text-header">
            <h3>Images from Curiosity <span role="img" aria-label="Rocket"> 🚀 </span></h3>
        </div>
        <div className="filtering-container">
          <div className="search-bar-container">
            <ReactSearchBox
              placeholder="Search camera type"
              value=""
              data={data}
              onSelect={filterImage}
              onChange={filterImage}
              //onSelect={record => console.log(record)}
            />
          </div>
          <p>OR</p>
          <div className="date-picker-container">
            <DatePicker
              placeholderText="Select date"
              //selected={selectedDate}
              selected={new Date(selectedDate)}
              dateFormat="yyyy-MM-dd"
              onChange={searchDate}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              //onChange={() => console.log('Calendar')}
            />
          </div>
        </div>
        <div className="body-container">
            { isLoading ?
                  <div>
                    <img className="loader" src={'https://d2vrnm4zvhq6yi.cloudfront.net/assets/loader_puntos-df9857dfaf7eeb01c9cb2c2d1d208a8365ea4cdab85e1adeadaceff0c8f27964.gif'} alt="Loading..."/>
                  </div>
               : response ? (
                      response.photos.length == 0 ? (
                        //console.log(response) &&
                        <div className="text-not-found">
                            <p>No images were found!</p>
                        </div>
                      ) : (
                        Object.entries(response.photos).map(([key, values]) => {
                          return (
                            <div key={key} className="image-container">
                              <img key={key} className="image-rover" src={values.img_src} alt="image_from_rover"/>
                            </div>
                          );
                        })
                    )
                  )
                : (<p>{error}</p>)
            }
        </div>
    </div>
  );
}

export default App;
