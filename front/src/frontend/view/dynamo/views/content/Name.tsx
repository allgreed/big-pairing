import React from "react";


export function Name(props: RenderProps) {
    return (
        props.model.name ? <span>Nazywasz się {props.model.name}</span> : null
    );
}

export class RenderProps {
    constructor(public model: { name: string }) {
    }
}
