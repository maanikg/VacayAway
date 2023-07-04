import { useNavigate } from "react-router-dom";
import InitialSelectCriteriaTabs from "./InitialSelectCriteraTabs";
import { useEffect, useState } from "react";
import './tabs.css';
import DestinationSelectedScreen from "./DestinationSelectedScreen";
import PlanGenerationScreen from "./PlanGenerationScreen";
import "../lufthansaAPI.js"
const initialSampleCities = [
    {
        id: 1,
        city: "Budapest",
        country: "Hungary",
        locationID: 274887,
        latitude: 47.49346,
        longitude: 19.0507,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/36/37/32/caption.jpg",
        checked: false
    },
    {
        id: 2,
        city: "London",
        country: "United Kingdom",
        locationID: 186338,
        latitude: 51.51924,
        longitude: -0.096654,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/02/57/44/0c/filename-img-1097-jpg.jpg",
        checked: false
    },
    {
        id: 3,
        city: "Paris",
        country: "France",
        locationID: 187147,
        latitude: 48.857037,
        longitude: 2.349401,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/c2/86/0e/caption.jpg",
        checked: false
    },
    {
        id: 4,
        city: "Rome",
        country: "Italy",
        locationID: 187791,
        latitude: 41.893623,
        longitude: 12.495978,
        url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/c9/6c/08/caption.jpg"
    },
    {
        id: 5,
        city: "Barcelona",
        country: "Spain",
        locationID: 187497,
        latitude: 41.385597,
        longitude: 2.169576,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/ae/5d/da/caption.jpg",
        checked: false
    },
    {
        id: 6,
        city: "Berlin",
        country: "Germany",
        locationID: 187323,
        latitude: 52.51959,
        longitude: 13.397209,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/33/f5/c6/caption.jpg",
        checked: false
    },
    {
        id: 7,
        city: "Amsterdam",
        country: "Netherlands",
        locationID: 188590,
        latitude: 52.37,
        longitude: 4.89,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/28/74/c9/cf/caption.jpg",
        checked: false
    },
    {
        id: 8,
        city: "Prague",
        country: "Czech Republic",
        locationID: 274707,
        latitude: 50.076847,
        longitude: 14.427817,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/cc/d0/42/caption.jpg",
        checked: false
    },
    {
        id: 9,
        city: "Vienna",
        country: "Austria",
        locationID: 190454,
        latitude: 48.208862,
        longitude: 16.372383,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/af/10/b8/caption.jpg",
        checked: false
    },
    {
        id: 10,
        city: "Dublin",
        country: "Ireland",
        locationID: 186605,
        latitude: 53.345966,
        longitude: -6.25341,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/bf/9e/c4/caption.jpg",
        checked: false
    },
    {
        id: 11,
        city: 'Tokyo',
        country: 'Japan',
        locationID: 298184,
        latitude: 35.680565,
        longitude: 139.759,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/27/84/4b/d7/caption.jpg",
        checked: false
    },
    {
        id: 12,
        city: 'Vancouver',
        country: 'Canada',
        locationID: 154943,
        latitude: 49.2808,
        longitude: -123.11672,
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/cc/d6/65/caption.jpg",
        checked: false
    },
    {
        id: 13,
        city: 'New York City',
        country: 'United States',
        locationID: 60763,
        latitude: 40.713238,
        longitude: -74.00584,
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/c5/7c/68/caption.jpg',
        checked: false
    },
    {
        id: 14,
        city: 'Mexico City',
        country: 'Mexico',
        locationID: 150800,
        latitude: 19.432684,
        longitude: -99.13325,
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/33/f3/96/caption.jpg',
        checked: false

    },
    {
        id: 15,
        city: 'Rio de Janeiro',
        country: 'Brazil',
        locationID: 303506,
        latitude: -22.91301,
        longitude: -43.18954,
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/33/f4/3d/caption.jpg',
        checked: false
    },
    {
        id: 16,
        city: 'Jerusalem',
        country: 'Israel',
        locationID: 293983,
        latitude: 31.78013,
        longitude: 35.215874,
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/10/24/61/96/western-wall-temple-mount.jpg',
        checked: false
    },
    {
        id: 17,
        city: 'Cairo',
        country: 'Egypt',
        locationID: 294201,
        latitude: 30.04998,
        longitude: 31.2486,
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2f/5b/cairo.jpg',
        checked: false
    },
    {
        id: 18,
        city: 'New Delhi',
        country: 'India',
        locationID: 304551,
        latitude: 28.612072,
        longitude: 77.22978,
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/24/03/3f/fd/caption.jpg',
        checked: false
    },
    {
        id: 19,
        city: 'Beijing',
        country: 'China',
        locationID: 294212,
        latitude: 39.909336,
        longitude: 116.39452,
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/14/10/2d/f1/beijing.jpg',
        checked: false
    },
    {
        id: 20,
        city: 'Sydney',
        country: 'Australia',
        locationID: 255060,
        latitude: -33.870037,
        longitude: 151.20955,
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/27/84/4c/88/caption.jpg',
        checked: false
    }
]
const tabs = [
    {
        id: 1,
        tabTitle: 'Destinations',
        title: 'Plan by Destination',
        content: 'Curate your plan based on the destination of your choice.'
    },
    {
        id: 2,
        tabTitle: 'Vacation Type',
        title: 'Plan by Vacation Type',
        content: 'Contenido de tab 2.'
    },
    {
        id: 3,
        tabTitle: 'Budget and Duration',
        title: 'Plan by Other Options',
        content: 'Contenido de tab 3.'
    },
    // {
    //     id: 4,
    //     tabTitle: 'Tab 4',
    //     title: 'Title 4',
    //     content: 'Contenido de tab 4.'
    // }
];

