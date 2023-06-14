import React, { useState } from 'react';
import myImage from "./541316.jpg"
const Tabs = () => {

    const [currentTab, setCurrentTab] = useState('1');
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
    const sampleCitiesURLs = [
        {
            city: "Budapest",
            country: "Hungary",
            locationID: "274887",
            url: "https://media-cdn.tripadvisor.com/media/photo-s/1b/36/37/32/caption.jpg"
        },
        {
            city: "London",
            country: "United Kingdom",
            locationID: "186338",
            url: "https://media-cdn.tripadvisor.com/media/photo-s/02/57/44/0c/filename-img-1097-jpg.jpg"
        },
        {
            city: "Paris",
            country: "France",
            locationID: "187147",
            url: "https://media-cdn.tripadvisor.com/media/photo-s/02/57/44/0c/filename-img-1097-jpg.jpg"
        },
        {
            city: "Rome",
            country: "Italy",
            url: ""
        },
        {
            city: "Barcelona",
            country: "Spain",
            url: ""
        },
        {
            city: "Berlin",
            country: "Germany",
            url: ""
        },
        {
            city: "Amsterdam",
            country: "Netherlands",
            url: ""
        },
        {
            city: "Prague",
            country: "Czech Republic",
            url: ""
        },
        {
            city: "Vienna",
            country: "Austria",
            url: ""
        },
        {
            city: "Dublin",

            country: "Ireland",
            url: ""
        },
        {
            city: 'Tokyo',
            country: 'Japan',
            url: ''

        },
        {
            city: 'Vancouver',
            country: 'Canada',
            url: ''
        },
        {
            city: 'New York City',
            country: 'United States',
            url: ''
        },
        {
            city: 'Mexico City',
            country: 'Mexico',
            url: ''

        },
        {
            city: 'Rio de Janeiro',

            country: 'Brazil',
            url: ''
        },
        {
            city: 'Jerusalem',
            country: 'Israel',
            url: ''
        },
        {
            city: 'Cairo',
            country: 'Egypt',
            url: ''
        },
        {
            city: 'New Delhi',
            country: 'India',
            url: ''
        },
        {
            city: 'Beijing',
            country: 'China',
            url: ''
        },
        {
            city: 'Sydney',
            country: 'Australia',
            url: ''
        }
    ]

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }
    const widthChange = "50%"
    return (
        <div className='container'
        // style={{ height: '20vh' }}
        >
            <div className='tabs'>
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
                height: '20vh',
                overflowY: 'scroll',
                overflowX: 'scroll'
            }} >
                {tabs.map((tab, i) =>
                    <div key={i} >
                        {currentTab === `${tab.id}` &&
                            <div >
                                <p className='title'>{tab.title}</p>
                                <p /*style={{background:"orange"}}*/>{tab.content}</p>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}>
                                    <button
                                        // style={{
                                        //     /*borderColor: 'transparent'*/
                                        //     backgroundColor: 'white',
                                        //     borderRadius: 0,
                                        //     // borderColor: 'transparent',
                                        //     // hover: {
                                        //     //     backgroundColor: 'black',
                                        //     //     // borderColor: 'transparent',
                                        //     // }
                                        // }}
                                        // style={{ flex: '0 1 50%' }}
                                        style={{
                                            flex: '50%',
                                            width: widthChange
                                            // width: "100%"
                                        }}
                                        onClick={() => {
                                            console.log('click')
                                        }}

                                    >
                                        <img src={myImage} alt="my image"
                                            width='500vh'

                                        />
                                    </button>
                                    <button
                                        // style={{ flex: '0 1 50%' }}
                                        style={{
                                            flex: '50%',
                                            width: widthChange
                                        }}
                                        onClick={() => {
                                            console.log('click')
                                        }}

                                    >
                                        <img src={myImage} alt="my image" width='500vh' />
                                    </button>
                                    <button
                                        // style={{ flex: '0 1 50%' }}
                                        style={{
                                            flex: '50%',
                                            width: widthChange
                                        }}
                                        onClick={() => {
                                            console.log('click')
                                        }}
                                    >
                                        <img src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"} alt="my image" width='500vh' />
                                        {/* <img src={"http://www.google.com/search?q=budapest&tbm=isch"} alt="my image" width='500vh' /> */}
                                    </button>
                                    <button
                                        // style={{ flex: '0 1 50%' }}
                                        style={{
                                            flex: '50%',
                                            width: widthChange
                                        }}
                                        onClick={() => {
                                            console.log('click')
                                        }}
                                    >
                                        <img src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"} alt="my image" width='500vh' />
                                        {/* <img src={"http://www.google.com/search?q=budapest&tbm=isch"} alt="my image" width='500vh' /> */}
                                    </button>
                                </div>
                            </div>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;