import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from '../../node_modules/react-bootstrap-table2-paginator';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import FormPaziente from './FormPaziente';
import DettagliPaziente from './DettagliPaziente';
import { Button } from 'react-bootstrap';
import './Pazienti.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import fire from '../fire';
import { pazienteConverter } from './supportPazienti';
import { useDispatch } from 'react-redux';

export default function Pazienti(props) {

    const db = fire.firestore();

    const dispatch = useDispatch();

    const { uid, setPage } = props;

    const [addingPaziente, setAddingPaziente] = useState(false);
    const [listaPazienti, setListaPazienti] = useState([])
    const [selectedPazienti, setSelectedPazienti] = useState([]);

    const columns = [
        {
            dataField: 'nome',
            text: 'Nome',
            sort:true,
            filter: textFilter()
        }, 
        {
            dataField: 'cognome',
            text: 'Cognome',
            sort:true,
            filter: textFilter()
        }, 
        {
            dataField: 'indirizzo',
            text: 'Indirizzo',
            filter: textFilter()
        },
        {
            dataField: 'visite[0].dataEffettuata',
            text: 'Visita effettuata il',
            filter: selectFilter({
                options: {
                    '--': 'Da fare',
                }
            })
        },
        {
            dataField: 'visite[0].priorita',
            text: 'Priorità',
            filter: selectFilter({
                options: {
                    'B': 'B',
                    'P': 'P',
                    'D': 'D'
                }
            })
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

    const gmapsSearch = () => {
        dispatch({
            type: "maps/addressClear"
        })
        for (let i = 0; i < selectedPazienti.length; i++) {
            dispatch({
                type: 'maps/addressAdded',
                payload: [selectedPazienti[i].nome, selectedPazienti[i].cognome, selectedPazienti[i].indirizzo + ', Torino', selectedPazienti[i].uniqueId].join(';')
            })
        }
        setPage("maps");
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

    const selectRow = {
        mode: "checkbox",
        style: { background: '#d2e1fc' },
        clickToExpand: true,
        hideSelectAll: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            let selected = selectedPazienti;
            if (isSelect) {
                selected.push({
                    nome: row.nome,
                    cognome: row.cognome,
                    indirizzo: row.indirizzo,
                    index: rowIndex
                })
            } else {
                let i;
                for (i = 0; i < selected.length; i++) {
                    if (selected[i].index === rowIndex)
                        break;
                }
                selected.splice(i, 1);
            }
            setSelectedPazienti(selected);
        },
        selectionRenderer: ({mode, checked, disabled}) => (
            <div className="selectionbox">
                { (!checked) ? <i className="ni ni-bold-right"></i> : <i className="ni ni-check-bold"></i>}  
            </div>
        )
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
                            <Button className="maps-search-button" variant="danger" onClick={() => gmapsSearch()}>Cerca su GMaps</Button>
                        </div>
                        <BootstrapTable 
                            headerClasses="table-header"
                            keyField='uniqueId' 
                            data={listaPazienti.map((pazObj) => {
                                return pazObj.toObject();
                            })} 
                            columns={ columns } 
                            expandRow={ expandRow }
                            selectRow={ selectRow }
                            pagination={ paginationFactory() }   
                            filter = { filterFactory() }
                            filterPosition = "top" 
                         />                       
                    </>
                )
                }
        </div>
    );
}