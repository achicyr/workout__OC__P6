
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components'
import './assets/scss/index.scss';
import Home from './pages/Home';
import SignIns from './pages/SignIns';
import Sauces from './pages/Sauces';
import NewSauce from './pages/NewSauce';
import Header from './components/Header'
import Nav from './components/Nav'
import Aside from './components/Aside'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './utils/auth'
//import reportWebVitals from './reportWebVitals';

const MainStyled = styled.main`
	padding: 2em 4em;
`
 
const token=false

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
			<Header />
			{/* <Nav /> */}
			<MainStyled>
				<Routes>	
					<Route path="/" element={<Navigate replace to="/login" />}></Route>
					<Route path="/signup" element={<SignIns />}></Route>
					<Route path="/login" element={<SignIns/>}></Route>
					<Route path="/logout" element={<SignIns />}></Route>
					<Route path="/sauces" element={<Sauces />}></Route>
					<Route path="/new-sauce" element={<NewSauce />}></Route>
					<Route path="*" element={<Navigate replace to="/login" />}></Route>
				</Routes>
			</MainStyled>
			{/* <Aside />
			<Footer /> */}
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);

