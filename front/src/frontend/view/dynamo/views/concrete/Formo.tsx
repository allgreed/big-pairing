import { Formik, FormikProps } from 'formik';
import React from 'react';
import { Output, RenderProps } from '../content/Output';
import { Text, UpperFormProps } from '../form/Text';

function objectFrom(name: string, value: string) {
    return Object.fromEntries([[name, value]]);
}

export class Formo extends React.Component<FormoProps, any> {
    constructor(props: FormoProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>XD</div>
                <Formik
                    enableReinitialize
                    initialValues={objectFrom(this.props.valueName, 'XD')}
                    onSubmit={(values: any, actions: any) => {
                        this.props.onSubmit({
                            ...this.props.model,
                            ...values,
                        });
                    }}
                >
                    {(props: FormikProps<any>) => (
                        <form onSubmit={props.handleSubmit}>
                            <div>{this.props.upperForm(props)(this.props.valueName)}</div>
                            <div>
                                {this.props.render({
                                    ...this.props.model,
                                    ...props.values,
                                })}
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        );
    }
}

class FormoProps {
    constructor(
        public upperForm: (formikProps: FormikProps<any>) => (name: string) => JSX.Element,
        public render: (model: any) => JSX.Element,
        public onSubmit: (model: any) => void,
        public model: any,
        public valueName: string
    ) {}
}

export function getFormo(
    inputComponent: (x: FormikProps<any>) => (name: string) => JSX.Element,
    displayComponent: (x: any) => JSX.Element,
    model: any,
    valueName: string,
    onSubmit: (model: any) => void
): JSX.Element {
    return (
        <Formo
            upperForm={inputComponent}
            render={displayComponent}
            onSubmit={onSubmit}
            model={model}
            valueName={valueName}
        />
    );
}
