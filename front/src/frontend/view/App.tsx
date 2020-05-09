import ReactDOM from 'react-dom';

import {Main} from "./Main";
import React from "react";

const div = document.createElement('div');
ReactDOM.render(<Main/>, div);

document.body.appendChild(div);
