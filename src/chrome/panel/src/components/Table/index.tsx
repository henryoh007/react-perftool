// <DisplayTable/>

import * as React from "react";
import { inject, observer } from "mobx-react";

import { TableProps } from "../panel.d";
import "./index.scss";
import { Column, Table, SortDirection } from "react-virtualized/dist/es/Table";
import { AutoSizer } from "react-virtualized/dist/es/AutoSizer";

@inject(({ store }) => ({
	data: store.data,
	sortByName: store.sortByName,
	sortByNumber: store.sortByNumber,
	direction:store.direction
}))
@observer
export default class DisplayTable extends React.Component<TableProps, {}> {
	sortDirection: any;
	sortBy: string;

	constructor(props: any) {
		super(props);

		this.sortBy = "name";
		this.sortDirection = 'asc';
		window.t = this;
	}
	componentDidMount() {
		console.log("mounted");
	}

	sort(sort: { sortBy: string }) {
		this.sortDirection == "desc"
			? (this.sortDirection = 'asc')
			: (this.sortDirection = 'desc');

		this.sortBy = sort.sortBy;
		if (sort.sortBy == "name") {
			this.props.sortByName(this.sortDirection);
		} else if (sort.sortBy == "Initial Mount") {
			this.props.sortByNumber(this.sortDirection, "Initial Mount");
		} else if (sort.sortBy == "Re-rendered") {
			this.props.sortByNumber(this.sortDirection, "Re-rendered");
		} else if (sort.sortBy == "Update Time") {
			this.props.sortByNumber(this.sortDirection, "Update Time");
		} else {
			this.props.sortByBool(this.sortDirection);
		}
	}

	render() {
		const self = this;
		return (
			<AutoSizer>
				{({ width, height }) => (
					<Table
						gridClassName="1"
						rowClassName="rowHeader"
						className="table"
						headerClassName="header"
						width={width} //1093
						height={height - 27}
						headerHeight={20}
						rowHeight={18}
						sort={this.sort.bind(this)}
						sortDirection={this.sortDirection.toUpperCase()}
						sortBy={this.sortBy}
						rowCount={this.props.data.length}
						rowGetter={({ index }) => self.props.data[index]}
					>
						<Column label="Name" dataKey="name" width={1000} />
						<Column label="Initial Mount (ms)" dataKey="Initial Mount" width={1000} />
						<Column label="Re-rendered" dataKey="Re-rendered" width={1000} />
						<Column label="Update Time (ms)" dataKey="Update Time" width={1000} />
						<Column label="shouldComponentUpdate" dataKey="shouldComponentUpdate" width={1000} />
					</Table>
				)}
			</AutoSizer>
		);
	}
}
