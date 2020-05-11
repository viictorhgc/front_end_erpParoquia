import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { FiTrash, FiEdit } from 'react-icons/fi'

const TabelaDizimos = props => (

    <div>
        <h1>Dizimos da pessoa</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Data Pagamento</th>
                    <th>Pagador</th>
                    <th>Funcionário Receptor</th>
                    <th>Forma de Pagamento</th>
                    <th>Valor</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.dizimos.length > 0 ? (
                    props.dizimos.map(dizimo => (
                        <tr key={dizimo.id}>
                            <td>{dizimo.data_efetivacao}</td>
                            <td>{dizimo.Pagador.nome}</td>
                            <td>{dizimo.Receptor.nome}</td>
                            <td>{dizimo.FormasPagamento.nome}</td>
                            <td>{dizimo.valor}</td>
                            <td>
                                <Button onClick={() => props.editarDizimo(dizimo)} >
                                    <FiEdit />
                                </Button> <span></span> 
                                <Button onClick={() => props.deletarDizimo(dizimo)} >
                                    <FiTrash />
                                </Button>
                            </td>
                        </tr>
                    ))) : (
                        <tr><td colSpan={5} align='center' >Pessoa não devolveu dízimos</td></tr>
                    )}

            </tbody>
        </Table>
    </div>
)

export default TabelaDizimos