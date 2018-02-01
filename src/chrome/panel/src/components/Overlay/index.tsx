// <Overlay/>
import * as React from "react";
import "./index.scss";
import { inject, observer } from "mobx-react";

const Overlay = inject(({ store }) => ({
	time: store.time,
	stop: store.stopTimerAndMonitoring
}))(
	observer(({ time, stop }) => (
		<div className="react-perftool-overlay">
			<div className="react-perftool-overlay-inner">
				<div className="react-perftool-overlay-inner-inner">
					<table>
						<tr>
							<td className="react-perftool-overlay-stats">Status</td>
							<td>Profilling...</td>
						</tr>
						<tr>
							<td className="react-perftool-overlay-stats">Time</td>
							<td>{time} sec</td>
						</tr>
					</table>
					<button onClick={stop}>Stop</button>
				</div>
			</div>
		</div>
	))
);

export default Overlay;
