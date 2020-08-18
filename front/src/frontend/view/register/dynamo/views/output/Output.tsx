import React from 'react';

export function isDefined(str: string) {
    return str !== undefined;
}

export function Output(props: RenderProps) {
    return (props.shouldDisplay || isDefined)(props.value) ? (
        <div>{props.children(props.value)}</div>
    ) : null;
}

export class RenderProps {
    constructor(
        public value: string,
        public children: (value: string) => JSX.Element,
        public shouldDisplay?: (value: string) => boolean
    ) {}
}
