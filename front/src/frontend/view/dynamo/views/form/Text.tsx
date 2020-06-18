import React from "react";
import {FormikProps} from "formik";


export function Text(props: UpperFormProps) {

    return (
        <input
            type="text"
            onChange={props.formikProps.handleChange}
            placeholder={props.placeholder}
            onBlur={props.formikProps.handleBlur}
            value={props.formikProps.values.value}
            name="value"
            autoComplete="off"
        />
    );
}

export class UpperFormProps {
    constructor(public formikProps: FormikProps<any>,
                public placeholder: string
    ) {
    }
}
