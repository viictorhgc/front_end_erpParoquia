import React, { useState, useCallback } from 'react'
import { Alert, Form, Col, Row, Button, Modal } from 'react-bootstrap';
import api from '../../../services/api';

const ModalCampanha = props => {

    const [erro, setErro] = useState('')

    const handleCampanha = useCallback((e) => {
        e.preventDefault()

        if (props.campanha.id) {
            async function editarApi() {
                var id = props.campanha.id
                try {
                    const response = await api.put(`/campanha/${id}`, props.campanha)
                    var editado = response.data
                    var arrayCampanhas = props.campanhas.filter(function(fpg) { 
                        return fpg.id !== id
                    })
                    arrayCampanhas.push(editado)
                    props.setCampanhas(arrayCampanhas)
                    props.setModalCampanhaShow(false)
                } catch {
                    setErro("Ocorreu um erro ao editar a campanha.")
                }
            }
            editarApi()
        } else {
            async function salvarApi() {
                try {
                    const response = await api.post('/campanha', props.campanha)
                    var inserido = response.data
                    props.setCampanhas([...props.campanhas, inserido])
                    props.setModalCampanhaShow(false)
                } catch {
                    setErro("Ocorreu um erro ao registrar a campanha.")
                }
            }
            salvarApi()
        }

    }, [props])

    return (
        <Modal show={props.modalCampanhaShow} onHide={() => props.setModalCampanhaShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro de Campanha</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {erro && <Alert variant='danger'>{erro}</Alert>}
                <Form onSubmit={handleCampanha}>
                    <Form.Group as={Row} controlId="formHorizontalNome">
                        <Form.Label column sm={2}>
                            Nome
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="text" name="nome" value={props.campanha.nome}
                                onChange={(e) => props.setCampanha({ ...props.campanha, [e.target.name]: e.target.value })} autoFocus placeholder="Nome" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalDescricao">
                        <Form.Label column sm={2}>
                            Descricao
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="text" name="descricao" value={props.campanha.descricao}
                                onChange={(e) => props.setCampanha({ ...props.campanha, [e.target.name]: e.target.value })} placeholder="Descricao" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalDataCriacao">
                        <Form.Label column sm={2}>
                            DataInicio
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control type="datetime-local" name="dataCriacao" value={props.campanha.dataCriacao}
                                onChange={(e) => props.setCampanha({ ...props.campanha, [e.target.name]: e.target.value })} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalDataFim">
                        <Form.Label column sm={2}>
                            DataFim
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control type="date" name="dataFim" value={props.campanha.dataFim}
                                onChange={(e) => props.setCampanha({ ...props.campanha, [e.target.name]: e.target.value })} />
                        </Col>

                        <Col sm={2}>
                            <Button type='submit'>Inserir!</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setModalCampanhaShow(false)}>
                    Fechar
              </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCampanha