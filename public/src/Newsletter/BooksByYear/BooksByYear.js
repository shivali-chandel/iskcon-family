import React from 'react';
import axios from 'axios';
import * as actionType from '../../../constants/actionTypes';
import { API_ROOT } from '../../../constants/actionTypes';
import BarGraph from './../BarGraph';
import { notify } from 'react-notify-toast';
class BooksByYear extends React.Component {
  constructor() {
    super();
  this.state = {
    chartBooksByYear: null,
  };
}

  async componentDidMount() {
    await this.getBooksByYearData();
  }

  componentDidUpdate() {
    if (this.props.error) {
      notify.show(this.props.error, "error");
    }
  }

  async getBooksByYearData() {
    let url = `${API_ROOT}/api/newsletter-book-points-byyear`;
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          let BookYear = [];
          const chartData = [["Year", "Book Points"]];
          response.data.map((yearData) => {
            BookYear.push(yearData);
            chartData.push([yearData.title, yearData.points]);
          });
          if (BookYear === undefined || BookYear.length == 0) {
            chartData.push(['', 0]);
          }
          this.setState({
            chartBooksByYear: chartData,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="top-content">
          <h3 className="m-0"> WORLDWIDE BOOK DISTRIBUTION - Total Literatures Distributed</h3>
        </div>
        {this.state.chartBooksByYear !== null ? (
          <BarGraph
            key={this.state.chartBooksByYear.index}
            data={this.state.chartBooksByYear}
            haxis={"Year"}
            vaxix={"Book Points"}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default BooksByYear;
