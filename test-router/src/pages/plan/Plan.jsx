import { useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import { useState } from "react";
import './tabs.css';

const initialSampleCities = [
    {
        id: 1,
        city: "Budapest",
        country: "Hungary",
        locationID: "274887",
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/36/37/32/caption.jpg",
        checked: false
    },
    {
        id: 2,
        city: "London",
        country: "United Kingdom",
        locationID: "186338",
        url: "https://media-cdn.tripadvisor.com/media/photo-s/02/57/44/0c/filename-img-1097-jpg.jpg",
        checked: false
    },
    {
        id: 3,
        city: "Paris",
        country: "France",
        locationID: "187147",
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/c2/86/0e/caption.jpg",
        checked: false
    },
    {
        id: 4,
        city: "Rome",
        country: "Italy",
        locationID: "187791",
        url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/c9/6c/08/caption.jpg"
    },
    {
        id: 5,
        city: "Barcelona",
        country: "Spain",
        locationID: "187497",
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/ae/5d/da/caption.jpg",
        checked: false
    },
    {
        id: 6,
        city: "Berlin",
        country: "Germany",
        locationID: "187323",
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/33/f5/c6/caption.jpg",
        checked: false
    },
    {
        id: 7,
        city: "Amsterdam",
        country: "Netherlands",
        locationID: "188590",
        url: "https://media-cdn.tripadvisor.com/media/photo-s/28/74/c9/cf/caption.jpg",
        checked: false
    },
    {
        id: 8,
        city: "Prague",
        country: "Czech Republic",
        locationID: "274707",
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/cc/d0/42/caption.jpg",
        checked: false
    },
    {
        id: 9,
        city: "Vienna",
        country: "Austria",
        locationID: "190454",
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/af/10/b8/caption.jpg",
        checked: false
    },
    {
        id: 10,
        city: "Dublin",
        country: "Ireland",
        locationID: "186605",
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/bf/9e/c4/caption.jpg",
        checked: false
    },
    {
        id: 11,
        city: 'Tokyo',
        country: 'Japan',
        locationID: '298184',
        url: "https://media-cdn.tripadvisor.com/media/photo-s/27/84/4b/d7/caption.jpg",
        checked: false
    },
    {
        id: 12,
        city: 'Vancouver',
        country: 'Canada',
        locationID: '154943',
        url: "https://media-cdn.tripadvisor.com/media/photo-s/1c/cc/d6/65/caption.jpg",
        checked: false
    },
    {
        id: 13,
        city: 'New York City',
        country: 'United States',
        locationID: '60763',
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/c5/7c/68/caption.jpg',
        checked: false
    },
    {
        id: 14,
        city: 'Mexico City',
        country: 'Mexico',
        locationID: '150800',
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/33/f3/96/caption.jpg',
        checked: false

    },
    {
        id: 15,
        city: 'Rio de Janeiro',
        country: 'Brazil',
        locationID: '303506',
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/1b/33/f4/3d/caption.jpg',
        checked: false
    },
    {
        id: 16,
        city: 'Jerusalem',
        country: 'Israel',
        locationID: '293983',
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/10/24/61/96/western-wall-temple-mount.jpg',
        checked: false
    },
    {
        id: 17,
        city: 'Cairo',
        country: 'Egypt',
        locationID: '294201',
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/03/9b/2f/5b/cairo.jpg',
        checked: false
    },
    {
        id: 18,
        city: 'New Delhi',
        country: 'India',
        locationID: '304551',
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/24/03/3f/fd/caption.jpg',
        checked: false
    },
    {
        id: 19,
        city: 'Beijing',
        country: 'China',
        locationID: '294212',
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/14/10/2d/f1/beijing.jpg',
        checked: false
    },
    {
        id: 20,
        city: 'Sydney',
        country: 'Australia',
        locationID: '255060',
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/27/84/4c/88/caption.jpg',
        checked: false
    }
]

export default function Plan() {
    const [anyCheckedCity, setAnyCheckedCity] = useState(false);
    const [sampleCities, setSampleCities] = useState(initialSampleCities);
    const [destArray, setDestArray] = useState([]);
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
    const navigate = useNavigate();
    return (
        <div >
            <h1 style={{ background: "lightblue" }}>Plan</h1>
            <Tabs
                sampleCities={sampleCities}
                updateCheckedCity={updateCheckedCity}
            />
            <button onClick={() => navigate('/')}>Go Home</button>
            <button
                style={{
                    display: anyCheckedCity ? "block" : "none",
                }}
            >
                Proceed
                {/* {destArray.length > 10 ? "hi" : "bye"} */}
                {/* {anyCheckedCity ? "Proceed" : "Please select a city"} */}
            </button>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >

                {destArray.map((city, i) => {
                    return (
                        <div
                            key={i}
                        >
                            <p>{" " + city.city + " "}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}