import React from 'react';
import { FormikProps } from 'formik';

export function Number(props: UpperFormProps) {
    return (
        <input
            autoFocus={true}
            type="number"
            min={0}
            max={99}
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
