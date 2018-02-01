import * as React from "react";

import "react-virtualized/styles.css"; // only needs to be imported once
//asd
import { observer, inject } from "mobx-react";

import DisplayTable from "./components/Table/index";
import Welcome from "./components/Welcome/index";
import Header from "./components/Header/index";
import Overlay from "./components/Overlay/index";

import { Data } from "./state/state.d";

interface AppProps {
	readonly monitoring: boolean;
	readonly data: Data[];
	readonly liveMonitoring: boolean;
}

@inject(({ store }) => ({
	data: store.data,
	liveMonitoring: store.liveMonitoring,
	monitoring: store.monitoring
}))
@observer
export default class App extends React.Component<AppProps, {}> {
	render() {
		const self = this;

		var res;
		const { liveMonitoring } = this.props;

		if (this.props.liveMonitoring !== undefined) {
			if (this.props.liveMonitoring) {
				if (this.props.data.length > 0) {
					res = <DisplayTable />;
				} else {
					res = <Welcome liveMonitoring={liveMonitoring} />;
				}
			} else {
				if (this.props.monitoring) {
					res = <Overlay />;
				} else {
					if (this.props.data.length > 0) {
						res = <DisplayTable />;
					} else {
						res = <Welcome liveMonitoring={liveMonitoring} />;
					}
				}
			}
		}

		return (
			<div style={{ height: "100%" }}>
				<Header />
				{res}
			</div>
		);
	}
}
