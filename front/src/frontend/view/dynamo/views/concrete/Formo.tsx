import {Formik, FormikProps} from "formik";
import React from "react";
import {Name, RenderProps} from "../content/Name";
import {Text, UpperFormProps} from "../form/Text";

//

export class Formo extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {name: ""};
    }

    render() {
        return (
            <div>
                <div>XD</div>
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
                            <>
                                <div>
                                    <Text formikProps={props} placeholder={"Twoje imię"}/>
                                </div>
                                <div>
                                    <Name model={{name: props.values.value}}/>
                                </div>
                            </>
                    }
                </Formik>
            </div>)

    }


    submit(value: string) {

    }
}

class FormoProps {
    constructor(
        public upperForm: (props: UpperFormProps) => (React.Component),
        public render: (props: RenderProps) => (React.Component)
    ) {
    }

}
