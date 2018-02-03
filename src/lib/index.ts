// React ** Perf ** Tool.
import { calc, setup, unsetAll } from "./calc";

import start from "./extension";
import { Props, OProps } from "./l.d";

export default function perf(constructor: Function): any {
	let t0: number, t1: number, t2: number, t3: number, t4: number, t5: number;

	const {
		componentDidMount,
		componentWillMount,
		componentWillUpdate,
		componentDidUpdate,
		componentWillUnmount,
		shouldComponentUpdate
	} = constructor.prototype;
	const { name } = constructor as any;

	if (!window.hasOwnProperty("perfTool")) {
		let perfTool: Object = (window.perfTool = {});

		window.perfTool = {
			...window.perfTool,
			...{
				[name]: {
					"Initial Mount": 0,
					"Update Time": 0,
					"Re-rendered": 0,
					shouldComponentUpdate: false
				}
			},
			options: {
				LIVE_MONITORING: false,
				isDevPanelOpened: false
			}
		};
	} else {
		window.perfTool = {
			...window.perfTool,
			...{
				[name]: {
					"Initial Mount": 0,
					"Update Time": 0,
					"Re-rendered": 0,
					shouldComponentUpdate: false
				}
			},
			options: {
				...window.perfTool.options
			}
		};
	}

	const perfTool = window.perfTool;

	const pp = window.perfTool[name] as Props;
	const PTOptions = window.perfTool.options as OProps;

	setup(name, shouldComponentUpdate ? true : false, "shouldComponentUpdate");

	if (componentWillMount) {
		constructor.prototype.componentWillMount = function() {
			t0 = performance.now();
			let cwm = componentWillMount.bind(this);
			cwm();
		};
	} else {
		constructor.prototype.componentWillMount = () => (t0 = performance.now());
	}

	if (componentDidMount) {
		// If lifecycle exists
		constructor.prototype.componentDidMount = function() {
			let cdm = componentDidMount.bind(this);
			cdm();
			t1 = performance.now();
			setup(name, calc(t1, t0), "Initial Mount");

			start(); // Start posting to extension
		};
	} else {
		// If not
		constructor.prototype.componentDidMount = () => {
			t1 = performance.now();

			setup(name, calc(t1, t0), "Initial Mount");

			start(); // Start posting to extension
		};
	}

	if (componentWillUpdate) {
		// If lifecycle exists
		constructor.prototype.componentWillUpdate = function() {
			let cwu = componentWillUpdate.bind(this);
			t2 = performance.now();
			cwu();
		};
	} else {
		// If not
		constructor.prototype.componentWillUpdate = () => {
			t2 = performance.now();
		};
	}

	if (componentDidUpdate) {
		constructor.prototype.componentDidUpdate = function() {
			let cdu = componentDidUpdate.bind(this);
			cdu();
			t3 = performance.now();
			setup(name, calc(t3, t2), "Update Time");

			setup(name, (window.perfTool[name] as Props)["Re-rendered"] + 1, "Re-rendered");
			start(); // Start posting to extension
		};
	} else {
		constructor.prototype.componentDidUpdate = () => {
			t3 = performance.now();
			setup(name, calc(t3, t2), "Update Time");
			setup(name, (window.perfTool[name] as Props)["Re-rendered"] + 1, "Re-rendered");

			start(); // Start posting to extension
		};
	}

	if (componentWillUnmount) {
		constructor.prototype.componentWillUnmount = function() {
			let cwu = componentWillUnmount.bind(this);
			cwu();
			unsetAll(name);
			start(); // Start posting to extension
		};
	} else {
		constructor.prototype.componentWillUnmount = () => {
			unsetAll(name);
			start(); // Start posting to extension
		};
	}

	return constructor;
}
