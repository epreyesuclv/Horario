import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Heading } from './layout/Heading';
import { Logout } from './components/Logout';
import { Profesor } from './components/Profesor';
import { CreateHorario } from './components/CreateHorario';
import { CheckHorario } from './components/CheckHorario';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter >
      <Heading></Heading>
      <Routes>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/logout' element={<Logout></Logout>}></Route>
        <Route path='/agregar_profesor' element={<Profesor></Profesor>}></Route>
        <Route path='/agregar_usuario' element={<Usuario></Usuario>}></Route>
        <Route path='/hacer_horario' element={<CreateHorario></CreateHorario>}></Route>
        <Route path='/revisar_horario' element={<CheckHorario></CheckHorario>}></Route>

      <Route path='/'></Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
