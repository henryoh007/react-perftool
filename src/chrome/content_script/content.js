// Content script
var s = document.createElement("script");

s.src = chrome.extension.getURL("content_script/inject.js");

(document.head || document.documentElement).appendChild(s);
(document.head || document.documentElement).removeChild(s);

function sendMessageToInject(msg) {
	window.postMessage(
		{
			source: "react-perfTool",
			req: msg
		},
		"*"
	);
}

function fn() {
	var port = chrome.runtime.connect({ name: "content" });

	if (performance.navigation.type == 1) {
		port.postMessage({ from: "content script", req: "Is dev panel opened" });
	}

	port.onMessage.addListener(function(msg) {
		if (msg.from == "background" && msg.req == "DevTools connected") {
			sendMessageToInject("Can start posting me");
		}
		if (msg.from == "background" && msg.req == "DevPanel disconnectd") {
			sendMessageToInject("Stop posting me");
		}
		if (msg.from == "background" && msg.req == "Check if dev panel is opened") {
			if (typeof msg.data === "object") {
				chrome.storage.sync.get(
					["live-monitoring"],
					item => item["live-monitoring"] && sendMessageToInject("Can start posting me::post")
				);
			} else {
				sendMessageToInject("Stop posting me");
			}
		}
		if (msg.from === "background" && msg.req === "Prepeare for monitoring") {
			sendMessageToInject("Prepeare and start for monitoring");
		}
		if (msg.from === "background" && msg.req === "Monitoring ended") {
			sendMessageToInject("Monitoring ended");
		}
	});

	window.addEventListener("message", function(msg) {
		if (event.source !== window) {
			return;
		}

		var message = event.data;
		if (message.source != "react-perfTool") {
			return false;
		}

		if (
			message.req === "Sending data from inject script to content script" &&
			message.from === "inject script" &&
			message.data !== !message.data
		) {
			port.postMessage({
				from: "content script",
				req: "Send the data to developer panel",
				data: message.data
			});
		}
		if (
			message.req === "Monitoring finished, sending the performance data to devPanel" &&
			message.from === "inject script" &&
			message.data !== !message.data
		) {
			port.postMessage({
				from: "content script",
				req: "Monitoring data object",
				data: message.data
			});
		}
	});
}

document.addEventListener("DOMContentLoaded", fn);
