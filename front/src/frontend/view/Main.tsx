import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { RegisterForm } from './register/RegisterForm';

export function Main(props: {}) {
    return (
        <Router>
            <RegisterForm />
        </Router>
    );
}
