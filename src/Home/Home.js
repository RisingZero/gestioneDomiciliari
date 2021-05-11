import React, { useState } from 'react';
import HomeCard from './HomeCard';
import './Home.css';

export default function Home(props) {

    const { setPage } = props;
    return (
        <div className="cards">
            <HomeCard 
                setPage={setPage}
                toPage="pazienti"
                title="Lista pazienti"
            />
            <HomeCard 
                setPage={setPage}
                toPage="medici"
                title="Lista medici"
            />
            <HomeCard 
                setPage={setPage}
                toPage="maps"
                title="Mappa"
            />
            <HomeCard 
                setPage={setPage}
                toPage="tools"
                title="Strumenti"
            />
            <HomeCard 
                setPage={setPage}
                toPage="profile"
                title="Profilo"
            />
        </div>
    )
}