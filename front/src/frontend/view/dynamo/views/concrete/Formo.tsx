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
                            <div>{this.props.children[0](props, this.props.valueName)}</div>
                            <div>
                                {this.props.children[1]({
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
        public onSubmit: (model: any) => void,
        public model: any,
        public valueName: string,
        public children: [
            (formikProps: FormikProps<any>, name: string) => JSX.Element,
            (model: any) => JSX.Element
        ]
    ) {}
}
