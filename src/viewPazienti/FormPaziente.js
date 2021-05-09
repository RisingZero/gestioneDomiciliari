import React, { useState, useEffect } from 'react';
import './FormPaziente.css';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { Paziente, pazienteConverter } from './supportPazienti';
import fire from '../fire';

export default function FormPaziente(props) {

    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [indirizzo, setIndirizzo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [patologia, setPatologia] = useState('');
    const [priorita, setPriorita] = useState('');
    const [dataRichiesta, setDataRichiesta] = useState('');
    const [dataEffettuata, setDataEffettuata] = useState('')
    const [medico, setMedico] = useState('-1');
    const [commenti, setCommenti] = useState('');

    const [nomeError, setNomeError] = useState('');
    const [cognomeError, setCognomeError] = useState('');
    const [indirizzoError, setIndirizzoError] = useState('');
    const [telefonoError, setTelefonoError] = useState('');
    const [prioritaError, setPrioritaError] = useState('');
    const [listaMedici, setListaMedici] = useState([]);

    const { setAddingPaziente, uid } = props; 

    const clearForm = () => {
        setNome('');
        setCognome('');
        setIndirizzo('');
        setTelefono('');
        setPatologia('');
        setPriorita('');
        setDataRichiesta('');
        setDataEffettuata('');
        setMedico('-1');
        setCommenti('');
    };

    const clearErrors = () => {
        setNomeError('');
        setCognomeError('');
        setIndirizzoError('');
        setTelefonoError('');
        setPrioritaError('');
    }

    const formInvalido = () => {
        clearErrors();
        if (nome === '') {
            setNomeError("Inserire nome");
        }
        if (cognome === '') {
            setCognomeError("Inserire cognome");
        }
        if (indirizzo === '') {
            setIndirizzoError("Inserire indirizzo");
        }
        if (telefono === '') {
            setTelefonoError("Inserire telefono");
        }
        if (priorita === '') {
            setPrioritaError("Inserire priorità");
        }
    };

    const db = fire.firestore();

    const addPaziente = (paziente) => {
        db.collection(uid).doc(paziente.uniqueId)
            .withConverter(pazienteConverter)
            .set(paziente)
            .then(() => {
                console.log("Document written!");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    async function getMedici() {
        let medici = [];
        await db.collection("medici").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) =>{
                let med = doc.data();
                medici.push({
                    id:med.id,
                    nome:med.nome
                })
            })
        })
        .catch((error) => console.log("Error getting documents: ", error));

        setListaMedici(medici);
    }

    useEffect(() => {
        getMedici()
    }, [])

    return (    
        <div className="form-paziente">
            <h4><strong>Aggiungi paziente</strong></h4>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Nome
                    </Form.Label>
                    <Col>
                        <Form.Control 
                            type="text" 
                            placeholder="Nome" 
                            value={nome} 
                            onChange={e => setNome(e.target.value)} 
                            required />
                        <Form.Text className="text-muted">{nomeError}</Form.Text>
                    </Col>
                    <Col>
                        <Form.Control 
                            type="text" 
                            placeholder="Cognome"
                            value={cognome}
                            onChange={e => setCognome(e.target.value)}
                            required />
                        <Form.Text className="text-muted">{cognomeError}</Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Indirizzo
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            type="text" 
                            placeholder="Indirizzo"
                            value={indirizzo}
                            onChange={e => setIndirizzo(e.target.value)}
                            required/>
                        <Form.Text className="text-muted">{indirizzoError}</Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Telefono
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            type="text" 
                            placeholder="Telefono"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                            required />
                        <Form.Text className="text-muted">{telefonoError}</Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Patologia
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            as="textarea" 
                            placeholder="Patologia" 
                            value={patologia}
                            onChange={e => setPatologia(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Priorità
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            type="text" 
                            placeholder="Priorità"
                            value={priorita}
                            onChange={e => setPriorita(e.target.value)}
                            required />
                        <Form.Text className="text-muted">{prioritaError}</Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Data richiesta
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            type="date"
                            value={dataRichiesta}
                            onChange={e => setDataRichiesta(e.target.value)} />
                    </Col>  
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Effettuata il
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            type="date"
                            value={dataEffettuata}
                            onChange={e => setDataEffettuata(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Medico
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            as="select" 
                            value={medico}
                            onChange={e => {
                                setMedico(e.target.value)}}>
                            <option value="-1">Medico...</option>
                            {listaMedici.map((med) => (
                                <option value={med.id}>{med.nome}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Commenti
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            as="textarea" 
                            placeholder="Commenti"
                            value={commenti}
                            onChange={e => setCommenti(e.target.value)} />
                    </Col>
                </Form.Group>             
            </Form>
            <Button 
                onClick={() => setAddingPaziente(false)} 
                className="close-button">Chiudi</Button>
            <Button onClick={(e) => {
                    e.preventDefault();
                    if (nome === '' || cognome === '' || telefono === '' || indirizzo === '' || priorita === '') {
                        formInvalido();
                    } else {
                        let visite = [{
                            dataRichiesta: dataRichiesta,
                            dataEffettuata: (dataEffettuata !== '') ? dataEffettuata : '--',
                            priorita: priorita,
                            patologia: patologia,
                            voto:""
                        }]
                        let paziente = new Paziente(nome, cognome, indirizzo, telefono, visite, commenti, medico);
                        addPaziente(paziente);
                        clearForm();
                        clearErrors();
                    }}}>Aggiungi</Button>
            
        </div>             
    );
}