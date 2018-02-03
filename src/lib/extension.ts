// Fn, durty
import { OProps } from "./l.d";

function start(options: OProps = window.perfTool.options as OProps) {
	if (options.isDevPanelOpened) {
		if (options.LIVE_MONITORING) {
			window.doo();
		}
	}
}

export default start;
