import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.jsx';

import Home from './pages/Home.jsx';
import BooksPage from './pages/BooksPage.jsx';
import BookPage from './pages/BookPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App () {

    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/books' element={<BooksPage />} />
                <Route path='/book/:booktitle' element={<BookPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/logout' element={<LogoutPage />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}