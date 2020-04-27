import {BrowserRouter as Router} from "react-router-dom";
import {HeaderComponent} from "./components/header";
import {AuthContext} from "./context/auth.context";
import {renderRoutes} from 'react-router-config';
import {useAuth} from "./hooks/auth.hook";
import {ROUTES} from "./routes";
import React from 'react';
import './App.css';

function App() {
  const {token, login, logout, userId} = useAuth();
  const isAuth = !!token;
  const renderCustomRoutes = () => {
    return ROUTES.filter(route => route.check ? route.check(isAuth) : true) || []
  };
  return (
    <AuthContext.Provider value={{token, logout, login, userId, isAuth}}>
      <Router>
        <div className="container">
          <HeaderComponent/>
          {renderRoutes(renderCustomRoutes())}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
