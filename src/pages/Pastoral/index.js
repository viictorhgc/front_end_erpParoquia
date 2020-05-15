import React, { useState, useEffect } from 'react'
import { Container, Alert, Button } from 'react-bootstrap';
import api from '../../services/api';
import TabelaPastoral from '../../components/Pastoral/TabelaPastoral'
import ModalNovaPastoral from '../../components/Pastoral/ModalNovaPastoral'

export default function PagePastoral() {

    const [pastorais, setPastorais] = useState([]);
    const [erro, setErro] = useState('');
    const [modalNovaPastoralShow, setModalNovaPastoralShow] = useState(false);

    useEffect(() => {
      
        async function loadApi(link) {
            setErro('') 
            try {
                const response = await api.get(link)
                setPastorais(response.data.items)                
            } catch{
                setErro('Erro ao buscar pastorais!') 
            }        
        }
       
        loadApi('pastoral')
    }, [])

    const editarPastoral = pastoral => {
        alert(pastoral)
    }

    const deletarPastoral = pastoral =>{
        alert(pastoral)
        async function deleteApi(link) {
            try {
                const response = await api.delete(`${link}/${pastoral.id}`)
                setPastorais(pastorais.filter(function(pst) { 
                    return pst.id !== pastoral.id
                }));
                setErro('') 
            } catch{
                setErro('Erro ao apagar o registro!') 
            }        
        }       
        deleteApi('pastoral')
    }


    return (
        <Container>
            {erro && <Alert variant='danger'>{erro}</Alert>}
            <TabelaPastoral  editarPastoral={editarPastoral} deletarPastoral={deletarPastoral} pastorais={pastorais} />
            <Button onClick={ () => setModalNovaPastoralShow(true)}> Cadastrar</Button>
            <ModalNovaPastoral modalNovaPastoralShow={modalNovaPastoralShow} setModalNovaPastoralShow={setModalNovaPastoralShow} pastorais={pastorais} setPastorais={setPastorais}/>
        </Container>
    )
}