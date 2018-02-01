// Fn
import { OProps } from "./l.d";

function start(PTOptions: OProps) {
	if (PTOptions.isDevPanelOpened) {
		if (PTOptions.LIVE_MONITORING) {
			window.doo();
		}
	}
}

export default start;
