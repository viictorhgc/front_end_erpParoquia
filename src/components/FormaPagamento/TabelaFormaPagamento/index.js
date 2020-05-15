import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { FiTrash, FiEdit } from 'react-icons/fi'

const TabelaFormaPagamento = props => (

    <div>
        <h1>Formas de pagamento</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.formasPagamento.length > 0 ? (
                    props.formasPagamento.map(formaPagamento => (
                        <tr key={formaPagamento.id}>
                            <td>{formaPagamento.id}</td>
                            <td>{formaPagamento.nome}</td>
                            <td>
                                <Button onClick={() => props.editarFormaPagamento(formaPagamento)} >
                                    <FiEdit />
                                </Button> <span></span> 
                                <Button onClick={() => props.deletarFormaPagamento(formaPagamento)} >
                                    <FiTrash />
                                </Button>
                            </td>
                        </tr>
                    ))) : (
                        <tr><td colSpan={3} align='center' >Não há formas de pagamento cadastradas.</td></tr>
                    )}

            </tbody>
        </Table>
    </div>
)

export default TabelaFormaPagamento