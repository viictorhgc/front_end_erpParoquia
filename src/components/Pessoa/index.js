import React, { useState, useCallback } from 'react'
import { Alert, Form, Col, Row, Button, Container } from 'react-bootstrap';
import api from '../../services/api';
import ModalConfirmaPessoa from './ModalConfirmaPessoa';

const Pesssoa = props => {

    const [pesquisaPessoa, setPesquisaPessoa] = useState({ nome: '', cpf: '' })
    const [erro, setErro] = useState('')
    const [pessoas, setPessoas] = useState([])
    const [modalConfirmaPessoaShow, setModalConfirmaPessoaShow] = useState(false)

    const escolherPessoa = id => {
        setModalConfirmaPessoaShow(false)
        pessoas.map(pessoa => {
            if (pessoa.id === id) {
                console.log(pessoa)
                props.setPessoa(pessoa)
            }
            return true
        })
    }

    const handlePesquisaPessoa = useCallback((e) => {
        async function loadApi(pesquisaPorCPF) {
            if (pesquisaPorCPF) {
                try {
                    const response = await api.get(`/pessoa/cpf/${pesquisaPessoa.cpf}`)
                    props.setPessoa(response.data)
                } catch (e) {
                    props.setPessoa(undefined)
                    setErro("Ocorreu um erro ao buscar a pessoa.")
                }
            } else {
                try {
                    const response = await api.get(`/pessoa/nome/${pesquisaPessoa.nome}`)
                    setPessoas(response.data.items)
                    setModalConfirmaPessoaShow(true)
                } catch (e) {
                    props.setPessoa(undefined)
                    setErro("Ocorreu um erro ao buscar a pessoa.")
                }
            }
        }

        e.preventDefault()
        if ((pesquisaPessoa.nome === '' && pesquisaPessoa.cpf === '')) {
            setErro('Favor preencher um dos campos!')
        } else if (pesquisaPessoa.nome !== '' && pesquisaPessoa.cpf !== '') {
            setErro('Favor preencher apenas um dos campos!')
        } else {
            setErro('')
            if (pesquisaPessoa.nome === '') {
                loadApi(true)
            } else {
                loadApi(false)
            }
        }
    }, [pesquisaPessoa,  props])



    return (
        <Container>
            <h1>Buscar Pessoa</h1>
            {erro && <Alert variant='danger'>{erro}</Alert>}
            <Form onSubmit={handlePesquisaPessoa}>
                <Form.Group as={Row} controlId="formHorizontalNome">
                    <Form.Label column sm={2}>
                        Nome
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" name="nome" value={pesquisaPessoa.nome} onChange={(e) => setPesquisaPessoa({ ...pesquisaPessoa, [e.target.name]: e.target.value })} autoFocus placeholder="Nome Sobrenome" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalCpf">
                    <Form.Label column sm={2}>
                        CPF
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" name="cpf" value={pesquisaPessoa.cpf} onChange={(e) => setPesquisaPessoa({ ...pesquisaPessoa, [e.target.name]: e.target.value })} placeholder="000.000.000-00" />
                    </Col>
                    <Col sm={2}>
                        <Button type='submit'>Pesquisar!</Button>
                    </Col>
                </Form.Group>
            </Form>
            <ModalConfirmaPessoa modalConfirmaPessoaShow={modalConfirmaPessoaShow} setModalConfirmaPessoaShow={setModalConfirmaPessoaShow} escolherPessoa={escolherPessoa} pessoas={pessoas}></ModalConfirmaPessoa>
        </Container>
    )
}

export default Pesssoa