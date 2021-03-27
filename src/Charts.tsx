import React from 'react';
import {Col} from 'react-bootstrap';
import StackedBarChartCPU from './StackedBarChartCPU';
import StackedBarChartMemory from './StackedBarChartMemory';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ICharts {
    cpu: any
    memory: any
}

class Charts extends React.Component<ICharts, ICharts> {

    render() {
        return (
            <React.Fragment>
                <Col md={'auto'}>
                    <StackedBarChartCPU data={this.props.cpu}/>
                </Col>
                <Col md={'auto'}>
                    <StackedBarChartMemory used={this.props.memory.used} free={this.props.memory.free}/>
                </Col>
            </React.Fragment>
        );
    }
}

export default Charts;
