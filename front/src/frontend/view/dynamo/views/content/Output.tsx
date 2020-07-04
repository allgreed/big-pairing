import React from 'react';

export function Output(props: RenderProps) {
    return props.value !== undefined ? <span>{props.children(props.value)}</span> : null;
}

export class RenderProps {
    constructor(public value: string, public children: (value: string) => string) {
    }
}
