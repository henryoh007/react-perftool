// Dev Tools
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./src/index";
import { Provider } from "mobx-react";
import store from "./src/state/index";

function fn() {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById("root")
	);
}
document.addEventListener("DOMContentLoaded", fn, false);
