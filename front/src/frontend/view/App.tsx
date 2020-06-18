import ReactDOM from 'react-dom';


import React from "react";
import {Formo} from "./dynamo/views/concrete/Formo";

const div = document.createElement('div');
ReactDOM.render(<Formo/>, div);

document.body.appendChild(div);
