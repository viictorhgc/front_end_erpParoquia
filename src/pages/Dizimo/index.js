import React, { useState, useEffect } from 'react'
import { Container, Alert, Button } from 'react-bootstrap';
import api from '../../services/api';
import ModalNovoDizimo from '../../components/Dizimo/ModalNovoDizimo'
import TabelaDizimos from '../../components/Dizimo/TabelaDizimos'
import Pessoa from '../../components/Pessoa'

export default function ExibirDizimos() {

    const [dizimos, setDizimos] = useState([]);
    const [pessoa, setPessoa] = useState();
    const [erro, setErro] = useState('');
    const [modalNovoDizimoShow, setModalNovoDizimoShow] = useState(false);

    useEffect(() => {
        if(pessoa){
            loadApi(`fluxocaixa/dizimo/pessoa/${pessoa.id}`)
        }    
       
    }, [pessoa])

    async function loadApi(link) {
        try {
            const response = await api.get(link)
            setDizimos(response.data.items)
            setErro('') 
        } catch{
            setErro('Erro ao buscar dízimos!') 
        }        
    }

    const editarDizimo = dizimo  => {
        alert(dizimo)
    }

    const deletarDizimo = dizimo => {
        alert(dizimo)
    }

    return (
        <Container>
            <Pessoa pessoa={pessoa} setPessoa={setPessoa}/>
            {erro && <Alert variant='danger'>{erro}</Alert>}
            {pessoa &&
                <div>
                    <TabelaDizimos dizimos={dizimos} editarDizimo={editarDizimo} deletarDizimo={deletarDizimo} />
                    <Button onClick={ () => setModalNovoDizimoShow(true)}> Cadastrar</Button>
                    <ModalNovoDizimo pessoa={pessoa} modalNovoDizimoShow={modalNovoDizimoShow} setModalNovoDizimoShow={setModalNovoDizimoShow} setDizimos={setDizimos} dizimos={dizimos}/>
                </div>
            }
        </Container>
    )
}