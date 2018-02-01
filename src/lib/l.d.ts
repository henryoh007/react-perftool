// l
export interface OProps {
	LIVE_MONITORING: any;
	isDevPanelOpened: any;
}

export interface Props {
	"Initial Mount": number;
	"Update Time": number;
	"Re-rendered": number;
	shouldComponentUpdate: boolean;
}
declare global {
	interface Window {
		store: any;
		perfTool: {
			[keys: string]: Props | OProps;
		};
		doo: any;
	}
}
