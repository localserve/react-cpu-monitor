import React from 'react';
import {Table} from 'react-bootstrap';

interface ITableMemory {
    used: number[]
    free: number[]
}

class TableMemory
    extends React.Component<ITableMemory, ITableMemory> {
    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>-</th>
                    <th>used</th>
                    <th>free</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>RAM</td>
                    <td>{this.props.used[0]}%</td>
                    <td>{this.props.free[0]}%</td>
                </tr>
                </tbody>
            </Table>
        );
    }
}

export default TableMemory;

