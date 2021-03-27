import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';

interface ITableCPUProps {
    data: (number[])[]
}

function getCpusFromData(data: (number[])[]) {
    return data.reduce((a: (number[])[], c: number[], j:number) => {
        c.forEach((v: number, i:number) => a[i][j] = v);
        return a;
    }, [[], [], [], []]);
}

enum SortBy {
    USER = 0,
    SYS,
    IDLE
}


function TableCPU(props: ITableCPUProps) {
    const [cpus, setCpus] = useState(getCpusFromData(props.data));
    const [sortedBy, setSortedBy] = useState(SortBy.USER);

    function sortCpu(cpus: (number[])[], by: SortBy = SortBy.USER) {
        const out = cpus.sort((a: number[], b: number[]) => b[by] - a[by]);
        setSortedBy(by);
        return out;
    }

    useEffect(() => {
        setCpus(sortCpu(getCpusFromData(props.data), sortedBy));
    }, [props.data, sortedBy]);

    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>#</th>
                <th style={{cursor: "pointer"}} onClick={() => setCpus(sortCpu(cpus, SortBy.USER))}>user</th>
                <th style={{cursor: "pointer"}} onClick={() => setCpus(sortCpu(cpus, SortBy.SYS))}>sys</th>
                <th style={{cursor: "pointer"}} onClick={() => setCpus(sortCpu(cpus, SortBy.IDLE))}>idle</th>
            </tr>
            </thead>
            <tbody>
            {cpus.map((cpu: number[], i: number) =>
                (<tr key={i + 1 + "tr-cpu"}>
                    <th>#{i + 1}</th>
                    {cpu.map((c, j) => <th key={j + 1 + "th-cpu"}>{c}</th>)}
                </tr>)
            )}
            </tbody>
        </Table>
    );
}

export default TableCPU;
