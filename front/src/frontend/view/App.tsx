import ReactDOM from 'react-dom';

import React from 'react';
import { Formo, getFormo } from './dynamo/views/concrete/Formo';

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

//<Formo>
//{(formik) => <Text formikProps=formik placeholder='gowno'>}
//{output}
//</Formo>

const firstComponent: Switchable = (onSubmit, onBack, model) =>
    getFormo(
        (props) => Text({ formikProps: props, placeholder: 'Twoje imie' }),
        output,
        model,
        'name',
        onSubmit
    );

const secondComponent: Switchable = (onSubmit, onBack, model) =>
    getFormo(
        (props) => Text({ formikProps: props, placeholder: 'Twoje nazwio' }),
        output,
        model,
        'surname',
        onSubmit
    );

ReactDOM.render(<Switcher switchables={[firstComponent, secondComponent]} />, div);

document.body.appendChild(div);

console.log('KURWA');
