import React, { useState, useEffect, useCallback } from 'react'
import { Container, Table, Alert, Form, Col, Row, Button, Modal } from 'react-bootstrap';
import api from '../../services/api';
import { FcCheckmark, FcCancel } from "react-icons/fc";

export default function ExibirDizimos() {

    const [dizimos, setDizimos] = useState([]);
    const [pessoa, setPessoa] = useState({});
    const [erro, setErro] = useState('');
    const [links, setLinks] = useState({})
    const [modalNovoDizimoShow, setModalNovoDizimoShow] = useState(false);
    const [valorNovoDizimo, setValorNovoDizimo] = useState(0)


    /*
        async function loadApi(link) {
            
            const response = await api.get(link)
            setPessoas(response.data.items)
            setLinks(response.data._links)
            console.log(response.data)
        }
    
        const handleBuscaPessoa = useCallback((e) => {
            e.preventDefault();
            async function loadApi() {
                const response = await api.get('pessoa')
                setPessoas([response.data.items])
                console.log(response.data)
            }
            loadApi()
        }, [pessoa])
        */

    const handleBuscaPessoa = useCallback((e) => {
        e.preventDefault();

    }, [pessoa])

    function handleMudaPagina(link) {
        //loadApi(link)
    }


    function handleModalNovoDizimo(status) {
        setModalNovoDizimoShow(status)
    }

    useEffect(() => {
        loadApi('fluxocaixa/dizimo/pessoa/1')
    }, [])

    async function loadApi(link) {
        const response = await api.get(link)
        setDizimos(response.data.items)
        setLinks(response.data._links)
        console.log(response.data)
    }

    const handleBuscaDizimos = useCallback((e) => {
        e.preventDefault();
        async function loadApi() {
            const response = await api.get('fluxocaixa/dizimo/pessoa/1')
            setDizimos([response.data.items])
            console.log(response.data)
        }
        loadApi()
    }, [pessoa])

    const handleNovoDizimo = {

    }

    return (
        <Container>

            <h1>Buscar Pessoa</h1>
            {erro && <Alert variant='danger'>{erro}</Alert>}
            <Form onSubmit={handleBuscaPessoa}>

                <Form.Group as={Row} controlId="formHorizontalNome">

                    <Form.Label column sm={2}>
                        Nome
                        </Form.Label>
                    <Col sm={4}>
                        <Form.Control type="text" name="nome" value={pessoa.nome} onChange={(e) => setPessoa(e.target.value)} autoFocus placeholder="Nome Sobrenome" />
                    </Col>
                    <Col sm={2}>
                        <Button type='submit'>Pesquisar!</Button>
                    </Col>
                </Form.Group>
            </Form>
            {dizimos &&
                <div>
                    <h1>Dizimos da pessoa</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Data Pagamento</th>
                                <th>Pagador</th>
                                <th>Funcionário Receptor</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dizimos.map(dizimo => (
                                <tr key={dizimo.id}>
                                    <td>{dizimo.data_efetivacao}</td>
                                    <td>{dizimo.Pagador.nome}</td>
                                    <td>{dizimo.Receptor.nome}</td>
                                    <td>{dizimo.valor}</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    {links.previous && <Button onClick={() => handleMudaPagina(links.previous)}>Página Anterior</Button>}
                    {links.next && <Button onClick={() => handleMudaPagina(links.next)}>Próxima Página</Button>}
                    {pessoa && <Button onClick={() => handleModalNovoDizimo(true)}>Cadastrar Dízimo</Button>}
                </div>
            }
            <Modal show={modalNovoDizimoShow} onHide={() => handleModalNovoDizimo(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de dízimo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleNovoDizimo}>
                        <Form.Group as={Row} controlId="formHorizontalNome">
                            <Form.Label column sm={4}>
                                Valor Devolvido
                        </Form.Label>
                            <Col sm={4}>
                                <Form.Control type="number" name="valor" value={valorNovoDizimo} onChange={(e) => setValorNovoDizimo(e.target.value)}  />
                            </Col>
                            <Col sm={2}>
                                <Button type='submit'>Inserir!</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleModalNovoDizimo(false)}>
                        Fechar
              </Button>
                  
                </Modal.Footer>
            </Modal>
        </Container>
    )
}