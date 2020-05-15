import React, { useState, useCallback } from 'react'
import { Alert, Form, Col, Row, Button, Modal } from 'react-bootstrap';
import api from '../../../services/api';

const ModalNovaFormaPagamento = props => {

    const [novaFormaPagamento, setNovaFormaPagamento] = useState({ nome: ''})
    const [erro, setErro] = useState('')

    const handleNovaFormaPagamento = useCallback((e) => {
        e.preventDefault()

        async function sendApi() {
            try {
                const response = await api.post('/formaspagamento', novaFormaPagamento)
                var inserido = response.data
                props.setFormasPagamento([...props.formasPagamento, inserido])
                props.setModalNovaFormaPagamentoShow(false)
            } catch {
                setErro("Ocorreu um erro ao registrar a forma de pagamento.")
            }
        }

        sendApi()
    }, [novaFormaPagamento, props])

    return (
        <Modal show={props.modalNovaFormaPagamentoShow} onHide={() => props.setModalNovaFormaPagamentoShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastro de Forma de pagamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {erro && <Alert variant='danger'>{erro}</Alert>}
                <Form onSubmit={handleNovaFormaPagamento}>
                    <Form.Group as={Row} controlId="formHorizontalNome">
                        <Form.Label column sm={2}>
                            Nome
                        </Form.Label>
                        <Col sm={6}>
                    <Form.Control type="text" name="nome" value={novaFormaPagamento.nome}
                                onChange={(e) => setNovaFormaPagamento({ ...novaFormaPagamento, [e.target.name]: e.target.value })} autoFocus placeholder="Nome" />
                        </Col>
                        <Col sm={2}>
                            <Button type='submit'>Inserir!</Button>
                        </Col>
                    </Form.Group>                       
                       
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setModalNovaFormaPagamentoShow(false)}>
                    Fechar
              </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalNovaFormaPagamento