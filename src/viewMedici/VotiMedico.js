import React, { useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import './VotiMedico.css';
import fire from '../fire';

export default function VotiMedico(props) {

    const { uid, medid } = props;

    const [votiVisite, setVotiVisite] = useState([]);

    const db = fire.firestore();

    async function getPazientiOfMedico(id) {
        let pazienti = [];
        await db.collection(uid)
            .where("medico", "==", id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) =>{
                    let paz = doc.data();
                    let visitePaz = paz.visite;
                    visitePaz.forEach((visita) => {
                        pazienti.push(visita.voto);
                    })
                })
            })
            .catch((error) => console.log("Error getting pazient infos: ", error));
        setVotiVisite(pazienti);
    }

    const badgeColor = (condition) => {
        if (condition === "")
            return "secondary";
        if (condition === "OK")
            return "success"
        if (condition === "BAD")
            return "danger"
    };

    const votiList = () => {
        let lista = [];
        for (let i = 0; i < votiVisite.length; i++) {
            lista.push(<Badge
                className={"badge-" + badgeColor(votiVisite[i])}
            >
            <span><i className="ni ni-check-bold"></i></span>
            </Badge>)
        }
        return lista;
    }

    useEffect(() => {
        getPazientiOfMedico(medid);
    }, [medid])

    return (
        <div className="voti-visite">
            {votiList()} 
        </div>
    )
}