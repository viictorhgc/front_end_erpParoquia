import React from 'react'
import { Table, Button, Modal } from 'react-bootstrap';

const ModalConfirmaPessoa = props => {

    return (
        <div>            
            <Modal show={props.modalConfirmaPessoaShow} onHide={() => props.setModalConfirmaPessoaShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar pessoa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>CPF</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.pessoas ? (
                                props.pessoas.map(pessoas => (
                                    <tr key={pessoas.id}>
                                        <td>{pessoas.cpf}</td>
                                        <td>{pessoas.nome}</td>
                                        <td>{pessoas.telefone}</td>
                                        <td>
                                            <Button onClick={() => props.escolherPessoa(pessoas.id)} >
                                                Escolher!
                                </Button>
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr><td colSpan={3} align='center' >Pessoa não encontrada</td></tr>
                                )}

                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setModalConfirmaPessoaShow(false)}>
                        Fechar
              </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalConfirmaPessoa