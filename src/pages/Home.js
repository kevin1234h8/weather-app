import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const [city, setCity] = useState("");
  const [moreCity, setMoreCity] = useState("");
  const API_KEY = "07f706c1945b8e054602b87425ffd1d9";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  const date = new Date();
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const getDefaultData = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          moreCity !== "" ? moreCity : "new%20york"
        }&appid=${API_KEY}`
      );
      setDatas(res.data);
    };
    getDefaultData();
  }, [moreCity]);

  const getWeatherData = async () => {
    const res = await axios.get(URL);
    setDatas(res.data);
  };

  return (
    <div>
      <div
        className="w-full h-auto bg-no-repeat bg-cover bg-fixed text-[#eaedec] lg:h-auto"
        style={{
          backgroundImage: `url(${"https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYXRoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"})`,
        }}
      >
        <div className="flex flex-col h-full md:flex-col lg:flex-row">
          <div className="w-full flex flex-col justify-between p-20  lg:w-3/5">
            <div className="hidden lg:flex">Weather</div>
            <div className="flex flex-col text-center items-center gap-6 md:text-center lg:text-start lg:flex-row lg:items-center ">
              <div>
                <div className="text-6xl ">
                  {Math.floor(datas.main?.temp)}°F
                </div>
              </div>

              <div>
                <div className="text-4xl">{datas.name}</div>
                <div>
                  {("0" + date.getHours()).slice(-2)}:
                  {("0" + date.getMinutes()).slice(-2)} - {days[date.getDay()]}{" "}
                  , {date.getDate()} {months[date.getMonth()]}{" "}
                  {date.getFullYear()}
                </div>
              </div>
              <div className="flex flex-col items-center">
                {/* {(datas?.weather ?? [])[0]?.main === "Clouds" ||
                "Cloudy" ||
                (datas?.weather ?? [])[0]?.main !== "Clear" ? (
                  <ThunderstormIcon />
                ) : (
                  <WbSunnyIcon />
                )} */}
                <img
                  src={`http://openweathermap.org/img/w/${
                    (datas?.weather ?? [])[0].icon
                  }.png`}
                  alt=""
                />
                <div>{(datas?.weather ?? [])[0]?.main}</div>
              </div>
            </div>
          </div>
          <div className="w-full backdrop-blur-xl p-8 bg-black bg-opacity-30 lg:w-2/5">
            <div className="flex items-center justify-between ">
              <input
                type="text"
                placeholder="Another location"
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    getWeatherData();
                  }
                }}
                className="border-b outline-none bg-transparent w-full  py-4"
              />
              <button
                onClick={getWeatherData}
                className="bg-[#d66c05] p-4 rounded-lg"
              >
                <i className="fa-solid fa-search text-black"></i>
              </button>
            </div>
            <div className="border-b my-10 py-8 text-[#959da8] flex flex-col  justify-start gap-6">
              <div
                onClick={() => setMoreCity("birmingham")}
                className="hover:text-white duration-75 focus-within:text-white"
              >
                Birmingham
              </div>
              <div
                onClick={() => setMoreCity("manchester")}
                className="hover:text-white duration-75"
              >
                Manchester
              </div>
              <div
                onClick={() => setMoreCity("new york")}
                className="hover:text-white duration-75"
              >
                New York
              </div>
              <div
                onClick={() => setMoreCity("california")}
                className="hover:text-white duration-75"
              >
                California
              </div>
            </div>
            <div className="border-b pb-8">
              <div className="my-8 font-bold">Weather Details</div>
              <div className="text-[#8b929d] flex flex-col gap-6">
                <div className="flex items-center  justify-between">
                  <div>Min Temp</div>
                  <div className="text-white">{datas.main?.temp_min} °F</div>
                </div>
                <div className="flex items-center  justify-between">
                  <div>Max Temp</div>
                  <div className="text-white">{datas.main?.temp_max} °F</div>
                </div>
                <div className="flex items-center  justify-between">
                  <div>Humidity</div>
                  <div className="text-white">{datas.main?.humidity}%</div>
                </div>
                <div className="flex items-center  justify-between">
                  <div>Pressure</div>
                  <div className="text-white">{datas.main?.pressure}</div>
                </div>
              </div>
            </div>
            <div className="border-b pb-8">
              <div className="my-8 font-bold">Wind</div>
              <div className="text-[#8b929d] flex flex-col gap-6">
                <div className="flex items-center  justify-between">
                  <div>Coordinate</div>
                  <div className="text-white">
                    Lon : {datas.coord?.lon} Lat : {datas.coord?.lat}
                  </div>
                </div>
                <div className="flex items-center  justify-between">
                  <div>Speed</div>
                  <div className="text-white">{datas.wind?.speed} MPH</div>
                </div>
                <div className="flex items-center  justify-between">
                  <div>Deg</div>
                  <div className="text-white">{datas.wind?.deg} deg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h-screen bg-blue-100"></div> */}
    </div>
  );
};

export default Home;
