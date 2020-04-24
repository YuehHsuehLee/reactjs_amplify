import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Loader from 'react-loader-spinner';

// Show 'Loading' animation for 1.5s
//        <div style={{
//            width: "100%",
//            height: "100",
//            display: "flex",
//            justifyContent: "center",
//            alignItems: "center"
//            }}>
//            <Loader type="Puff" color="#00BFFF" secondaryColor='Grey' height="100" width="100" timeout={1500}/>
//            Loading
//        </div>


render(
    <BrowserRouter >
        <Route component={App} />
    </BrowserRouter>,
  document.getElementById('root'));

registerServiceWorker();