import React, { useState, useEffect, useCallback } from 'react'
import { Container, Table, Alert, Form, Col, Row, Button } from 'react-bootstrap';
import api from '../../../services/api';
import { FcCheckmark, FcCancel } from "react-icons/fc";

export default function ExibirPessoas() {

    const [pessoas, setPessoas] = useState([]);
    const [erro, setErro] = useState('');
    const [pessoa, setPessoa] = useState({});
    const [links, setLinks] = useState({})



    useEffect(() => {
        loadApi('pessoa')
    }, [])

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

    function handleMudaPagina (link) {
        loadApi(link)
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

            <h1>Pessoas cadastradas</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>E-mail</th>
                        <th>Nome</th>
                        <th>DataNascimento</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>PodeLogar</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map(pessoa => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.id}</td>
                            <td>{pessoa.email}</td>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.dataNascimento}</td>
                            <td>{pessoa.endereco}</td>
                            <td>{pessoa.telefone}</td>
                            <td>{pessoa.podeLogar === 1 ? <FcCheckmark /> : <FcCancel />}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
                    { links.previous  && <Button onClick={() => handleMudaPagina(links.previous)}>Página Anterior</Button> }
                    { links.next  && <Button onClick={() => handleMudaPagina(links.next)}>Próxima Página</Button> }
        </Container>
    )
}