import React from "react";
import {  Route, Switch, Redirect } from "react-router-dom";
import Login from './pages/Pessoa/Login'
import { isAuthenticated } from "./services/auth";
import Pessoa from './pages/Pessoa/Exibir'
import PessoaCadastro from './pages/Pessoa/Cadastrar'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Pessoa/Logout'
import ExibirDizimos from './pages/Dizimo'
import PageTipoFluxo from './pages/TipoFluxo/'
import PageFormaPagamento from './pages/FormaPagamento'
import PagePastoral from "./pages/Pastoral";
import PageCampanha from "./pages/Campanha";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (  
  
    <Switch>
      <Route exact path="/"  component={ isAuthenticated () ? Dashboard : Login} />
      <Route exact path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/pessoa" component={Pessoa} />
      <Route path="/pessoa/cadastro" component={PessoaCadastro} />
      <Route path="/dizimo" component={ExibirDizimos} />
      <Route path="/tipofluxo" component={PageTipoFluxo} />
      <Route path="/formaPagamento" component={PageFormaPagamento} />
      <Route path="/campanha" component={PageCampanha} />
      <Route path="/pastoral" component={PagePastoral} />
      <Route path="/Logout" component={Logout} />
      <PrivateRoute path="/app" component={() => <h1>App</h1>} />
      <Route path="*" component={() => <h1>Todos os caminhos levam a Roma, menos este aqui...</h1>} />
    </Switch>


);

export default Routes;