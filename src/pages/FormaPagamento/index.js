import React, { useState, useEffect } from 'react'
import { Container, Alert, Button } from 'react-bootstrap';
import api from '../../services/api';
import TabelaFormaPagamento from '../../components/FormaPagamento/TabelaFormaPagamento';
import ModalNovaFormaPagamento from '../../components/FormaPagamento/ModalNovaFormaPagamento';

export default function PageFormaPagamento() {

    const [formasPagamento, setFormasPagamento] = useState([]);
    const [erro, setErro] = useState('');
    const [modalNovaFormaPagamentoShow, setModalNovaFormaPagamentoShow] = useState(false);

    useEffect(() => {
      
        async function loadApi(link) {
            try {
                const response = await api.get(link)
                setFormasPagamento(response.data.items)
                setErro('') 
            } catch{
                setErro('Erro ao buscar tipos de fluxo!') 
            }        
        }
       
        loadApi('formaspagamento')
    }, [])

    const editarFormaPagamento = formaPagamento => {
        alert(formaPagamento)
    }

    const deletarFormaPagamento = formaPagamento =>{
        async function loadApi(link) {
            try {
                const response = await api.delete(`${link}/${formaPagamento.id}`)
                setFormasPagamento(formasPagamento.filter(function(fpg) { 
                    return fpg.id !== formaPagamento.id
                }));
                setErro('') 
            } catch{
                setErro('Erro ao apagar o registro!') 
            }        
        }       
        loadApi('formaspagamento')
    }


    return (
        <Container>
            {erro && <Alert variant='danger'>{erro}</Alert>}
            <TabelaFormaPagamento  editarFormaPagamento={editarFormaPagamento} deletarFormaPagamento={deletarFormaPagamento} formasPagamento={formasPagamento} />            
            <Button onClick={ () => setModalNovaFormaPagamentoShow(true)}> Cadastrar</Button>            
            <ModalNovaFormaPagamento modalNovaFormaPagamentoShow={modalNovaFormaPagamentoShow} setModalNovaFormaPagamentoShow={setModalNovaFormaPagamentoShow} formasPagamento={formasPagamento} setFormasPagamento={setFormasPagamento}/>
            </Container>
    )
}