import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from '../../node_modules/react-bootstrap-table2-paginator';
import FormPaziente from './FormPaziente';
import DettagliPaziente from './DettagliPaziente';
import { Button } from 'react-bootstrap';
import './Pazienti.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import fire from '../fire';
import { pazienteConverter } from './supportPazienti';

export default function Pazienti(props) {

    const db = fire.firestore();

    const { uid } = props;

    const [addingPaziente, setAddingPaziente] = useState(false);
    const [listaPazienti, setListaPazienti] = useState([])

    const columns = [
        {
            dataField: 'nome',
            text: 'Nome',
            sort:true
        }, 
        {
            dataField: 'cognome',
            text: 'Cognome',
            sort:true
        }, 
        {
            dataField: 'indirizzo',
            text: 'Indirizzo'
        },
        {
            dataField: 'visite[0].priorita',
            text: 'Priorità'
        }
    ];

    async function getPazienti() {
        let pazienti = [];
        await db.collection(uid)
                .withConverter(pazienteConverter)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let paz = doc.data();
                        pazienti.push(paz);
                    })
                })
                .catch((error) => console.log("Error getting documents: ", error));
        setListaPazienti(pazienti);
    }

    useEffect(() => {
        getPazienti();
    }, [])

    const expandRow = {
        renderer: row => (
            <div className="expanded-row-content">
                <DettagliPaziente paz={row} uid={uid} />
            </div>
        ),
        parentClassName: "expanded-row",
        onlyOneExpanding: true
    };

    return (
        <div className="pazienti-wrapper">
            <h1><strong>Pazienti</strong></h1>
            {(addingPaziente) ?
                <FormPaziente setAddingPaziente={setAddingPaziente} uid={uid} /> : (
                    <>
                        <div className="options">
                            <Button className="add-button" variant="primary" onClick={() => setAddingPaziente(true)}>Aggiungi</Button>
                            <Button className="refresh-button" variant="primary" onClick={() => getPazienti()}>Aggiorna Dati</Button>
                        </div>
                        <BootstrapTable 
                            headerClasses="table-header"
                            keyField='uniqueId' 
                            data={listaPazienti.map((pazObj) => {
                                return pazObj.toObject();
                            })} 
                            columns={ columns } 
                            expandRow={ expandRow }
                            pagination={ paginationFactory() }        
                         />                       
                    </>
                )
                }
        </div>
    );
}