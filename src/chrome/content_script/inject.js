// Inject
console.log(window.perfTool,'asdasd')
window.doo = function() {
	window.postMessage(
		{
			data: window.perfTool,
			req: "Sending data from inject script to content script",
			from: "inject script",
			source: "react-perfTool"
		},
		"*"
	);
};

window.addEventListener("message", function(event) {
	if (event.source !== window) {
		return;
	}

	var message = event.data;
	if (message.source != "react-perfTool") {
		return false;
	}

	if (message.req === "Can start posting me") {
		window.perfTool.options.isDevPanelOpened = true;
	}

	if (message.req === "Stop posting me") {
		window.perfTool.options.isDevPanelOpened = false;
	}
	if (message.req === "Can start posting me::post") {
		window.perfTool.options.isDevPanelOpened = true;
		doo();
	}
	if (message.req === "Prepeare and start for monitoring") {
		Object.keys(window.perfTool).map((value, index) => {
			window.perfTool[value]["Re-rendered"] = 0;
			window.perfTool[value]["Update Time"] = 0;
			window.perfTool[value]["All lists updated"] = 0;
		});
	}
	if (message.req === "Monitoring ended") {
		window.postMessage(
			{
				data: window.perfTool,
				req: "Monitoring finished, sending the performance data to devPanel",
				from: "inject script",
				source: "react-perfTool"
			},
			"*"
		);
	}
});
