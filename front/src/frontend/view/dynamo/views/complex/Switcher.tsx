import React, { useState } from 'react';

export declare type Switchable = (
    onSubmit: (model: any) => void,
    onBack: (model: any) => void,
    initialModel: any
) => JSX.Element;

declare type X = { children: Switchable[] };
declare type D = { model: any; index: number };
export class Switcher extends React.Component<X, D> {
    constructor(props: X) {
        super(props);
        this.state = { model: {}, index: 0 };
    }

    render() {
        const onsubmit = (model: any): void => {
            console.log('MASAKRA');
            this.setState((state, props) => ({
                model: model,
                index: state.index + 1,
            }));
        };
        const onBack = (model: any): void => {};
        const populateSwitchable: JSX.Element[] = this.props.children.map((x) =>
            x(onsubmit, onBack, this.state.model)
        );

        return <div>{populateSwitchable[this.state.index]}</div>;
    }
}

// export function Switcher(switchables: Switchable[]) {
//     console.log('JÓZEK');
//     const [index, setIndex] = useState(0);
//     console.log('O KURWA');
//     const [model, setModel] = useState({});
//
//     const onsubmit = (model: any): void => setModel(model);
//     // eslint-disable-next-line @typescript-eslint/no-empty-function
//     const onBack = (model: any): void => {};
//
//     const populateSwitchable: JSX.Element[] = switchables.map((x) => x(onsubmit, onBack, model));
//
//     return <div>KURWA {populateSwitchable[index]}</div>;
// }
