import React, { useState } from 'react';
import myImage from "./541316.jpg"
function Tabs(props) {
    // const [hoveredCity, setHoveredCity] = useState(null);

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

                    {props.tabs.map((tab, i) =>
                        <button
                            key={i}
                            id={tab.id}
                            disabled={props.currentTab === `${tab.id}`}
                            onClick={(props.handleTabClick)}>{tab.tabTitle}</button>
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
                    {props.tabs.map((tab, i) =>
                        <div key={i} >
                            {props.currentTab === `${tab.id}` &&
                                <div >
                                    <p className='title'>{tab.title}</p>
                                    <p /*style={{background:"orange"}}*/>{tab.content}</p>
                                    {props.currentTab === '1' &&
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',

                                            // flex: '50%'
                                            alignItems: 'center',
                                            // justifyContent: 'center',
                                            // flexWrap: 'wrap',
                                        }}>
                                            {props.sampleCities.map((city, j) =>
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
                                                        props.updateCheckedCity
                                                    }
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