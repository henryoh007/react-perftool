import * as React from "react";

import "react-virtualized/styles.css"; 

import { observer, inject } from "mobx-react";

import DisplayTable from "./components/Table/index";
import Welcome from "./components/Welcome/index";
import Header from "./components/Header/index";
import Overlay from "./components/Overlay/index";

import { Data } from "./state/state.d";

interface AppProps {
	readonly monitoring: boolean;
	readonly dataLength: number;
	readonly liveMonitoring: boolean;
}

@inject(({ store }) => ({
	dataLength:store.dl,
	liveMonitoring: store.liveMonitoring,
	monitoring: store.monitoring
}))
@observer
export default class App extends React.Component<AppProps, {}> {
	componentDidUpdate(){
		console.log('updated')
	}
	render() {
		const self = this;

		var res;
		const { liveMonitoring } = this.props;

		if (this.props.liveMonitoring !== undefined) {
			if (this.props.liveMonitoring) {
				if (this.props.dataLength > 0) {
					res = <DisplayTable />;
				} else {
					res = <Welcome liveMonitoring={liveMonitoring} />;
				}
			} else {
				if (this.props.monitoring) {
					res = <><Overlay /><DisplayTable/></>;
				} else {
					if (this.props.dataLength > 0) {
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
