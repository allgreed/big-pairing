import 'bootstrap/dist/css/bootstrap.css';
import '../css/Main.css';
import React from "react";
import {Formik, FormikProps} from "formik";
import axios from "axios";

class RegisterDTO {
    constructor(
        public nickname: string,
        public email: string,
        public sex: string,
        public traits: TraitsDTO
    ) {
    }
}

class TraitsDTO {
    constructor(public extroversion: number,
                public neuroticism: number,
                public agreeableness: number,
                public conscientiousness: number,
                public openness_to_experience: number
    ) {
    }
}


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

    submit(values: any) {
        const registerDTO = new RegisterDTO(
            values.name,
            values.email,
            values.sex,
            new TraitsDTO(
                values.extroversion,
                values.neuroticism,
                values.agreeableness,
                values.conscientiousness,
                values.openness_to_experience
            )
        );

        axios.post("http://localhost:5000/register", registerDTO).then(() => alert("kurwa"));
        console.log("pozdro");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(): any {

        return <Formik
            initialValues={{
                name: '', email: '', sex: 'Female',
                ...Object.fromEntries(this.bigFive.map((x: any) => [x, 50]))
            }}
            onSubmit={(values: any, actions: any) => {
                this.submit(values);

            }}
        >
            {(props: any) => (
                {
                    // TODO: fill the cite
                }
                <blockquote cite="">
                    A brilliantly lighted ballroom may very well be a flattering setting for a girl dressed for a dance. But for one thing she seldom shows up to her best advantage here precisely because everything requires her to do so — a requirement that has a disturbing effect on her whether she complies with it or does just the opposite. For another, everything is reminiscent of transitoriness and vanity and evokes an impatience that makes the enjoyment less refreshing.

                ~ Søren Kierkegaard
                </blockquote> 

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
                    name="Male"
                    value="Male"
                    checked={props.values.sex === "Male"}
                    onChange={props.handleChange}
                />
                    <label>MordaKobieta</label><input
                    type="radio"
                    name="Female"
                    value="Female"
                    checked={props.values.sex === "Female"}
                    onChange={props.handleChange}
                /><br/>


                    {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                    <button type="submit" name="submit">Submit</button>
                </form>
            )}
        </Formik>
    }
}
