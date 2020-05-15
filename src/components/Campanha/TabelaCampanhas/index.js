import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { FiTrash, FiEdit } from 'react-icons/fi'

const TabelaCampanhas = props => (

    <div>
        <h1>Campanhas</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Data de Início</th>
                    <th>Data Fim</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.campanhas.length > 0 ? (
                    props.campanhas.map(campanha => (
                        <tr key={campanha.id}>
                            <td>{campanha.id}</td>
                            <td>{campanha.nome}</td>
                            <td>{campanha.descricao}</td>
                            <td>{campanha.dataCriacao}</td>
                            <td>{campanha.detaFim}</td>
                            <td>
                                <Button onClick={() => props.editarCampanha(campanha)} >
                                    <FiEdit />
                                </Button> <span></span> 
                                <Button onClick={() => props.deletarCampanha(campanha)} >
                                    <FiTrash />
                                </Button>
                            </td>
                        </tr>
                    ))) : (
                        <tr><td colSpan={6} align='center' >Não há campanhas cadastradas.</td></tr>
                    )}

            </tbody>
        </Table>
    </div>
)

export default TabelaCampanhas