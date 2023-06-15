import React, { useState } from 'react';
import myImage from "./541316.jpg"
const Tabs = () => {

    const [currentTab, setCurrentTab] = useState('1');
    // const [hoveredCity, setHoveredCity] = useState(null);
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

    const [sampleCities, setSampleCities] = useState(initialSampleCities);
    const [tempCity, setTempCity] = useState('1');

    const handleTabClick = (e) => {
        // alert(e.target.id)
        console.log(e.target.id)
        setCurrentTab(e.target.id);
    }
    const updateCheckedCity = (e) => {
        // alert(e.target.city)
        // alert(e.target.id)
        // setTempCity(e.target.id);
        // alert(tempCity)
        // console.log(e.target.id)
        const updatedCities = sampleCities.map((city) => {
            // alert(city.city + " " + e.target.id)
            if (city.city === e.target.id) {
                alert(city.city)
                city.checked = !city.checked;
            }
            return city;
        })
        setSampleCities(updatedCities);
    }

    const widthChange = "50%"
    return (
        <>
            {/* <h1 style={{ background: "green" }}>hi</h1> */}
            <div className='container'
            // style={{ background: 'red' }}
            //WIDTH SET IN CSS
            // display='flex'
            // style={{ height: '20vh' }}
            >
                <div className='tabs'
                // style={{ background: 'blue' }}
                // style={{ display: 'flex', justifyContent: 'space-between' }}
                >

                    {tabs.map((tab, i) =>
                        <button
                            key={i}
                            id={tab.id}
                            disabled={currentTab === `${tab.id}`}
                            onClick={(handleTabClick)}>{tab.tabTitle}</button>
                    )}
                </div>
                <div className='content' style={{
                    // background: "blue",
                    border: '1px solid rgb(0, 0, 0)',
                    // style: 'flex',
                    // display: 'flex',
                    //NOTE: THIS CONTROLS HEIGHT OF CONTENT
                    height: '40vh',
                    // width: '100%',
                    overflowY: 'scroll',
                    // overflowX: 'scroll',
                }} >
                    {tabs.map((tab, i) =>
                        <div key={i} >
                            {currentTab === `${tab.id}` &&
                                <div >
                                    <p className='title'>{tab.title}</p>
                                    <p /*style={{background:"orange"}}*/>{tab.content}</p>
                                    {currentTab === '1' &&
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',

                                            // flex: '50%'
                                            alignItems: 'center',
                                            // justifyContent: 'center',
                                            // flexWrap: 'wrap',
                                        }}>
                                            {sampleCities.map((city, j) =>
                                                //    {/* <div key={'div'+j}> */}
                                                <button
                                                    key={j}
                                                    id={city.city}
                                                    style={{
                                                        backgroundColor: city.checked ? 'red' : 'white',
                                                        flex: '10%',
                                                        // flexGrow: '1',
                                                        // width: widthChange
                                                    }}
                                                    // id: {...city.city}
                                                    onClick={
                                                        // updateCheckedCity
                                                        (e) => {
                                                            console.log(e.target)
                                                            // console.log(city.city)
                                                            // console.log(e.target.id)
                                                            const updatedCities = sampleCities.map((city) => {
                                                                if (city.city === e.target.id || city.city === e.target.alt) {
                                                                    // alert(city.city)
                                                                    city.checked = !city.checked;
                                                                }
                                                                return city;
                                                            })
                                                            setSampleCities(updatedCities);

                                                        }}
                                                // {() => {
                                                // console.log(city.city)
                                                // updateCheckedCity
                                                // city.checked = !city.checked
                                                // }
                                                // }

                                                // onMouseEnter={
                                                //     () => setHoveredCity(city.city)
                                                // }
                                                >
                                                    <img
                                                        src={city.url}
                                                        alt={city.city}// + city.country}
                                                        width='300vh'
                                                    // backgroundColor="black"
                                                    // onClick={
                                                    //     (e) => {
                                                    //         e.stopPropagation();
                                                    //     }
                                                    // }
                                                    />
                                                    {/* <text>{city.city}</text> */}

                                                </button>
                                                //     {/* <h1>hi</h1> */}
                                                //   {/* </div> */}
                                            )}
                                        </div>
                                    }
                                </div>}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Tabs;