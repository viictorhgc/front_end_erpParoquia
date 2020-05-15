import React, { useState, useEffect } from 'react'
import { Container, Alert, Button } from 'react-bootstrap';
import api from '../../services/api';
import TabelaCampanhas from '../../components/Campanha/TabelaCampanhas';
import ModalCampanha from '../../components/Campanha/ModalCampanha';

export default function PageCampanha() {

    const [campanha, setCampanha] = useState({ nome: '', descricao: '', dataCriacao: '', detaFim: ''})
    const [campanhas, setCampanhas] = useState([]);
    const [erro, setErro] = useState('');
    const [modalCampanhaShow, setModalCampanhaShow] = useState(false);

    useEffect(() => {
      
        async function loadApi(link) {
            try {
                const response = await api.get(link)
                setCampanhas(response.data.items)
                setErro('') 
            } catch{
                setErro('Erro ao buscar as campanhas!') 
            }        
        }
       
        loadApi('campanha')
    }, [])

    const editarCampanha = campanha => {
        setCampanha(campanha)
        setModalCampanhaShow(true)
    }

    const deletarCampanha = campanha =>{
        async function deletarApi(link) {
            try {
                const response = await api.delete(`${link}/${campanha.id}`)
                setCampanhas(campanhas.filter(function(fpg) { 
                    return fpg.id !== campanha.id
                }));
                setErro('') 
            } catch{
                setErro('Erro ao apagar o registro!') 
            }        
        }       
        deletarApi('campanha')
    }

    const handleBotaoNovaCampanha = () => {
        setCampanha({})
        setModalCampanhaShow(true)
    }

    return (
        <Container>
            {erro && <Alert variant='danger'>{erro}</Alert>}
            <TabelaCampanhas  editarCampanha={editarCampanha} deletarCampanha={deletarCampanha} campanhas={campanhas} />            
            <Button onClick={handleBotaoNovaCampanha}> Cadastrar</Button>            
            <ModalCampanha modalCampanhaShow={modalCampanhaShow} setModalCampanhaShow={setModalCampanhaShow} campanha={campanha} setCampanha={setCampanha} campanhas={campanhas} setCampanhas={setCampanhas}/>
            </Container>
    )
}