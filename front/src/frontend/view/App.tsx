import ReactDOM from 'react-dom';


import React from "react";
import {Name} from "./dynamo/views/concrete/Name";

const div = document.createElement('div');
ReactDOM.render(<Name/>, div);

document.body.appendChild(div);
