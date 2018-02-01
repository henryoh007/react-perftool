// App state -> mobx
import { observable, computed } from "mobx";
import * as omit from "lodash.omit";
import * as sortBy from "lodash.sortby";
import { Data, Messages } from "./state.d";

class AppState {
	@observable data: Data[] = [];
	@observable time: number = 0;
	@observable monitoring: Boolean = false;
	@observable liveMonitoring: Boolean = undefined;
	interval: number;
	port = chrome.runtime.connect({
		name: "devTool"
	});

	sortByNumber(direction: string, name: string) {
		this.data = this.data.sort((a, b) => {
			if (name == "Re-rendered") {
				return direction == "DESC" ? b[name] - a[name] : a[name] - b[name];
			} else {
				return direction == "DESC"
					? b[name].slice(0, -3) - a[name].slice(0, -3)
					: a[name].slice(0, -3) - b[name].slice(0, -3);
			}
		});
	}

	sortByName(direction: string) {
		if (direction == "DESC") {
			this.data = sortBy(this.data, [o => o.name]);
		} else {
			this.data = this.data.sort(
				(a: { name: string }, b: { name: string }): any => b.name > a.name
			);
		}
	}
	clear() {
		this.data.length = 0;
	}

	startTimerAndMonitoring() {
		this.port.postMessage({
			req: "Start monitoring",
			from: "devTool"
		});

		this.monitoring = true;

		var interval: number = window.setInterval(() => {
			this.time += 1;
		}, 1000);

		this.interval = interval;
	}
	stopTimerAndMonitoring() {
		this.port.postMessage({
			req: "Monitoring ended",
			from: "devTool"
		});

		clearInterval(this.interval);
		this.monitoring = false;
		this.time = 0;
	}

	constructor() {
		const self = this;
		this.clear = this.clear.bind(this);
		this.stopTimerAndMonitoring = this.stopTimerAndMonitoring.bind(this);
		this.startTimerAndMonitoring = this.startTimerAndMonitoring.bind(this);
		this.sortByName = this.sortByName.bind(this);
		this.sortByNumber = this.sortByNumber.bind(this);

		this.port.postMessage({
			req: "Request for panel settings",
			from: "devTool"
		});
		this.port.onMessage.addListener(function(msg: Messages) {
			if (msg.req === "Response for settings data" && msg.from === "background") {
				self.liveMonitoring = msg.data["live-monitoring"];
			}

			if (
				msg.req === "Reacive performance data" &&
				msg.from == "background" &&
				msg.data !== !msg.data
			) {
				var data = omit(msg.data, "options");
				var arr = [];
				Object.keys(data).map((value, index) =>
					arr.push({
						...{
							...data[value],
							...{
								"Initial Mount": data[value]["Initial Mount"] + " ms",
								"Update Time": data[value]["Update Time"] + " ms"
							}
						},
						...{ name: value }
					})
				);
				self.data.length = 0;
				self.data = arr;
			}

			if (
				msg.req === "Reacive the monitoring data" &&
				msg.from == "background" &&
				msg.data !== !msg.data
			) {
				var data = omit(msg.data, "options");
				var arr = [];
				Object.keys(data).map((value, index) =>
					arr.push({
						...{
							...data[value],
							...{
								"Initial Mount": data[value]["Initial Mount"] + " ms",
								"Update Time": data[value]["Update Time"] + " ms"
							}
						},
						...{ name: value }
					})
				);
				self.data.length = 0;
				self.data = arr;
			}
		});
	}
}

const store = new AppState();

export default store;
