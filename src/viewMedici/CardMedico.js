import React, { useState, useEffect } from 'react';
import fire from '../fire';
import VotiMedico from './VotiMedico';
import './CardMedico.css';


export default function CardMedico(props) {

    const { idMedico, uid } = props;

    const [medico, setMedico] = useState({});

    const db = fire.firestore();

    async function getMedico(id) {
        await db.collection("medici").where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) =>{
                setMedico(doc.data());
            })
        })
        .catch((error) => console.log("Error getting documents: ", error));

    }

    useEffect(() => {
        getMedico(idMedico)
    }, [idMedico])

    return (
        <div className="card">
            <h5>Medico</h5>
            <p>{medico.nome}</p>
            {medico.email && <p>{medico.email}</p>}
            {medico.telefono1 && <p>{medico.telefono1}</p>}
            {medico.telefono2 && <p>{medico.telefono2}</p>}
            {medico.telefono3 && <p>{medico.telefono3}</p>} 
            <VotiMedico medid={idMedico} uid={uid} />
        </div>
    )
}