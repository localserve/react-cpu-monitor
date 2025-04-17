import { useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import Chart, { ChartConfiguration, ChartData } from "chart.js/auto";
import TableMemory from "./TableMemory";

interface IMemory {
  used: number[];
  free: number[];
}

export default function StackedBarChartMemory({ used, free }: IMemory) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const data: ChartData = {
      labels: ["RAM"],
      datasets: [
        { label: "used", backgroundColor: "#ff0000", data: used },
        { label: "free", backgroundColor: "#00ff00", data: free },
      ],
    };

    const config: ChartConfiguration = {
      type: "bar",
      data,
      options: {
        animation: { duration: 0 },
        responsive: true,
      },
    };

    chartRef.current = new Chart(ctx, config);
  }, [used, free]);

  return (
    <Card bg="light" text="dark" style={{ width: "30rem" }}>
      <Card.Header>Memory</Card.Header>
      <canvas id="stackedBarChartCanvas" ref={canvasRef} />
      <Card.Body>
        <TableMemory used={used} free={free} />
      </Card.Body>
    </Card>
  );
}
