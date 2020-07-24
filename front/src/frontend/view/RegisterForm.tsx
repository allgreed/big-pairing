import 'bootstrap/dist/css/bootstrap.css';
import '../css/Main.css';
import React from 'react';
import { Output } from './dynamo/views/output/Output';
import { Switchable, Switcher } from './dynamo/Switcher';
import { Formo } from './dynamo/Formo';
import { Text } from './dynamo/views/input/Text';
import { Number } from './dynamo/views/input/Number';
import { Submit } from './dynamo/views/input/Submit';
import axios from 'axios';
import { TraitsDTO, UserCreateDTO } from '../../common/api/register/UserCreateDTO';

function transformToApi(model: any) {
    return new UserCreateDTO(
        `${model.name} ${model.name}` || 'PIMPUŚ',
        model.mail || 'no@mail.com',
        model.sex || 'Male',
        new TraitsDTO(
            model.extraversion || 50,
            model.neurotism || 50,
            model.agreeableness || 50,
            model.conscientiousness || 50,
            model.openness || 50
        )
    );
}

function finalSubmit(model: any) {
    axios
        .post('/api/users/', transformToApi(model))
        .then(() => console.log('SEND!'))
        .catch((err) => console.log(err));
}

export function RegisterForm() {
    const output = (model: any) => (
        <div>
            <Output value={model.name}>{(value) => `Masz na imię ${value}. `}</Output>
            <Output value={model.surname}>{(value) => `A na nazwisko ${value}. `}</Output>
            <Output value={model.openness}>{(value) => `Twoje openness wynosi ${value}. `}</Output>
            <Output value={model.conscientiousness}>
                {(value) => `Twoje conscientiousness wynosi ${value}. `}
            </Output>
            <Output value={model.extraversion}>
                {(value) => `Twoje extraversion wynosi ${value}. `}
            </Output>
            <Output value={model.neurotism}>{(value) => `Twój neurotyzm wynosi ${value}. `}</Output>
            <Output value={model.agreeableness}>
                {(value) => `Twój agreeableness wynosi ${value}. `}
            </Output>
        </div>
    );

    const firstName: Switchable = (onSubmit, onBack, model) => (
        <Formo valueName={'name'} onSubmit={onSubmit} model={model}>
            {(p, n) => <Text formikProps={p} valueName={n} placeholder={'Twoje imie'} />}
            {output}
        </Formo>
    );

    const secondName: Switchable = (onSubmit, onBack, model) => (
        <Formo valueName={'surname'} onSubmit={onSubmit} model={model}>
            {(p, n) => <Text formikProps={p} valueName={n} placeholder={'Twoje nazwisko'} />}
            {output}
        </Formo>
    );

    const openness: Switchable = (onSubmit, onBack, model) => (
        <Formo valueName={'openness'} onSubmit={onSubmit} model={model}>
            {(p, n) => (
                <Number formikProps={p} valueName={n} placeholder={'Your BigFive Openness'} />
            )}
            {output}
        </Formo>
    );

    const conscientiousness: Switchable = (onSubmit, onBack, model) => (
        <Formo valueName={'conscientiousness'} onSubmit={onSubmit} model={model}>
            {(p, n) => (
                <Number
                    formikProps={p}
                    valueName={n}
                    placeholder={'Your BigFive Conscientiousness'}
                />
            )}
            {output}
        </Formo>
    );

    const extraversion: Switchable = (onSubmit, onBack, model) => (
        <Formo valueName={'extraversion'} onSubmit={onSubmit} model={model}>
            {(p, n) => (
                <Number formikProps={p} valueName={n} placeholder={'Your BigFive Extraversion'} />
            )}
            {output}
        </Formo>
    );

    const neurotism: Switchable = (onSubmit, onBack, model) => (
        <Formo valueName={'neurotism'} onSubmit={onSubmit} model={model}>
            {(p, n) => (
                <Number formikProps={p} valueName={n} placeholder={'Your BigFive Neuroticism'} />
            )}
            {output}
        </Formo>
    );

    const agreeableness: Switchable = (onSubmit, onBack, model) => (
        <Formo valueName={'agreeableness'} onSubmit={onSubmit} model={model}>
            {(p, n) => (
                <Number formikProps={p} valueName={n} placeholder={'Your BigFive Agreeableness'} />
            )}
            {output}
        </Formo>
    );

    const submitto: Switchable = (onSubmit, onBack, model) => (
        <Formo onSubmit={onSubmit} model={model}>
            {(p, n) => (
                <Submit formikProps={p} valueName={n} placeholder={'Your BigFive Agreeableness'} />
            )}
            {output}
        </Formo>
    );

    return (
        <div id={'main'}>
            <Switcher finalSubmit={(model: any) => finalSubmit(model)}>
                {firstName}
                {secondName}
                {openness}
                {conscientiousness}
                {extraversion}
                {neurotism}
                {agreeableness}
                {submitto}
            </Switcher>
        </div>
    );
}
