import React from 'react';
import { FormikProps } from 'formik';

export function Submit(props: UpperFormProps) {
    return (
        <button type={'submit'} onSubmit={(e) => e && props.formikProps.handleSubmit}>
            JEBNIJ SYNU
        </button>
    );
}

export class UpperFormProps {
    constructor(
        public valueName: string,
        public formikProps: FormikProps<any>,
        public placeholder: string
    ) {}
}
