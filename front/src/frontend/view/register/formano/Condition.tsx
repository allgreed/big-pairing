import React from 'react';

export function Condition(props: { eval: () => boolean; children: JSX.Element }) {
    return props.eval() ? props.children : null;
}
