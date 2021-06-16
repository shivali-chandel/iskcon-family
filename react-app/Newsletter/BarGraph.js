import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";

class BarGraph extends Component {
    render() {
        const hAxis = this.props.haxis;
        const vAxis = this.props.vaxix;
        return (
            <div className='chart-block' style={{ alignCenter: 'center' }}>
                <Chart
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={this.props.data}
                    options={{
                        width: '100%',
                        height: 500,
                        is3D: true,
                        hAxis: {
                            title: hAxis,
                        },
                        vAxis: {
                            title: vAxis,
                        },
                        legend: 'none',
                        backgroundColor: 'rgb(254, 251, 235)', 
                    }}
                />
            </div>
        );
    }
}
export default BarGraph;