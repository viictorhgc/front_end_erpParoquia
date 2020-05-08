import React, { useState, useEffect, useCallback } from 'react'
import { Container, Table, Alert, Form, Col, Row, Button, Modal } from 'react-bootstrap';
import api from '../../services/api';
import { FcCheckmark, FcCancel } from "react-icons/fc";
import ModalNovoDizimo from '../../components/Dizimo/ModalNovoDizimo'
import TabelaDizimos from '../../components/Dizimo/TabelaDizimos'

export default function ExibirDizimos() {

    const [dizimos, setDizimos] = useState([]);
    const [pessoa, setPessoa] = useState({});
    const [erro, setErro] = useState('');
    const [links, setLinks] = useState({})
    const [modalNovoDizimoShow, setModalNovoDizimoShow] = useState(false);


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


    useEffect(() => {
        loadApi('fluxocaixa/dizimo/pessoa/2')
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


    function handleModalNovoDizimo(status){
        setModalNovoDizimoShow(status)
    }

    const editarDizimo = dizimo  => {
        alert(dizimo)
    }

    const deletarDizimo = dizimo => {
        alert(dizimo)
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
            <TabelaDizimos dizimos={dizimos} editarDizimo={editarDizimo} deletarDizimo={deletarDizimo} />
            <Button onClick={ () => setModalNovoDizimoShow(true)}> Cadastrar</Button>
            <ModalNovoDizimo modalNovoDizimoShow={modalNovoDizimoShow} setModalNovoDizimoShow={setModalNovoDizimoShow} setDizimos={setDizimos} dizimos={dizimos}/>
        </Container>
    )
}