import "./index.css";
import { useState, useEffect } from "react";
import Charts from "./Charts";

const initCpuData = [
    [10, 20, 30, 40],
    [20, 30, 40, 50],
    [70, 50, 30, 10],
];

const TIMING = 1000;

async function fetchData() {
    const res = await fetch("http://localhost:50123/cpu_info");
    const data = JSON.parse((await res.json()).cpu_info);
    const { cpus, memory } = data;
    const minUser =
        Math.min.apply(
            null,
            cpus.map((i: any) => i.user)
        ) - 1000;
    const minSys =
        Math.min.apply(
            null,
            cpus.map((i: any) => i.sys)
        ) - 1000;
    const minIdle =
        Math.min.apply(
            null,
            cpus.map((i: any) => i.idle)
        ) - 1000;
    const user = cpus.map((i: any) => (((i.user - minUser) % 10000) / 200) % 100).map((i: number) => Math.floor(i));
    const sys = cpus.map((i: any) => (((i.sys - minSys) % 10000) / 200) % 100).map((i: number) => Math.floor(i));
    const idle = cpus.map((i: any) => (((i.idle - minIdle) % 10000) / 200) % 100).map((i: number) => Math.floor(i));

    const memoryData = {
        used: [Math.ceil((100 * memory.used) / memory.total)],
        free: [Math.floor((100 * memory.free) / memory.total)],
    };
    const cpuData = [user, sys, idle];

    return { cpuData, memoryData };
}

function App() {
    const [cpu, setCpu] = useState(initCpuData);
    const [memory, setMemory] = useState({ used: [50], free: [50] });
    useEffect(() => {
        const id = setInterval(async () => {
            try {
                const { cpuData, memoryData } = await fetchData();
                setCpu(cpuData);
                setMemory(memoryData);
            } catch (e) {
                console.log(e);
            }
        }, TIMING);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="flex f:v gap:4">
            <h1 className="heading tt:u">CPU Monitor</h1>
            <Charts cpu={cpu} memory={memory} />
        </div>
    );
}

export default App;
