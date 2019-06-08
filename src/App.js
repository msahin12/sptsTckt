/**
 * Summary.
 *
 * This file contains the main router and provider.
 * @author Mustafa SAHIN.
 * @email  mustafa.sahin.co@gmail.com 
 * @since  1.0.0
 */


import "babel-polyfill";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import AppContainer from "./containers";
import configureStore from './redux/store';


const store = configureStore();


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={AppContainer} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
