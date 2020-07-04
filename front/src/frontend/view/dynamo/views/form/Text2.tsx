import React from 'react';
import { FormikProps } from 'formik';

export function Text(props: UpperFormProps) {
    return (name: string) => (
        <input
            type="text"
            onChange={props.formikProps.handleChange}
            placeholder={props.placeholder}
            onBlur={props.formikProps.handleBlur}
            value={props.formikProps.values[name]}
            name={name}
            autoComplete="off"
        />
    );
}

export class UpperFormProps {
    constructor(public formikProps: FormikProps<any>, public placeholder: string) {}
}
