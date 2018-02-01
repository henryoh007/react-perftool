// background.js

window.dev = undefined;
window.content = undefined;

chrome.storage.sync.get(["live-monitoring"], item => {
	if (item["live-monitoring"] == undefined) {
		chrome.storage.sync.set({ "live-monitoring": true }, () => {
			console.log("saved");
		});
	}
});

chrome.extension.onConnect.addListener(function(port) {
	if (window.dev == undefined && port.name == "devTool") {
		window.dev = port;

		window.dev.onMessage.addListener(function(ev) {
			if (ev.req === "Request for panel settings" && ev.from === "devTool") {
				chrome.storage.sync.get(["live-monitoring"], item => {
					window.dev.postMessage({
						req: "Response for settings data",
						from: "background",
						data: item
					});
				});
			}
			if (ev.req === "Start monitoring" && ev.from === "devTool") {
				window.content.postMessage({ from: "background", req: "Prepeare for monitoring" });
			}
			if (ev.req === "Monitoring ended" && ev.from === "devTool") {
				window.content.postMessage({ from: "background", req: "Monitoring ended" });
			}
		});

		window.dev.onDisconnect.addListener(function(ev) {
			window.dev = undefined;
			window.content.postMessage({ from: "background", req: "DevPanel disconnectd" });
		});

		window.content.postMessage({
			from: "background",
			req: "DevTools connected"
		});
	}
	if (window.content == undefined && port.name == "content") {
		window.content = port;
		window.content.onMessage.addListener(function(ev) {
			if (
				ev.req === "Send the data to developer panel" &&
				ev.from === "content script" &&
				ev.data !== !ev.data
			) {
				window.dev.postMessage({
					from: "background",
					req: "Reacive performance data",
					data: ev.data
				});
			}
			if (ev.req === "Is dev panel opened" && ev.from === "content script") {
				window.content.postMessage({
					from: "background",
					req: "Check if dev panel is opened",
					data: window.dev
				});
			}
			if (ev.req === "Monitoring data object" && ev.from === "content script") {
				window.dev.postMessage({
					from: "background",
					req: "Reacive the monitoring data",
					data: ev.data
				});
			}
		});

		window.content.onDisconnect.addListener(function(ev) {
			window.content = undefined;
		});
	}
});
