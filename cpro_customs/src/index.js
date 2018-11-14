import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
