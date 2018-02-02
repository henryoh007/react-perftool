// <Welcome/>
import * as React from "react";
import "./index.scss";

export default function Welcome(props) {
	const Logo = chrome.extension.getURL("./panel/src/res/icons/react-logo.svg");
	return (
		<div className="react-perftool-container">
			<div className="align-center">
				<img src={`${Logo}`} width="100" height="100" />
				<div>
					<p>Welcome to React Performance tab.</p>
					<p>Inspect the performance of React Js components.</p>
					<p>For more information, go to <span onClick={fn} className="github-link">github</span></p>
				</div>
			</div>
		</div>
	);
}
