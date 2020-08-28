import 'bootstrap/dist/css/bootstrap.css';
import React, { ChangeEvent } from 'react';
import axios from 'axios';
import { TraitsDTO, UserCreateDTO } from '../../../common/api/register/UserCreateDTO';
import { Formik, FormikProps } from 'formik';
import { Route, useHistory } from 'react-router-dom';

function transformToApi(model: any) {
    return new UserCreateDTO(
        `${model.name} ${model.surname}` || 'PIMPUŚ',
        model.mail || 'no@mail.com',
        model.sex || 'Male',
        new TraitsDTO(
            model.extraversion || 50,
            model.neurotism || 50,
            model.agreeableness || 50,
            model.conscientiousness || 50,
            model.openness || 50
        )
    );
}

function finalSubmit(model: any) {
    return axios.post('/api/users/', transformToApi(model));
}

function createHandle(
    consumer: (value: string) => void
): (event: ChangeEvent<HTMLInputElement>) => void {
    return (event: ChangeEvent<HTMLInputElement>) => {
        console.log('xD');
        consumer(event.target.value);
    };
}

class InputProps {
    constructor(
        public name: string,
        public children: string,
        public formik: FormikProps<any>,
        public type?: string,
        public additionalProperties?: object,
        public hint?: string
    ) {}
}

function Input(props: InputProps) {
    return (
        <div className="form-group row">
            <label htmlFor="name" className="col-sm-5 col-form-label">
                {props.children}
            </label>
            <div className="col-sm-7">
                <input
                    className="form-control"
                    type={props.type || 'text'}
                    onChange={props.formik.handleChange}
                    name={props.name}
                    id={props.name}
                    value={props.formik.values[props.name] || ''}
                    {...(props.additionalProperties || {})}
                />
                {props.hint ? <small className="form-text text-muted">{props.hint}</small> : null}
            </div>
        </div>
    );
}

export function RegisterForm() {
    const history = useHistory();
    return (
        <>
            <div className={'container'}>
                <div className={'p-5 my-5 card'}>
                    <Route exact path={'/'}>
                        <Formik
                            enableReinitialize
                            initialValues={{ name: '', surname: '' }}
                            onSubmit={(values: any) =>
                                finalSubmit(values)
                                    .then(() => history.push('/registered'))
                                    .catch((err) => console.log(err))
                            }
                        >
                            {(formik: FormikProps<any>) => (
                                <>
                                    <h1>Registration Form</h1>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            formik.handleSubmit(e);
                                        }}
                                    >
                                        <div className={'my-5'}>
                                            <h2>Basic Data</h2>
                                            <Input name={'name'} formik={formik}>
                                                Your name is
                                            </Input>
                                            <Input name={'surname'} formik={formik}>
                                                Your surname is
                                            </Input>
                                            <div className="form-group row">
                                                <label
                                                    htmlFor="name"
                                                    className="col-sm-5 col-form-label"
                                                >
                                                    Your sex is
                                                </label>
                                                <div className="col-sm-7">
                                                    <select
                                                        name="sex"
                                                        id="cars"
                                                        className={'form-control'}
                                                        onChange={formik.handleChange}
                                                        placeholder={'Choose Sex...'}
                                                        value={formik.values.sex}
                                                    >
                                                        <option hidden value={''}>
                                                            Select Sex
                                                        </option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <Input name={'mail'} formik={formik}>
                                                Your activation mail will be sent to
                                            </Input>
                                        </div>
                                        <div className={'my-5'}>
                                            <h2>Your Big Five Values</h2>
                                            <h5 className={'my-3'}>
                                                Please use one of those tests to get the values:{' '}
                                                <a href={'https://openpsychometrics.org/'}>
                                                    openpsychometrics
                                                </a>{' '}
                                                or{' '}
                                                <a href={'https://www.understandmyself.com/'}>
                                                    understandmyself
                                                </a>
                                            </h5>
                                            <Input
                                                name={'conscientiousness'}
                                                formik={formik}
                                                type={'number'}
                                                additionalProperties={{ min: 0, max: 99 }}
                                            >
                                                Your conscientiousness is
                                            </Input>
                                            <Input
                                                name={'openness'}
                                                formik={formik}
                                                type={'number'}
                                                additionalProperties={{ min: 0, max: 99 }}
                                                hint={'It is called differently in different tests'}
                                            >
                                                Your openness or intellect/imagaination is
                                            </Input>
                                            <Input
                                                name={'extraversion'}
                                                formik={formik}
                                                type={'number'}
                                                additionalProperties={{ min: 0, max: 99 }}
                                            >
                                                Your extraversion is
                                            </Input>
                                            <Input
                                                name={'neurotism'}
                                                formik={formik}
                                                type={'number'}
                                                additionalProperties={{ min: 0, max: 99 }}
                                            >
                                                Your neurotism is
                                            </Input>
                                            <Input
                                                name={'agreeableness'}
                                                formik={formik}
                                                type={'number'}
                                                additionalProperties={{ min: 0, max: 99 }}
                                            >
                                                Your agreeableness is
                                            </Input>
                                        </div>
                                        <button
                                            className={'btn btn-primary mb-12'}
                                            type={'submit'}
                                            onSubmit={(e) => e && formik.handleSubmit}
                                        >
                                            Send Form
                                        </button>
                                    </form>
                                </>
                            )}
                        </Formik>
                    </Route>
                    <Route exact path={'/registered'}>
                        <h1>You have been registered</h1>
                        <p className={'my-3'}>
                            Thank you for registering in our app.
                            <br />
                            Please be happy.
                        </p>
                    </Route>
                </div>
            </div>
        </>
    );
}
