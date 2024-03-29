import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux"; // allows to access state in any file
import { createStore, configureStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

import "./index.css"; 

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
