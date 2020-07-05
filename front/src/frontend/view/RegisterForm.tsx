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
import { TraitsDTO } from './DTO/TraitsDTO';
import { RegisterDTO } from './DTO/RegisterDTO';

function sendModel(model: any) {
    const registerDTO = new RegisterDTO(
        `${model.name} ${model.surname}`,
        model.email,
        model.sex,
        new TraitsDTO(
            model.extroversion,
            model.neuroticism,
            model.agreeableness,
            model.conscientiousness,
            model.openness
        )
    );

    axios.post('http://localhost:5000/register', registerDTO).then(() => alert('kurwa'));
}

export function RegisterForm() {
    const output = (model: any) => (
        <div>
            <Output value={model.name}>{(value) => `Masz na imię ${value}. `}</Output>
            <Output value={model.surname}>{(value) => `A na nazwisko ${value}. `}</Output>
            <Output value={model.openness}>{(value) => `Twoje openness wynosi ${value}. `}</Output>
            <Output value={model.email}>{(value) => `Wyślemy Ci info na ${value}. `}</Output>
            <Output value={model.sex}>{(value) => `Twoja płeć to ${value}. `}</Output>
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

    const email: Switchable = (onSubmit, onBack, model) => (
        <Formo valueName={'email'} onSubmit={onSubmit} model={model}>
            {(p, n) => <Text formikProps={p} valueName={n} placeholder={'Email'} />}
            {output}
        </Formo>
    );

    const sex: Switchable = (onSubmit, onBack, model) => (
        <Formo valueName={'sex'} onSubmit={onSubmit} model={model}>
            {(p, n) => <Text formikProps={p} valueName={n} placeholder={'Sex?'} />}
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
            <Switcher finalSubmit={sendModel}>
                {firstName}
                {secondName}
                {email}
                {sex}
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

/*
A brilliantly lighted ballroom may very well be a flattering setting for a girl dressed for a dance. But for one thing she seldom shows up to her best advantage here precisely because everything requires her to do so — a requirement that has a disturbing effect on her whether she complies with it or does just the opposite. For another, everything is reminiscent of transitoriness and vanity and evokes an impatience that makes the enjoyment less refreshing.

                ~ Søren Kierkegaard
 */
