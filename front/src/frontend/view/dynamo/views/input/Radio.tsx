import React from 'react';
import { FormikProps } from 'formik';

export function Radio(props: UpperFormProps) {
    return (
        <>
            {props.children.map(([name, value], index) => (
                <>
                    <input
                        id="male"
                        type="radio"
                        value={name}
                        name={props.valueName}
                        onChange={props.formikProps.handleChange}
                        defaultChecked={index === 0}
                    />
                    <label>{value}</label>
                </>
            ))}
            <button type={'submit'} className={'radio'}>
                PYK!
            </button>
        </>
    );
}

declare type Name = string;
declare type Value = string;

export class UpperFormProps {
    constructor(
        public valueName: string,
        public formikProps: FormikProps<any>,
        public children: [Name, Value][]
    ) {}
}
