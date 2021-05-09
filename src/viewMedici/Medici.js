import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from '../../node_modules/react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';import './Medici.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import fire from '../fire';
import FormMedico from './FormMedico.js';
import DettagliMedico from './DettagliMedico.js'

export default function Medici(props) {

    const { uid } = props;

    const [addingMedico, setAddingMedico] = useState(false);
    const [listaMedici, setListaMedici] = useState([])

    const db = fire.firestore();

    async function getMedici() {
        let medici = [];
        await db.collection("medici").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) =>{
                let med = doc.data();
                medici.push(med);
            })
        })
        .catch((error) => console.log("Error getting documents: ", error));
        setListaMedici(medici);
    }


    const columns = [
        {
            dataField: 'nome',
            text: 'Nome',
            sort:true,
            filter: textFilter()
        }
    ];

    const expandRow = {
        renderer: row => (
            <div className="expanded-row-content">
                <DettagliMedico med={row} uid={uid} />
            </div>
        ),
        parentClassName: "expanded-row",
        onlyOneExpanding: true
    };

    useEffect(() => {
        getMedici();
    }, [])

    return (
        <div className="medici-wrapper">
            <h1><strong>Medici</strong></h1>
            {(addingMedico) ?
                <FormMedico setAddingMedico={setAddingMedico} /> : (
                    <>
                        <div className="options">
                            <Button className="add-button" variant="primary" onClick={() => setAddingMedico(true)}>Aggiungi</Button>
                            <Button className="refresh-button" variant="primary" onClick={() => getMedici()}>Aggiorna dati</Button>
                        </div>
                        <BootstrapTable 
                            headerClasses="table-header"
                            keyField='id'
                            data={listaMedici}
                            columns={ columns }
                            expandRow={ expandRow }
                            pagination={ paginationFactory() }
                            filter= { filterFactory() }
                            filterPosition = "top"
                        />
                    </>
                ) }
        </div>
    )
}