import React, {RefObject} from 'react';
import {Card} from 'react-bootstrap';
import Chart, {ChartConfiguration, ChartData} from 'chart.js';
import TableMemory from './TableMemory';

interface IMemory {
    used: number[]
    free: number[]
}

class StackedBarChartMemory extends React.Component<IMemory, IMemory> {
    private stackedBarChartRef: RefObject<HTMLCanvasElement>;

    constructor(props: IMemory) {
        super(props);
        this.stackedBarChartRef = React.createRef();
        this.drawStackedBarChart = this.drawStackedBarChart.bind(this);
    }

    drawStackedBarChart() {
        const canvas = this.stackedBarChartRef.current as HTMLCanvasElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        const data: ChartData = {
            labels: ['RAM'],
            datasets: [
                {
                    label: 'used',
                    backgroundColor: '#ff0000',
                    data: this.props.used
                },
                {
                    label: 'free',
                    backgroundColor: '#00ff00',
                    data: this.props.free
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

    componentDidUpdate(prevProps: Readonly<IMemory>, prevState: Readonly<IMemory>, snapshot?: any) {
        this.drawStackedBarChart();
    }

    render() {
        return (
            <Card bg="light" text='dark' style={{width: "30rem"}}>
                <Card.Header>Memory</Card.Header>
                <canvas id="stackedBarChartMemory" ref={this.stackedBarChartRef}/>
                <Card.Body>
                    <TableMemory used={this.props.used} free={this.props.free}/>
                </Card.Body>
            </Card>
        );
    }

}

export default StackedBarChartMemory;
