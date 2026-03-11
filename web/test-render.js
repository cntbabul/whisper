import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App.jsx';
console.log(renderToString(React.createElement(App)));
