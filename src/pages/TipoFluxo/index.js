import React, { useState, useEffect } from 'react'
import { Container, Alert, Button } from 'react-bootstrap';
import api from '../../services/api';
import TabelaTipoFluxo from '../../components/TipoFluxo/TabelaTipoFluxo'
import ModalNovoTipoFluxo from '../../components/TipoFluxo/ModalNovoTipoFluxo'

export default function ExibirDizimos() {

    const [tiposfluxo, setTiposfluxo] = useState([]);
    const [erro, setErro] = useState('');
    const [modalNovoTipoFluxoShow, setModalNovoTipoFluxoShow] = useState(false);

    useEffect(() => {
      
        async function loadApi(link) {
            try {
                const response = await api.get(link)
                setTiposfluxo(response.data.items)
                setErro('') 
            } catch{
                setErro('Erro ao buscar tipos de fluxo!') 
            }        
        }
       
        loadApi('tipofluxo')
    }, [])

    const editarTipoFluxo = tipoFluxo => {
        alert(tipoFluxo)
    }

    const deletarTipoFluxo = tipoFluxo =>{
        alert(tipoFluxo)
    }


    return (
        <Container>
            {erro && <Alert variant='danger'>{erro}</Alert>}
            <TabelaTipoFluxo  editarTipoFluxo={editarTipoFluxo} deletarTipoFluxo={deletarTipoFluxo} tiposfluxo={tiposfluxo} />
            <Button onClick={ () => setModalNovoTipoFluxoShow(true)}> Cadastrar</Button>
            <ModalNovoTipoFluxo modalNovoTipoFluxoShow={modalNovoTipoFluxoShow} setModalNovoTipoFluxoShow={setModalNovoTipoFluxoShow} tiposfluxo={tiposfluxo} setTiposfluxo={setTiposfluxo}/>
        </Container>
    )
}