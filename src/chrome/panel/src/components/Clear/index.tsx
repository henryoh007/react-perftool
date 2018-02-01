// <Clear/>
import * as React from "react";
import * as Popover from "react-awesome-popover";
import { inject, observer } from "mobx-react";

import "react-awesome-popover/dest/react-awesome-popover.css";

const Clear = ({ clear }) => (
	<Popover placement="bottom-start" action="hover" arrow={false}>
		<div onClick={clear}>
			<img
				width="15"
				height="15"
				src={`${chrome.extension.getURL("../panel/src/res/icons/ic_block_black_24px.svg")}`}
			/>
		</div>
		<p>Clear</p>
	</Popover>
);

export default Clear;
