import React from "react";
import { Table } from "react-bootstrap";

interface ITableMemory {
    used: number[];
    free: number[];
}

class TableMemory extends React.Component<ITableMemory, ITableMemory> {
    render() {
        return (
            <div className="flex f:v">
                <div className="flex">
                    <div>used</div>
                    <div>{this.props.used[0]}%</div>
                </div>
                <div className="flex">
                    <div>free</div>
                    <div>{this.props.free[0]}%</div>
                </div>
            </div>
        );
    }
}

export default TableMemory;
