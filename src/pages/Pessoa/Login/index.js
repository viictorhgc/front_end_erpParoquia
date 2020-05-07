import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import api from "../../../services/api";
import { login } from "../../../services/auth";
import { Container, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'


function Login(props) {

  const [email, alteraEmail] = useState('')
  const [senha, alteraSenha] = useState('')
  const [loading, setLoading] = useState(false);
  const [erro, alteraErro] = useState('')


  const handleLogin = useCallback((e) => {
    e.preventDefault();

    var logado = false;
    async function logar() {
      setLoading(true)
      try {
        const response = await api.post("/autenticar", { email, senha });
        login(response.data.accessToken,response.data.email);
        logado = true;
      } catch (err) {
        alteraErro("Houve um problema com o login, verifique suas credenciais.")
      } finally {
        setLoading(false)
      }
      if (logado){
        props.history.push("/dashboard");
      }
    }

    if (!email || !senha) {
      alteraErro("Preencha e-mail e senha para continuar!");
    } else {
      logar()
    }

  }, [email, senha, props]);


  return (
    <Container>
      <h1>Logar</h1>
      {erro && <Alert variant='danger'>{erro}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
            </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" name="email" value={email} onChange={(e) => alteraEmail(e.target.value)} autoFocus placeholder="name@example.com" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Senha
             </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" name="senha" autoComplete="off" value={senha} onChange={(e) => alteraSenha(e.target.value)} />
          </Col>
        </Form.Group>


        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">{loading ? <Spinner animation="border" /> : 'Entrar!'}</Button>
          </Col>
        </Form.Group>
      </Form>


    </Container>
  );

}

export default withRouter(Login)