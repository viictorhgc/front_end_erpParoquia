import React, { useState, useCallback } from 'react'
import { Alert, Form, Col, Row, Button, Modal } from 'react-bootstrap';
import api from '../../../services/api';

const ModalNovoTipoFluxo = props => {

    const [novoTipoFluxo, setNovoTipoFluxo] = useState({ nome: '', descricao: '' })
    const [erro, setErro] = useState('')

    const handleNovoTipoFluxo = useCallback((e) => {
        e.preventDefault()

        async function sendApi() {
            try {
                const response = await api.post('/tipofluxo', novoTipoFluxo)
                var inserido = response.data
                props.setTiposfluxo([...props.tiposfluxo, inserido])
                props.setModalNovoTipoFluxoShow(false)
            } catch {
                setErro("Ocorreu um erro ao registrar o dízimo.")
            }
        }

        sendApi()
    }, [novoTipoFluxo, props])

    return (
        <Modal show={props.modalNovoTipoFluxoShow} onHide={() => props.setModalNovoTipoFluxoShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro de Tipo de Fluxo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {erro && <Alert variant='danger'>{erro}</Alert>}
                <Form onSubmit={handleNovoTipoFluxo}>
                    <Form.Group as={Row} controlId="formHorizontalNome">
                        <Form.Label column sm={2}>
                            Nome
                        </Form.Label>
                        <Col sm={4}>
                    <Form.Control type="text" name="nome" value={novoTipoFluxo.nome}
                                onChange={(e) => setNovoTipoFluxo({ ...novoTipoFluxo, [e.target.name]: e.target.value })} autoFocus placeholder="Nome" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalDescricao">
                        <Form.Label column sm={2}>
                            Descricao
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control type="text" name="descricao" value={novoTipoFluxo.descricao}
                                onChange={(e) => setNovoTipoFluxo({ ...novoTipoFluxo, [e.target.name]: e.target.value })} autoFocus placeholder="Descricao" />
                        </Col>
                        <Col sm={2}>
                            <Button type='submit'>Inserir!</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setModalNovoTipoFluxoShow(false)}>
                    Fechar
              </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalNovoTipoFluxo