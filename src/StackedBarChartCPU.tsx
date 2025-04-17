import { useRef, useEffect } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import { Card } from "react-bootstrap";

interface IStackedBarChart {
  data: number[][];
}

export default function StackedBarChartCPU({ data }: IStackedBarChart) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const chartData = {
      labels: data[0].map((_, i) => `#${i + 1}`),
      datasets: [
        { label: "user", backgroundColor: "#ff0000", data: [...data[0]] },
        { label: "sys", backgroundColor: "#00ff00", data: [...data[1]] },
        { label: "idle", backgroundColor: "#0000ff", data: [...data[2]] },
      ],
    };

    const config: ChartConfiguration = {
      type: "bar",
      data: chartData,
      options: {
        animation: { duration: 0 },
        responsive: true,
      },
    };

    chartRef.current = new Chart(ctx, config);
  }, [data]);

  return (
    <Card bg="light" text="dark" style={{ width: "30rem" }}>
      <Card.Header>CPU</Card.Header>
      <canvas id="stackedBarChartCanvas" ref={canvasRef} />
    </Card>
  );
}
