import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MantineProvider} from '@mantine/core';
import {Route, Router, Routes} from 'react-router-dom'
import How from './How';

ReactDOM.render(
    <MantineProvider
      theme={{
        headings: {
          fontFamily: 'Open Sans' // this took me a while to find. I feel like theme.headings.fontFamily should inherit from theme.fontFamily
        },
        colorScheme: 'dark', // had to dig around to see that the body background is magically set to theme.colors.dark[7] if and only if colorScheme is 'dark'
      }}>

      <App/>

    </MantineProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
