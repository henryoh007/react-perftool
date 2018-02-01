// lib
import { Props } from "../../../../lib/l.d";

export interface Data {
	name: string;
	"Initial Mount": number | string;
	"Re-rendered": number;
	"Update Time": number | string;
	shouldComponentUpdate: boolean;
}

export interface AppState {
	data: Data[];
	time: number;
	monitoring: boolean;
	liveMonitoring: boolean;
}

interface Messages {
	req: string;
	from: string;
	data?: any;
}

interface SendMessage {
	req: string;
	from: "devTool";
}

declare namespace chrome.runtime {
	interface Port {
		postMessage: (message: SendMessage) => void;
	}
}
