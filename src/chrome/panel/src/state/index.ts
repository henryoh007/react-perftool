// App state -> mobx
import { observable, computed } from "mobx";
import * as omit from "lodash.omit";
import * as sortBy from "lodash.sortby";
import * as orderBy from "lodash.orderby";
import { Data, Messages } from "./state.d";

window.orderBy = orderBy;

class AppState {
	@observable data: Data[] = [];
	@observable time: number = 0;
	@observable monitoring: Boolean = false;
	@observable liveMonitoring: Boolean = undefined;
	interval: number;
	port = chrome.runtime.connect({
		name: "devTool"
	});
	direction:any = 'asc';
	sortBy:string = "";

	@computed get dl():number{
		return this.data.length;
	}

	sortByNumber(direction: string, name: string):any {
		var dirValue = direction.toLowerCase();
		this.sortBy = name;
		this.direction = dirValue;
		
		if(name == "Re-rendered"){
			this.data = orderBy(this.data,'Re-rendered',[dirValue])
		} else {
			this.data = orderBy(this.data,[item=>parseInt(item[name].slice(0, -3))],[dirValue])
		}
	}

	sortByName(direction: string) {
		var dirValue = direction.toLowerCase();
		this.sortBy = 'name';
		this.direction = dirValue
		this.data = orderBy(this.data, 'name', [dirValue])
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

				if(self.sortBy){
						if(self.sortBy == 'name' || self.sortBy == 'Re-rendered'){
						self.data = orderBy(arr,self.sortBy,[self.direction]);
					} else if(self.sortBy == 'Initial Mount' || self.sortBy == "Update Time"){
						self.data  = orderBy(arr,item=>parseInt(item[self.sortBy].slice(0,-3)),self.direction);
					} else {
						self.data  = self.sortByBool(self.direction)l
					}
				} else {
					self.data = arr;	
				}
				
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
window.store = store;

export default store;
