import React, { useState } from 'react';
import myImage from "./541316.jpg"
import { Button } from 'bootstrap';
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

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

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
                                <div style={{ display: 'flex' }}>
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
                                        style={{ flex: '0 1 50%' }}
                                        onClick={() => {
                                            console.log('click')
                                        }}

                                    >
                                        <img src={myImage} alt="my image" width='500vh' />
                                    </button>
                                    <button
                                        style={{ flex: '0 1 50%' }}
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
                                        onClick={() => {
                                            console.log('click')
                                        }}

                                    >
                                        <img src={myImage} alt="my image" width='500vh' />
                                    </button>
                                    <button
                                        style={{ flex: '0 1 50%' }}
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
                                        onClick={() => {
                                            console.log('click')
                                        }}

                                    >
                                        <img src={myImage} alt="my image" width='500vh' />
                                    </button>
                                    <Button variant="primary">Primary</Button>{' '}
                                </div>
                            </div>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Tabs;