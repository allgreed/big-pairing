import React from 'react';

export function Output(props: RenderProps) {
    return props.value !== undefined ? <div>{props.children(props.value)}</div> : null;
}

export class RenderProps {
    constructor(public value: string, public children: (value: string) => string) {}
}
