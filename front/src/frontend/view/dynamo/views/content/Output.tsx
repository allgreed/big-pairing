import React from 'react';

export function Output(props: RenderProps) {
    return props.text !== undefined ? <span>{props.text}</span> : null;
}

export class RenderProps {
    constructor(public text: string) {}
}
