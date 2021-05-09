import React, { useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import VotiMedico from './VotiMedico';
import fire from '../fire';

export default function DettagliMedico(props) {

    const { uid, med } = props;

    const [modifica, setModifica] = useState(false);
    const [elimina, setElimina] = useState(false);

    const [email, setEmail] = useState(med.email);
    const [telefono1, setTelefono1] = useState(med.telefono1);
    const [telefono2, setTelefono2] = useState(med.telefono2);
    const [telefono3, setTelefono3] = useState(med.telefono3);

    const db = fire.firestore();

    const eliminaMedico = (id) => {
        if (elimina) {
            db.collection("medici").doc(id)
            .delete().then(() => {
                console.log("Document succesfully deleted!");
            })
            .catch((error) => {
                console.log("Error removing document: ", error)
            });
        }
    };

    const modificaMedico = (medico) => {
        db.collection("medici").doc(medico.id)
            .set(medico)
            .then(() => {
                console.log("Documento modificato!");
            })
            .catch((error) => {
                console.error("Error modifing document: ", error);
            });
        setModifica(false);
    };

    return (
        <div>
            <Form>
            <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control 
                            type="text"
                            placeholder="Email"
                            value={email}
                            disabled={!modifica}
                            onChange={e => setEmail(e.target.value)}
                             />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Telefono 1
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control 
                            type="text"
                            placeholder="Telefono 1"
                            value={telefono1}
                            disabled={!modifica}
                            onChange={e => setTelefono1(e.target.value)}
                             />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Telefono 2
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control 
                            type="text"
                            placeholder="Telefono 2"
                            value={telefono2}
                            disabled={!modifica}
                            onChange={e => setTelefono2(e.target.value)}
                             />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Telefono 3
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Control 
                            type="text"
                            placeholder="Telefono 3"
                            value={telefono3}
                            disabled={!modifica}
                            onChange={e => setTelefono3(e.target.value)}
                             />
                    </Col>
                </Form.Group>
            </Form>
            <VotiMedico medid={med.id} uid={uid} />
            <div className="options-row-expand">
                <Button variant="warning" onClick={() => setModifica(!modifica)}>Abilita / Disabilita modifica</Button>
                {(modifica) &&
                    <>
                        <Button 
                            variant="success"
                            onClick={() => {
                                let medico = {
                                    nome:med.nome,
                                    id:med.id,
                                    email:email,
                                    telefono1:telefono1,
                                    telefono2:telefono2,
                                    telefono3:telefono3
                                };
                                modificaMedico(medico);
                            }}
                        >
                            Salva modifiche
                        </Button>
                        <Button
                            variant="danger"
                            onClick={eliminaMedico(med.id)}
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
    )
}