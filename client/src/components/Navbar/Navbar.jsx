import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function Navbar () {

    return(
        <nav>
           <Link to='/'>Home</Link>
           <Link to='/books'>Books</Link>
           <Link to='/register'>Sign up</Link>
           <Link to='/login'>Log in</Link>
           <Link to='/logot'>Log out</Link>
        </nav>
    );
}