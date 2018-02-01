// <Record/>
import * as React from "react";
import * as Popover from "react-awesome-popover";
import { inject, observer } from "mobx-react";

import "react-awesome-popover/dest/react-awesome-popover.css";

const Record = ({ monitoring, liveMonitoring, record }) => {
	function fn() {
		if (liveMonitoring !== !liveMonitoring) {
			if (!liveMonitoring) {
				record();
			}
		}
	}
	return (
		<Popover placement="bottom-start" action="hover" arrow={false}>
			<div onClick={fn}>
				{monitoring ? (
					<img
						width="18.50"
						height="18.50"
						src={`${chrome.extension.getURL("./panel/src/res/icons/record_red.svg")}`}
					/>
				) : (
					<img
						width="18.50"
						height="18.50"
						src={`${chrome.extension.getURL(
							"./panel/src/res/icons/ic_fiber_manual_record_black_24px.svg"
						)}`}
					/>
				)}
			</div>
			<p>Record</p>
		</Popover>
	);
};

export default Record;
