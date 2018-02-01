// <Header/>
import * as React from "react";
import "./index.scss";
import { inject, observer } from "mobx-react";

import Record from "../Record/index";
import Clear from "../Clear/index";

const Header = inject(({ store }) => ({
	clear: store.clear,
	startTimerAndMonitoring: store.startTimerAndMonitoring,
	liveMonitoring: store.liveMonitoring,
	monitoring: store.monitoring
}))(
	observer(({ clear, startTimerAndMonitoring, liveMonitoring, monitoring }) => (
		<div className="react-perftool-header">
			<Record
				liveMonitoring={liveMonitoring}
				monitoring={monitoring}
				record={startTimerAndMonitoring}
			/>
			<Clear clear={clear} />
			<div className="header-divider" />
		</div>
	))
);

export default Header;
