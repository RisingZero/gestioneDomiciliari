import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import Medici from '../viewMedici/Medici';
import Pazienti from '../viewPazienti/Pazienti';
import MapPage from '../gmaps/MapPage';
import Login from '../Login/Login';
import fire from '../fire';

function App() {

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [page, setPage] = useState('home');

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    // Funzione per gestire il login
    const handleLogin = (e) => {
        clearErrors()
        e.preventDefault();
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch(err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                    default:
                }
            });
    };

    // Funzione per gestire il logout
    const handleLogout = (e) => {
        e.preventDefault();
        fire.auth().signOut();
    };

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();
    })

    if (!user) {
        return <Login 
            email={email} 
            setEmail={setEmail}
            password={password} 
            setPassword={setPassword}
            handleLogin={handleLogin}
            emailError={emailError}
            passwordError={passwordError}
            />
    } else {
        let displayPage;
        if (page === "home")
            displayPage = <Home uid={user.uid} />
        else if (page === "pazienti")
            displayPage = <Pazienti uid={user.uid} setPage={setPage} />
        else if (page === "maps")
            displayPage = <MapPage />
        else if (page === "medici")
            displayPage = <Medici uid={user.uid} />
        return (
            <div className="wrapper">
                <Navigation handleLogout={handleLogout} setPage={setPage} />
                {displayPage}
            </div> 
        );
    }
}

export default App;