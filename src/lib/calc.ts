// Calc

export function unsetAll(name: string) {
	window.perfTool = {
		...window.perfTool,
		[name]: {
			...window.perfTool[name],
			["Initial Mount"]: 0,
			["Update Time"]: 0,
			["Re-rendered"]: 0
		}
	};
}

export function setup(name: string, result: number | boolean, prop: string) {
	window.perfTool = {
		...window.perfTool,
		[name]: {
			...window.perfTool[name],
			[prop]: result
		}
	};
}

export function calc(t1: any, t0: any): number {
	return parseFloat((t1 - t0).toFixed(4));
}
