import React from 'react';
import axios from 'axios';
import * as actionType from '../../../constants/actionTypes';
import { API_ROOT } from '../../../constants/actionTypes';
import PieChart from './../PieChart';
import Table from './../Table';
import { notify } from 'react-notify-toast';
class MonthlyContinents extends React.Component {
  constructor() {
    super();
  this.state = {
    monthlyContinents: null,
    pieMonthlyContinents: null,
    newsletterFilters: null,
  };
}

  async componentDidMount() {
	const newsletter_filter = JSON.parse(
		localStorage.getItem("newsletter_filter")
	);
	if ("newsletter_filter" in localStorage) {
		this.state.newsletterFilters = newsletter_filter;
	}
    await this.getMonthlyContinentsData();
  }

  componentDidUpdate() {
    if (this.props.error) {
      notify.show(this.props.error, "error");
    }
  }

  async getMonthlyContinentsData() {
    let year = new Date().getFullYear();
    let url = `${API_ROOT}/api/newsletter-monthly-continent?year=${year}`;
    if (this.state.newsletterFilters !== null) {
      year = this.state.newsletterFilters.year;
      url = `${API_ROOT}/api/newsletter-monthly-continent?year=${year}`;
      if (Object.keys(this.state.newsletterFilters.period).length !== 0) {
        let period_id = this.state.newsletterFilters.period.period_id;
        url = `${url}&period_id=${period_id}`;
      }
    }
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          let monthContinents = [];
          const chartData = [["Task", "Points"]];
          response.data.map((continentData) => {
            monthContinents.push(continentData);
            chartData.push([continentData.title, continentData.points]);
          });
          this.setState({
            monthlyContinents: monthContinents,
            pieMonthlyContinents: chartData,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const thead = {
      sn: "#",
      title: "Continent",
      points: "Point",
      change: "%Change",
      mbig: "M-Big",
      big: "Big",
      medium: "Medium",
      small: "Small",
      btg: "BTG",
      full: "Full Sets",
    };
    return (
      <React.Fragment>
        <div className="top-content">
          <h3 className="m-0">MONTHLY CONTINENTS</h3>
        </div>
        {this.state.pieMonthlyContinents !== null ? (
          <PieChart
            key={this.state.pieMonthlyContinents.index}
            data={this.state.pieMonthlyContinents}
          />
        ) : null}
        {this.state.monthlyContinents !== null ? (
          <Table
            thead={thead}
            key={this.state.monthlyContinents.index}
            data={this.state.monthlyContinents}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default MonthlyContinents;
