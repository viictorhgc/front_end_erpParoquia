import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { FcCheckmark, FcCancel } from 'react-icons/fc'

const TabelaPessoas = props => (

    <div>
        <h1>Pessoas cadastradas</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>E-mail</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Sexo</th>
                    <th>DataNascimento</th>
                    <th>Endereço</th>
                    <th>Telefone</th>
                    <th>PodeLogar</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.pessoas.map(pessoa => (
                    <tr key={pessoa.id}>
                        <td>{pessoa.id}</td>
                        <td>{pessoa.email}</td>
                        <td>{pessoa.cpf}</td>
                        <td>{pessoa.sexo}</td>
                        <td>{pessoa.nome}</td>
                        <td>{pessoa.dataNascimento}</td>
                        <td>{pessoa.endereco}</td>
                        <td>{pessoa.telefone}</td>
                        <td>{pessoa.podeLogar === 1 ? <FcCheckmark /> : <FcCancel />}</td>
                        <td>
                            <Button onClick={() => props.editarPessoa(pessoa)} >
                                <FiEdit />
                            </Button> <span></span>
                            <Button onClick={() => props.deletarPessoa(pessoa)} >
                                <FiTrash />
                            </Button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </Table>
        {props.links && <div>
            {props.links.previous && <Button onClick={() => props.handleMudaPagina(props.links.previous)}>Página Anterior</Button>}
            {props.links.next && <Button onClick={() => props.handleMudaPagina(props.links.next)}>Próxima Página</Button>}
        </div>
        }
    </div>
)

export default TabelaPessoas