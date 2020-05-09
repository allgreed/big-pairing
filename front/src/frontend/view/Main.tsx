import 'bootstrap/dist/css/bootstrap.css';
import '../css/Main.css';
import React from "react";
import {Formik, FormikProps} from "formik";


export class Main
    extends React.Component<{}, {}> {

    bigFive = ["extroversion", "neuroticism", "agreeableness", "conscientiousness", "openness_to_experience"];

    constructor(props: {}) {
        super(props);
    }

    createSlider(props: FormikProps<any>, value: string) {
        return <span key={value}><label>{value}:</label><input
            type="number"
            onChange={props.handleChange}
            value={props.values[value]}
            min={0}
            max={100}
            onBlur={props.handleBlur}
            name={value}
        /><br/></span>
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(): any {

        return <Formik
            initialValues={{
                name: '', email: '', sex: 'Female',
                ...Object.fromEntries(this.bigFive.map((x: any) => [x, 50]))
            }}
            onSubmit={(values: any, actions: any) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000);
            }}
        >
            {(props: any) => (
                <form onSubmit={props.handleSubmit}>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        placeholder={'Twoje Imie'}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        name="name"
                    /><br/>
                    <input
                        type="email"
                        onChange={props.handleChange}
                        placeholder={'Twój Email'}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        name="email"
                    /><br/>
                    {this.bigFive.map(x => this.createSlider(props, x))}

                    <label>Facet</label><input
                        type="radio"
                        name="sex"
                        value="Male"
                        checked={props.values.sex === "Male"}
                        onChange={props.handleChange}
                    />
                    <label>Locha</label><input
                        type="radio"
                        name="sex"
                        value="Female"
                        checked={props.values.sex === "Female"}
                        onChange={props.handleChange}
                    /><br/>



                    {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    }
}
