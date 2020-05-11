import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { FiTrash, FiEdit } from 'react-icons/fi'

const TabelaTiposFluxo = props => (

    <div>
        <h1>Tipos de Fluxo</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.tiposfluxo.length > 0 ? (
                    props.tiposfluxo.map(tipoFluxo => (
                        <tr key={tipoFluxo.id}>
                            <td>{tipoFluxo.id}</td>
                            <td>{tipoFluxo.nome}</td>
                            <td>{tipoFluxo.descricao}</td>
                            <td>
                                <Button onClick={() => props.editarTipoFluxo(tipoFluxo)} >
                                    <FiEdit />
                                </Button> <span></span> 
                                <Button onClick={() => props.deletarTipoFluxo(tipoFluxo)} >
                                    <FiTrash />
                                </Button>
                            </td>
                        </tr>
                    ))) : (
                        <tr><td colSpan={3} align='center' >Não há tipos de fluxos cadastrados.</td></tr>
                    )}

            </tbody>
        </Table>
    </div>
)

export default TabelaTiposFluxo