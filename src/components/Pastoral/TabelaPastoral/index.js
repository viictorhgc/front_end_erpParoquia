import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { FiTrash, FiEdit } from 'react-icons/fi'

const TabelaPastoral = props => (

    <div>
        <h1>Pastorais</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Data criação</th>
                    <th>Ativo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.pastorais.length > 0 ? (
                    props.pastorais.map(pastoral => (
                        <tr key={pastoral.id}>
                            <td>{pastoral.id}</td>
                            <td>{pastoral.nome}</td>
                            <td>{pastoral.descricao}</td>
                            <td>{pastoral.dataCriacao}</td>
                            <td>{pastoral.ativo}</td>
                            <td>
                                <Button onClick={() => props.editarPastoral(pastoral)} >
                                    <FiEdit />
                                </Button> <span></span> 
                                <Button onClick={() => props.deletarPastoral(pastoral)} >
                                    <FiTrash />
                                </Button>
                            </td>
                        </tr>
                    ))) : (
                        <tr><td colSpan={6} align='center' >Não há pastorais cadastradas.</td></tr>
                    )}

            </tbody>
        </Table>
    </div>
)

export default TabelaPastoral
