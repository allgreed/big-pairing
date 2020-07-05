import React from 'react';
import { FormikProps } from 'formik';

export function Text(props: UpperFormProps) {
    return (
        <input
            type="text"
            autoFocus={true}
            onChange={props.formikProps.handleChange}
            placeholder={props.placeholder}
            onBlur={props.formikProps.handleBlur}
            value={props.formikProps.values[props.valueName]}
            name={props.valueName}
            autoComplete="off"
        />
    );
}

export class UpperFormProps {
    constructor(
        public valueName: string,
        public formikProps: FormikProps<any>,
        public placeholder: string
    ) {}
}