export default function Plan(props) {
    const [anyCheckedCity, setAnyCheckedCity] = useState(false);
    const [sampleCities, setSampleCities] = useState(initialSampleCities);
    const [destArray, setDestArray] = useState([]);
    const [currentTab, setCurrentTab] = useState('1');
    // const [destinationSelected, setDestinationSelected] = useState(false);
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [datesValid, setDatesValid] = useState(false);
    const [currentScreen, setCurrentScreen] = useState(0)

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }
    const updateCheckedCity = (e) => {
        setAnyCheckedCity(false)
        setDestArray([])

        const updatedCities = sampleCities.map((city) => {
            if (city.city === e.target.id || city.city === e.target.alt) {
                city.checked = !city.checked;
            }
            if (city.checked) {
                setAnyCheckedCity(true)
                setDestArray(destArray => [...destArray, city])
            }
            return city;
        })
        setSampleCities(updatedCities);
    }

    const proceed = () => {
        // setDestinationSelected(!destinationSelected)
        setCurrentScreen(currentScreen + 1)
    }

    const goBack = () => {
        setCurrentScreen(currentScreen - 1)
    }

    const goHome = () => {
        setDestArray([])
        setAnyCheckedCity(false)
        navigate('/')
        setSampleCities([...initialSampleCities])
    }

    const navigate = useNavigate();
    return (
        <div >
            <h1 style={{ background: "lightblue" }}>Plan</h1>
            <InitialSelectCriteriaTabs
                display={currentScreen === 0 ? "block" : "none"}
                currentScreen={currentScreen}
                setCurrentScreen={setCurrentScreen}
                sampleCities={sampleCities}
                updateCheckedCity={updateCheckedCity}
                tabs={tabs}
                handleTabClick={handleTabClick}
                currentTab={currentTab}
            />
            <DestinationSelectedScreen
                display={currentScreen === 1 ? "block" : "none"}
                currentScreen={currentScreen}
                setCurrentScreen={setCurrentScreen}
                destArray={destArray}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                datesValid={datesValid}
                setDatesValid={setDatesValid}
            />
            <PlanGenerationScreen
                display={currentScreen === 2 ? "block" : "none"}
                currentScreen={currentScreen}
                setCurrentScreen={setCurrentScreen}
                destArray={destArray}
                departureDate={departureDate}
                returnDate={returnDate}
                userLocation={props.userLocation}
                monitorAuthState={props.monitorAuthState}
                lufthansaAccessToken={props.lufthansaAccessToken}
                setLufthansaAccessToken={props.setLufthansaAccessToken}
                amadeusAccessToken={props.amadeusAccessToken}
                setAmadeusAccessToken={props.setAmadeusAccessToken}
            />
            <button
                style={{
                    display: (
                        currentScreen === 0 ? "none" : "block"
                    )
                }}
                onClick={goBack}
            >
                Go back to previous page
            </button>
            <button
                style={{
                    // display: (currentScreen == 0 && anyCheckedCity && "block" ? "block" : "none")
                    display: (
                        (currentScreen === 0 && ((anyCheckedCity && "block") || (!anyCheckedCity && "none"))) ||
                        (currentScreen === 1 && ((datesValid && "block") || (!datesValid && "none"))) ||
                        (currentScreen === 2 && "none")
                    )
                }}
                onClick={proceed}
            >
                {
                    (currentScreen === 0 && "Proceed to select dates") ||
                    (currentScreen === 1 && datesValid && "Proceed to generate trip")
                }
            </button>
            <button
                onClick={goHome}
            >Go Home</button>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                {/* {!destinationSelected && destArray.map((city, i) => { */}
                {currentScreen === 0 && destArray.map((city, i) => {
                    return (
                        <div
                            key={i}
                        >
                            <p>
                                {" " + city.city + " "}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}