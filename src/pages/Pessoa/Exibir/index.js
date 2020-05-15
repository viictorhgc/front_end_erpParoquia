import React, { useState, useEffect } from 'react'
import { Container, Alert, Button } from 'react-bootstrap';
import api from '../../../services/api';
import TabelaPessoas from '../../../components/Pessoa/TabelaPessoas';
import Pessoa from '../../../components/Pessoa/';

export default function ExibirPessoas() {

    const [pessoas, setPessoas] = useState([]);
    const [erro, setErro] = useState('');
    const [pessoa, setPessoa] = useState({});
    const [links, setLinks] = useState({});
    const [modalPessoaShow, setModalPessoaShow] = useState(false);


    useEffect(() => {

        async function loadApi(link) {
            try {
                const response = await api.get(link)
                setPessoas(response.data.items)
                setLinks(response.data._links)
            } catch {
                setErro('Erro ao carregar pessoas!')
            }
        }
        loadApi('pessoa')

    }, [])

    function handleMudaPagina(link) {

        async function loadApi(link) {
            try {
                const response = await api.get(link)
                setPessoas(response.data.items)
                setLinks(response.data._links)
            } catch {
                setErro('Erro ao carregar pessoas!')
            }
        }
        loadApi(link)
    }

    const editarPessoa = pessoa => {
        alert(pessoa)
    }

    const deletarPessoa = pessoa => {
        alert(pessoa)
    }

    const atualizarPessoa = pessoa => {
        setPessoas([pessoa])
    }

    return (
        <Container>
            {erro && <Alert variant='danger'>{erro}</Alert>}
            <Pessoa pessoa={pessoa} setPessoa={atualizarPessoa}></Pessoa>            
            <TabelaPessoas pessoas={pessoas} editarPessoa={editarPessoa} deletarPessoa={deletarPessoa} handleMudaPagina={handleMudaPagina} ></TabelaPessoas>
            <Button onClick={ () => setModalPessoaShow(true)}> Cadastrar</Button>
        </Container>
    )
}





