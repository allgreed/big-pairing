import React, { ChangeEvent } from 'react';

export function Text(props: UpperFormProps) {
    return (
        <input
            type="text"
            autoFocus={true}
            onChange={props.handle}
            placeholder={props.placeholder}
            value={props.value}
            autoComplete="off"
        />
    );
}

export class UpperFormProps {
    constructor(
        public value: string,
        public handle: (value: ChangeEvent<HTMLInputElement>) => void,
        public placeholder: string
    ) {}
}
