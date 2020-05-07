import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import api from "../../../services/api";
import { login } from "../../../services/auth";
import { Container, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'

function Pessoa (props) {

  const [nome, alteraNome] = useState('')
  const [email, alteraEmail] = useState('')
  const [dataNascimento, alteraDataNascimento] = useState('')
  const [endereco, alteraEndereco] = useState('');
  const [telefone, alteraTelefone] = useState('')
  const [senha, alteraSenha] = useState('')
  const [podeLogar, alteraPodeLogar] = useState(0)
  const [erro, alteraErro] = useState('')
  const [loading, alteraLoading] = useState(false)

  const handleCadastrarUsuario = useCallback((e) => {
    e.preventDefault();
    
    var cadastrado = false;
    async function enviar() {
        alteraLoading(true)
      try {
        var podeLogarInt = String(Number(podeLogar))
        const response = await api.post("/pessoa", { nome, email, senha , dataNascimento, endereco, telefone, podelogar: podeLogarInt });
        login(response.data.accessToken);
        cadastrado = true;
      } catch (err) {
        alteraErro("Houve um problema com o login, verifique suas credenciais.")
      } finally {
        alteraLoading(false)
      }
      if (cadastrado){
        props.history.push("/dashboard");
      }
    }

    if (!email || !senha) {
      alteraErro("Preencha e-mail e senha para continuar!");
    } else {
      enviar()
    }
    
  }, [nome, email, dataNascimento, endereco, telefone, senha, podeLogar, props]);

  return (
    <Container>
      <h1>Pessoa</h1>
      {erro && <Alert variant='danger'>{erro}</Alert>}
      <Form onSubmit={handleCadastrarUsuario}>

      <Form.Group as={Row} controlId="formHorizontalNome">
          <Form.Label column sm={2}>
            Nome
            </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="nome" value={nome} onChange={(e) => alteraNome(e.target.value)} autoFocus placeholder="Nome Sobrenome" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
            </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" name="email" value={email} onChange={(e) => alteraEmail(e.target.value)}  placeholder="name@example.com" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalDataNascimento">
          <Form.Label column sm={2}>
            Data de Nascimento
            </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" name="dataNascimento" value={dataNascimento} onChange={(e) => alteraDataNascimento(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEndereco">
          <Form.Label column sm={2}>
            Endereço
            </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="endereco" value={endereco} onChange={(e) => alteraEndereco(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalTelefone">
          <Form.Label column sm={2}>
            Telefone
            </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" name="telefone" value={telefone} onChange={(e) => alteraTelefone(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalSenha">
          <Form.Label column sm={2}>
            Senha
            </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" name="senha" value={senha} onChange={(e) => alteraSenha(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPodeLogar">
          <Form.Label column sm={2}>
            Pode logar?
            </Form.Label>
          <Col sm={10}>
            <Form.Control type="checkbox" name="podeLogar" defaultChecked={false} onChange={(e) => alteraPodeLogar(!podeLogar)} />
          </Col>
        </Form.Group>
     
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">{loading ? <Spinner animation="border" /> : 'Cadastrar!'}</Button>
          </Col>
        </Form.Group>
      </Form>


    </Container>
  );

}

export default withRouter(Pessoa);