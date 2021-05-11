import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GoogleApiWrapper from './MapViewer'
import './MapPage.css';

const selectPlaces = state => state.addresses;

export default function MapPage() {

    const places = useSelector(selectPlaces);

    const addressLookups = places.map((place) => (
        <div key={place.uniqueId} className="address-label">
            <p className="name">{place.nome + ' ' + place.cognome}</p>
            <p className="indirizzo">{place.indirizzo}</p>
        </div>
    ))
    
    return (
        <div className="map-page">
            <div className="address-container">
                {addressLookups}
            </div>
            <div className="map-container">
                <GoogleApiWrapper places={places} />
            </div>
        </div>
    )
}

