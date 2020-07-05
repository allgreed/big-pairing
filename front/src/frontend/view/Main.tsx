import 'bootstrap/dist/css/bootstrap.css';
import '../css/Main.css';
import React from 'react';
import { Output } from './dynamo/views/content/Output';
import { Switchable, Switcher } from './dynamo/views/complex/Switcher';
import { Formo } from './dynamo/views/concrete/Formo';
import { Text } from './dynamo/views/form/Text';
import { Number } from './dynamo/views/form/Number';

export function Main(props: { children?: JSX.Element }) {
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

    return (
        <div id={'main'}>
            <Switcher>
                {firstComponent}
                {secondComponent}
                {openness}
                {conscientiousness}
                {extraversion}
                {neurotism}
                {agreeableness}
            </Switcher>
        </div>
    );
}
