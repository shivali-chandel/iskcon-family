import React from "react";
import Chart from "react-google-charts";

const PieChart = (props) => {
    return props.data != 'undefined' ? (
        <div className='chart-block'>
            <Chart
                width={'100%'}
                height={'500px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={props.data}
                options={{
                    is3D: true,
                    backgroundColor: 'rgb(254, 251, 235)',
                    sliceVisibilityThreshold: 0,
                    legend: { position: 'top', maxLines: 2, alignment: 'center' }
                }}

            />
        </div>
    ) : (
            <div className='chart-block'>Fetching data from API</div>
        )
};
export default PieChart;
