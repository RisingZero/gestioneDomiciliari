import React, { useState, useEffect } from 'react';
import CardMedico from '../viewMedici/CardMedico';
import { Form, Row, Col, Button, Badge, InputGroup } from 'react-bootstrap';
import fire from '../fire';
import CryptoJS from 'crypto-js';
import { Paziente, pazienteConverter } from './supportPazienti';
import './DettagliPaziente.css';

export default function DettagliPaziente(props) {

    const { paz, uid } = props;

    const [modifica, setModifica] = useState(false);
    const [elimina, setElimina] = useState(false);

    const [telefono, setTelefono] = useState(paz.telefono);
    const [commenti, setCommenti] = useState(paz.commenti);
    const [visite, setVisite] = useState(paz.visite);
    const [medico, setMedico] = useState(paz.medico);
    const [listaMedici, setListaMedici] = useState([]);

    const db = fire.firestore();

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

    const eliminaPaziente = (uniqueId) => {
        if (elimina) {
            db.collection(uid).doc(uniqueId)
            .delete().then(() => {
                console.log("Document succesfully deleted!");
            })
            .catch((error) => {
                console.log("Error removing document: ", error)
            });
        }
        
    }

    const modificaPaziente = (paziente) => {
        db.collection(uid).doc(paziente.uniqueId)
            .withConverter(pazienteConverter)
            .set(paziente)
            .then(() => {
                console.log("Documento modificato!");
            })
            .catch((error) => {
                console.error("Error modifing document: ", error);
            });
        setModifica(false);
    }

    const badgeColor = (condition) => {
        if (condition === "")
            return "secondary";
        if (condition === "OK")
            return "success"
        if (condition === "BAD")
            return "danger"
    }

    const checkVisitaEffettuata = (data) => {
        if (data !== "") {
            let today = new Date();
            let paramData = data.split("-");
            let giornoVisita = new Date(paramData[0], paramData[1]-1, paramData[2]);

            if ((today.getTime() > giornoVisita.getTime())) {
                return "visita-done";
            } else {
                return "visita-programmed";
            }
        } else {
            return "visita-todo";
        }
        
    }

    useEffect(() => {
        getMedici()
    }, [])

    return (
        <div>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Indirizzo
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control 
                            type="text"
                            value={paz.indirizzo}
                            disabled
                            />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Telefono
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control 
                            type="text"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                            disabled={!modifica}
                            />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Commenti
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control 
                            as="textarea"
                            value={commenti}
                            onChange={e => setCommenti(e.target.value)}
                            disabled={!modifica}
                            />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Medico
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control 
                            as="select"
                            value={medico}
                            onChange={e => setMedico(e.target.value)}
                            disabled={!modifica}
                            >
                            <option value="-1">Medico...</option>
                            {listaMedici.map((med) => (
                                <option value={med.id}>{med.nome}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col>{(paz.medico!=-1) && <CardMedico idMedico={medico} />}</Col>
                </Form.Group>
            </Form>
            <Form>
                {visite.map((visita, idx) => (
                    <Form.Group as={Form.Row}>
                        <Form.Label column sm={2}>
                            Visita n.{idx+1}
                        </Form.Label>
                        <Col>
                            <Form.Label>
                                Data richiesta
                            </Form.Label>
                            <Form.Control 
                                type="date"
                                value={visite[idx].dataRichiesta}
                                onChange= {(e) => {
                                    let copiaVisite = [...visite];
                                    copiaVisite[idx].dataRichiesta = e.target.value;
                                    setVisite(copiaVisite);
                                }}
                                disabled={!modifica}
                                />
                        </Col>
                        <Col>
                            <Form.Label className={checkVisitaEffettuata(visite[idx].dataEffettuata)}>
                                Effettuata il
                            </Form.Label>
                            <Form.Control 
                                type="date"
                                value={visite[idx].dataEffettuata}
                                onChange= {(e) => {
                                    let copiaVisite = [...visite];
                                    copiaVisite[idx].dataEffettuata = e.target.value;
                                    setVisite(copiaVisite);
                                }}
                                disabled={!modifica}
                                />
                        </Col>
                        <Col>
                            <Form.Label>
                                Priorità
                            </Form.Label>
                            <Form.Control 
                                type="text"
                                value={visite[idx].priorita}
                                onChange= {(e) => {
                                    let copiaVisite = [...visite];
                                    copiaVisite[idx].priorita = e.target.value;
                                    setVisite(copiaVisite);
                                }}
                                disabled={!modifica}
                                />
                        </Col>
                        <Col>
                            <Form.Label>
                                Patologia
                            </Form.Label>
                            <Form.Control 
                                as="textarea"
                                value={visite[idx].patologia}
                                onChange= {(e) => {
                                    let copiaVisite = [...visite];
                                    copiaVisite[idx].patologia = e.target.value;
                                    setVisite(copiaVisite);
                                }}
                                disabled={!modifica}
                                />
                        </Col>
                        <Col>
                            <Form.Label>
                                Voto
                                
                            </Form.Label>
                            <Form.Control 
                                as="select"
                                value={visite[idx].voto}
                                onChange= {(e) => {
                                    let copiaVisite = [...visite];
                                    copiaVisite[idx].voto = e.target.value;
                                    setVisite(copiaVisite);
                                }}
                                disabled={!modifica}
                            >
                                <option value="">Voto...</option>
                                <option value="OK">OK</option>
                                <option value="BAD">Inutile</option>
                            </Form.Control>
                        </Col>
                        <Col sm={1}>
                        <Badge
                                className={"badge-" + badgeColor(visite[idx].voto)}
                                >
                                    <span><i className="ni ni-check-bold"></i></span>
                                </Badge>
                        </Col>
                    </Form.Group>
                ))}
            </Form>
            <div className="options-row-expand">
                <Button variant="warning" onClick={() => setModifica(!modifica)}>Abilita / Disabilita modifica</Button>
                {(modifica) &&
                    <>
                        <Button
                            variant="default"
                            onClick={() => {
                                let copiaVisite = [...visite];
                                copiaVisite.unshift({
                                    dataRichiesta:"",
                                    dataEffettuata:"--",
                                    priorita:"",
                                    patologia:"",
                                    voto:""
                                })
                                setVisite(copiaVisite);
                            }}
                        >
                            Aggiungi visita
                        </Button>
                        <Button 
                            variant="success"
                            onClick={() => {
                                let paziente = new Paziente(paz.nome, paz.cognome, paz.indirizzo, telefono, visite, commenti, medico);
                                modificaPaziente(paziente);
                            }}
                        >
                            Salva modifiche
                        </Button>
                        <Button
                            variant="danger"
                            onClick={eliminaPaziente(CryptoJS.MD5(paz.nome + paz.cognome + paz.indirizzo).toString())}
                        >
                            Elimina
                        </Button>
                        <span>
                        <InputGroup>
                            <InputGroup.Checkbox checked={elimina} onChange={() => setElimina(!elimina)} />
                        </InputGroup>  

                        </span>
                                        
                    </>
                }
            </div>         
        </div>
                
    );
}