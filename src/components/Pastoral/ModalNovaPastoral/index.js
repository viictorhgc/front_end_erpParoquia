import React, { useState, useCallback } from 'react'
import { Alert, Form, Col, Row, Button, Modal } from 'react-bootstrap';
import api from '../../../services/api';

const ModalNovaPastoral = props => {

    const [novaPastoral, setNovaPastoral] = useState({ nome: '', descricao: '', dataCriacao: '', ativo: 0 })
    const [erro, setErro] = useState('')

    const handlenovaPastoral = useCallback((e) => {
        e.preventDefault()

        async function sendApi() {
            try {
                const response = await api.post('/pastoral', novaPastoral)
                var inserido = response.data
                props.setPastorais([...props.pastorais, inserido])
                props.setModalNovaPastoralShow(false)
            } catch {
                setErro("Ocorreu um erro ao cadastrar a pastoral.")
            }
        }

        sendApi()
    }, [novaPastoral, props])

    return (
        <Modal show={props.modalNovaPastoralShow} onHide={() => props.setModalNovaPastoralShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro de Pastoral</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {erro && <Alert variant='danger'>{erro}</Alert>}
                <Form onSubmit={handlenovaPastoral}>
                    <Form.Group as={Row} controlId="formHorizontalNome">
                        <Form.Label column sm={2}>
                            Nome
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control type="text" name="nome" value={novaPastoral.nome}
                                onChange={(e) => setNovaPastoral({ ...novaPastoral, [e.target.name]: e.target.value })} autoFocus placeholder="Nome" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalDescricao">
                        <Form.Label column sm={2}>
                            Descrição
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control type="text" name="descricao" value={novaPastoral.descricao}
                                onChange={(e) => setNovaPastoral({ ...novaPastoral, [e.target.name]: e.target.value })}  placeholder="Descrição" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalDataCriacao">
                        <Form.Label column sm={2}>
                            Data de criação
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control type="date" name="dataCriacao" value={novaPastoral.dataCriacao}
                                onChange={(e) => setNovaPastoral({ ...novaPastoral, [e.target.name]: e.target.value })}  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalAtivo">
                        <Form.Label column sm={2}>
                            Ativo?
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control type="number" name="ativo" value={novaPastoral.ativo}
                                onChange={(e) => setNovaPastoral({ ...novaPastoral, [e.target.name]: e.target.value })}  />
                        </Col>
                        <Col sm={2}>
                            <Button type='submit'>Inserir!</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setModalNovaPastoralShow(false)}>
                    Fechar
              </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalNovaPastoral