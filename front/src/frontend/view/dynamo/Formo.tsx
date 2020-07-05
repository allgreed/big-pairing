import { Formik, FormikProps } from 'formik';
import React from 'react';
import { Output, RenderProps } from './views/output/Output';
import { Text, UpperFormProps } from './views/input/Text';

function objectFrom(name: string, value: string) {
    return Object.fromEntries([[name, value]]);
}

export class Formo extends React.Component<FormoProps, any> {
    constructor(props: FormoProps) {
        super(props);
    }

    render() {
        return (
            <div className={'formo'}>
                <Formik
                    key={this.props.valueName}
                    enableReinitialize
                    initialValues={this.props.valueName ? objectFrom(this.props.valueName, '') : {}}
                    onSubmit={(values: any) => {
                        this.props.onSubmit({
                            ...this.props.model,
                            ...values,
                        });
                    }}
                >
                    {(props: FormikProps<any>) => (
                        <form onSubmit={props.handleSubmit}>
                            <div>{this.props.children[0](props, this.props.valueName || '')}</div>
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
        public children: [
            (formikProps: FormikProps<any>, name: string) => JSX.Element,
            (model: any) => JSX.Element
        ],
        public valueName?: string
    ) {}
}
