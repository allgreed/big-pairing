import React from 'react';
import { FormikProps } from 'formik';

export function Radio(props: UpperFormProps) {
    return (
        <>
            {props.children.map((entry) => (
                <button
                    key={entry.value}
                    type="submit"
                    name={props.valueName}
                    value={entry.value}
                    onClick={() => props.formikProps.setFieldValue(props.valueName, entry.value)}
                >
                    {entry.title}
                </button>
            ))}
        </>
    );
}

export class UpperFormProps {
    constructor(
        public valueName: string,
        public children: { title: string; value: string }[],
        public formikProps: FormikProps<any>
    ) {}
}
