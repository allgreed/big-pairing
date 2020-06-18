import {Formik, FormikProps} from "formik";
import React from "react";


export class Name extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {names: []};
    }

    render() {
        return <div>
            {
                (()=><div>
                    <Formik
                        initialValues={{
                            value: ""
                        }}
                        onSubmit={(values: any, actions: any) => {
                            this.submit(values.value);
                        }}
                    >
                        {
                            (props: FormikProps<any>) =>
                                <form onSubmit={props.handleSubmit}>
                                    <input
                                        type="text"
                                        onChange={props.handleChange}
                                        placeholder={'Twoje Imie'}
                                        onBlur={props.handleBlur}
                                        value={props.values.value}
                                        name="value"
                                    />
                                    <button type="submit" name="submit">Submit</button>
                                </form>
                        }
                    </Formik>
                </div>)()
            }
            <div>
                {this.state.names.join(", ")}
            </div>
        </div>;
    }

    submit(value: string) {
        this.setState((state: any) => ({
            names: [...state.names, value]
        }))
    }
}
