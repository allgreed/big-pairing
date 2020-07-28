import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import { RegisterForm } from './register/RegisterForm';

export function Main(props: {}) {
    return (
        <Router basename={'/'}>
            <Route path={'/'}>
                <RegisterForm />
            </Route>
        </Router>
    );
}
