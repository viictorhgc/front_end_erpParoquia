import React, { useState, useCallback } from 'react'
import { Alert, Form, Col, Row, Button, Modal } from 'react-bootstrap';
import api from '../../../services/api';

const ModalNovoDizimo = props => {

    const [valorNovoDizimo, setValorNovoDizimo] = useState(0)
    const [erro, setErro] = useState('')

    const handleNovoDizimo = useCallback((e) => {
        e.preventDefault()
        var fluxo_caixa = {};
        fluxo_caixa.pagadorId = 2
        fluxo_caixa.receptorId = 1
        fluxo_caixa.receitaDespesaId = 1
        fluxo_caixa.valor = valorNovoDizimo
        sendApi(fluxo_caixa)
    }, [valorNovoDizimo,props.dizimos])

    async function sendApi(fluxo_caixa) {
        const response = await api.post('/fluxocaixa', fluxo_caixa)
        var inserido = response.data
        inserido = {...inserido,  Pagador : { nome : 'Victor Hugo'}};
        inserido = {...inserido,  Receptor : { nome : 'Vitor'}};
        console.log(inserido)
        props.setDizimos([...props.dizimos, inserido])
        props.setModalNovoDizimoShow(false)
        try {
           
        } catch {
            setErro("Ocorreu um erro ao registrar o dízimo.")
        }
        console.log(props.dizimos)
    }

    return (
        <Modal show={props.modalNovoDizimoShow} onHide={() => props.setModalNovoDizimoShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro de dízimo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {erro && <Alert variant='danger'>{erro}</Alert>}
                <Form onSubmit={handleNovoDizimo}>
                    <Form.Group as={Row} controlId="formHorizontalNome">
                        <Form.Label column sm={4}>
                            Valor Devolvido
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control type="number" name="valor" value={valorNovoDizimo} onChange={(e) => setValorNovoDizimo(e.target.value)} />
                        </Col>
                        <Col sm={2}>
                            <Button type='submit'>Inserir!</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setModalNovoDizimoShow(false)}>
                    Fechar
              </Button>

            </Modal.Footer>
        </Modal>
    )
}

export default ModalNovoDizimo