import { Component } from "react";
import StackedBarChartCPU from "./StackedBarChartCPU";
import StackedBarChartMemory from "./StackedBarChartMemory";
// import "bootstrap/dist/css/bootstrap.min.css";

interface ICharts {
    cpu: any;
    memory: any;
}

class Charts extends Component<ICharts, ICharts> {
    render() {
        return (
            <div className="flex f:v gap:4">
                <div>
                    <StackedBarChartCPU data={this.props.cpu} />
                </div>
                <div>
                    <StackedBarChartMemory used={this.props.memory.used} free={this.props.memory.free} />
                </div>
            </div>
        );
    }
}

export default Charts;
