import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';

interface ITableCPUProps {
    data: (number[])[];
}

function TableCPU(props: ITableCPUProps) {

    return (
        <Table striped bordered hover size="sm">
            <thead>
            </thead>
            <tbody>
            {props.data.map((cpu: number[], i: number) =>
                (<tr key={i + 1 + "tr-cpu"}>
                    {cpu.map((c, j) => <th key={j + 1 + "th-cpu"}>{c}</th>)}
                </tr>)
            )}
            </tbody>
        </Table>
    );
}

export default TableCPU;
