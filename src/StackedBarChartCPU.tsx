import React, {RefObject} from 'react';
import Chart, {ChartConfiguration} from 'chart.js';
import {Card} from 'react-bootstrap';

interface IStackedBarChart {
    data: (number[])[];
}

class StackedBarChartCPU extends React.Component<IStackedBarChart, IStackedBarChart> {
    private stackedBarChartRef: RefObject<HTMLCanvasElement>;

    constructor(props: IStackedBarChart) {
        super(props);
        this.stackedBarChartRef = React.createRef();
        this.drawStackedBarChart = this.drawStackedBarChart.bind(this);
    }

    drawStackedBarChart() {
        const canvas = this.stackedBarChartRef.current as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        const data = {
            labels: this.props.data[0].map((_, i) => `#${i + 1}`),
            datasets: [
                {
                    label: 'user',
                    backgroundColor: '#ff0000',
                    data: [...this.props.data[0]]
                },
                {
                    label: 'sys',
                    backgroundColor: '#00ff00',
                    data: [...this.props.data[1]]
                },
                {
                    label: 'idle',
                    backgroundColor: '#0000ff',
                    data: [...this.props.data[2]]
                }
            ]
        };
        const configuration: ChartConfiguration = {
            type: 'bar',
            data: data,
            options: {
                animation: {
                    duration: 0
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        };
        new Chart(context, configuration);
    }

    componentDidMount() {
        this.drawStackedBarChart();
    }

    componentDidUpdate(prevProps: Readonly<IStackedBarChart>, prevState: Readonly<IStackedBarChart>, snapshot?: any) {
        this.drawStackedBarChart();
    }

    render() {
        return (
            <Card bg="light" text="dark" style={{width: "30rem"}}>
                <Card.Header>CPU</Card.Header>
                <canvas id="stackedBarChartCanvas" ref={this.stackedBarChartRef}/>
            </Card>
        );
    }
}

export default StackedBarChartCPU;
