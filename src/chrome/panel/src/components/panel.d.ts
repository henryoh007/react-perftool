// devtools
import { Data } from "../state/state.d";

export interface TableProps {
	sortByName: (dir: string) => void;
	sortByNumber: (dir: string, name: string) => void;
	data: Data[];
	sortByBool:(dir:string) => void;
	direction:string;
}
