import typescript from "rollup-plugin-typescript2";
let override = { compilerOptions: { outDir: "./src/chrome/build" } };

export default [
	{
		output: {
			file: "./build/lib/react-perf-extension.js",
			format: "umd",
			name: "ReactPerfToolExtension"
		},
		input: "./src/lib/index.ts",

		plugins: [typescript(/*{ plugin options }*/)]
	}
];

// config file
