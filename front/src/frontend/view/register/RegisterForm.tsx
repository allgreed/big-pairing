import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import React, { ChangeEvent } from 'react';
import axios from 'axios';
import { TraitsDTO, UserCreateDTO } from '../../../common/api/register/UserCreateDTO';
import { Condition } from './formano/Condition';
import { Formik, FormikProps } from 'formik';

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
    axios
        .post('/api/users/', transformToApi(model))
        .then(() => console.log('SEND!'))
        .catch((err) => console.log(err));
}

function createHandle(
    consumer: (value: string) => void
): (event: ChangeEvent<HTMLInputElement>) => void {
    return (event: ChangeEvent<HTMLInputElement>) => {
        console.log('xD');
        consumer(event.target.value);
    };
}

export function RegisterForm() {
    const content = (
        <Formik
            enableReinitialize
            initialValues={{ name: '', surname: '' }}
            onSubmit={(values: any) => finalSubmit(values)}
        >
            {(formik: FormikProps<any>) => (
                <div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit(e);
                        }}
                    >
                        Na imię masz{' '}
                        <input
                            type={'text'}
                            onChange={formik.handleChange}
                            name={'name'}
                            value={formik.values.name}
                        />
                        .
                        <p>
                            A na nazwisko{' '}
                            <input
                                type={'text'}
                                onChange={formik.handleChange}
                                name={'surname'}
                                value={formik.values.surname}
                            />
                        </p>
                        <p>
                            Twoja Płeć to{' '}
                            <select
                                name="sex"
                                id="cars"
                                onChange={formik.handleChange}
                                placeholder={'Choose Sex...'}
                                value={formik.values.sex}
                            >
                                <option disabled selected value={''}>
                                    {' '}
                                    No sex{' '}
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </p>
                        <p>
                            Twoj email wyslemy na{' '}
                            <input
                                type={'text'}
                                onChange={formik.handleChange}
                                name={'mail'}
                                value={formik.values.mail}
                            />
                        </p>
                        <Condition
                            eval={() =>
                                formik.values.name &&
                                formik.values.surname &&
                                formik.values.sex &&
                                formik.values.mail
                            }
                        >
                            <p>
                                <p>Wypełnij teraz swoje cechy big five</p>
                                <>
                                    Twoje Conscientiousness Wynosi{' '}
                                    <input
                                        type={'number'}
                                        min={0}
                                        max={99}
                                        onChange={formik.handleChange}
                                        name={'conscientiousness'}
                                        value={formik.values.conscientiousness}
                                    />
                                    <br />
                                    Twoje Openness Wynosi{' '}
                                    <input
                                        type={'number'}
                                        min={0}
                                        max={99}
                                        onChange={formik.handleChange}
                                        name={'openness'}
                                        value={formik.values.openness}
                                    />
                                    <br />
                                    Twoje Extraversion Wynosi{' '}
                                    <input
                                        type={'number'}
                                        min={0}
                                        max={99}
                                        onChange={formik.handleChange}
                                        name={'extraversion'}
                                        value={formik.values.extraversion}
                                    />
                                    <br />
                                    Twój Neurotism Wynosi{' '}
                                    <input
                                        type={'number'}
                                        min={0}
                                        max={99}
                                        onChange={formik.handleChange}
                                        name={'neurotism'}
                                        value={formik.values.neurotism}
                                    />
                                    <br />
                                    Twój Agreeableness Wynosi{' '}
                                    <input
                                        type={'number'}
                                        min={0}
                                        max={99}
                                        onChange={formik.handleChange}
                                        name={'agreeableness'}
                                        value={formik.values.agreeableness}
                                    />
                                    <br />
                                </>
                                <Condition
                                    eval={() =>
                                        formik.values.conscientiousness &&
                                        formik.values.openness &&
                                        formik.values.extraversion &&
                                        formik.values.neurotism &&
                                        formik.values.agreeableness
                                    }
                                >
                                    <button
                                        type={'submit'}
                                        onSubmit={(e) => e && formik.handleSubmit}
                                    >
                                        Zatwierdź
                                    </button>
                                </Condition>
                            </p>
                        </Condition>
                    </form>
                </div>
            )}
        </Formik>
    );

    return content;
}
