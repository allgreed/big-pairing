import ReactDOM from 'react-dom';

import React from 'react';
import { Formo } from './dynamo/views/concrete/Formo';

import { Text } from './dynamo/views/form/Text';
import { Output } from './dynamo/views/content/Output';
import { Switchable, Switcher } from './dynamo/views/complex/Switcher';

const div = document.createElement('div');

const output = (model: any) => (
    <div>
        <Output value={model.name}>{(value) => `Masz na imię ${value}. `}</Output>
        <Output value={model.surname}>{(value) => `A na nazwisko ${value}. `}</Output>
    </div>
);

const firstComponent: Switchable = (onSubmit, onBack, model) => (
    <Formo valueName={'name'} onSubmit={onSubmit} model={model}>
        {(p, n) => <Text formikProps={p} valueName={n} placeholder={'Twoje imie'} />}
        {output}
    </Formo>
);

const secondComponent: Switchable = (onSubmit, onBack, model) => (
    <Formo valueName={'surname'} onSubmit={onSubmit} model={model}>
        {(p, n) => <Text formikProps={p} valueName={n} placeholder={'Twoje nazwisko'} />}
        {output}
    </Formo>
);

ReactDOM.render(
    <Switcher>
        {firstComponent}
        {secondComponent}
    </Switcher>,
    div
);

document.body.appendChild(div);
