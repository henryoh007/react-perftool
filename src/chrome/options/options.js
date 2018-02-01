// Options.js
function save_options() {
	var setting_liveMonitoring = document.getElementById("live-monitoring").checked;
	chrome.storage.sync.set({ "live-monitoring": setting_liveMonitoring }, () => {
		var status = document.getElementById("status");
		status.textContent = "Options saved.";
		setTimeout(function() {
			status.textContent = "";
		}, 750);
	});
}

function init() {
	chrome.storage.sync.get(["live-monitoring"], function(item) {
		if (Object.keys(item).length == 0) {
			chrome.storage.sync.set({ "live-monitoring": true }, function() {
				console.log("Settings saved");
			});
		} else {
			chrome.storage.sync.get(["live-monitoring"], item => {
				var likesColor = document.getElementById("live-monitoring");

				likesColor.checked = item["live-monitoring"];
			});
		}
	});
}

document.addEventListener("DOMContentLoaded", init, false);
document.getElementById("save").addEventListener("click", save_options, false);
