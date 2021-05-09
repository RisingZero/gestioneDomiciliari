import React, { useState } from 'react';
import fire from '../fire';
import CryptoJS from 'crypto-js';
import { Button, Form, Col, Row } from 'react-bootstrap';

export default function FormMedico(props) {

    const { setAddingMedico } = props;

    const [nome, setNome] = useState('');
    const [nomeError, setNomeError] = useState('');
    const [email, setEmail] = useState('');
    const [telefono1, setTelefono1] = useState('');
    const [telefono2, setTelefono2] = useState('');
    const [telefono3, setTelefono3] = useState('');

    const clearForm = () => {
        setNome('');
        setEmail('');
        setTelefono1('');
        setTelefono2('');
        setTelefono3('');
    };

    const clearErrors = () => {
        setNomeError('');
    };

    const formInvalido = () => {
        clearErrors();
        if (nome === '')
            setNomeError('Inserire nome');
    };

    const db = fire.firestore();

    const addMedico = (medico) => {
        db.collection("medici").doc(medico.id)
            .set(medico)
            .then(() => {
                console.log("Document written!");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    return (
        <div className="form-medico">
            <h4><strong>Aggiungi medico</strong></h4>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Nome
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required />
                        <Form.Text className="text-muted">{nomeError}</Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                             />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Telefono 1
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            type="text"
                            placeholder="Telefono 1"
                            value={telefono1}
                            onChange={e => setTelefono1(e.target.value)}
                             />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Telefono 2
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            type="text"
                            placeholder="Telefono 2"
                            value={telefono2}
                            onChange={e => setTelefono2(e.target.value)}
                             />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Telefono 3
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control 
                            type="text"
                            placeholder="Telefono 3"
                            value={telefono3}
                            onChange={e => setTelefono3(e.target.value)}
                             />
                    </Col>
                </Form.Group>
            </Form>
            <Button
                onClick={() => setAddingMedico(false)}
                className="close-button"> Chiudi </Button>
            <Button
                onClick={(e) => { 
                    e.preventDefault();
                    if (nome === '') {
                        formInvalido();
                    } else {
                        let medico = {
                            nome:nome,
                            id:CryptoJS.MD5(nome).toString(),
                            email:email,
                            telefono1:telefono1,
                            telefono2:telefono2,
                            telefono3:telefono3
                        }
                        addMedico(medico);
                        clearForm();
                        clearErrors();
                    }
                }}
             >
                Aggiungi
            </Button>
        </div>
    )
}