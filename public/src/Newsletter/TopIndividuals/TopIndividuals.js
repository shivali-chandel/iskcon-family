import React from 'react';
import axios from 'axios';
import { API_ROOT } from '../../../constants/actionTypes';
import PieChart from './../PieChart';
import Table from './../Table';
import { notify } from 'react-notify-toast';
class TopIndividuals extends React.Component {
  constructor() {
    super();
    this.state = {
    topIndividuals: null,
    pietopIndividuals: null,
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
    await this.getTopIndividualsData();
  }

  componentDidUpdate() {
    if (this.props.error) {
      notify.show(this.props.error, "error");
    }
  }

  async getTopIndividualsData() {
    let year = new Date().getFullYear();
    let url = `${API_ROOT}/api/newsletter-top-individuals?year=${year}`;
    if (this.state.newsletterFilters !== null) {
      year = this.state.newsletterFilters.year;
      url = `${API_ROOT}/api/newsletter-top-individuals?year=${year}`;
      if (Object.keys(this.state.newsletterFilters.period).length !== 0) {
        let start_date = this.state.newsletterFilters.period.start_date;
        let end_date = this.state.newsletterFilters.period.end_date;
        url = `${url}&start_date=${start_date}&end_date=${end_date}`;
      }
    }
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          let topIndividualss = [];
          const chartData = [["Task", "Points"]];
          response.data.map((individualsData) => {
            topIndividualss.push(individualsData);
            chartData.push([individualsData.title, individualsData.points]);
          });
          this.setState({
            topIndividuals: topIndividualss,
            pietopIndividuals: chartData,
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
      picture: "",
      title: "Individuals",
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
      <div>
        <div className="top-content">
          <h3 className="m-0">TOP 50 INDIVIDUALS</h3>
        </div>
        {this.state.pietopIndividuals !== null ? (
          <PieChart
            key={this.state.pietopIndividuals.index}
            data={this.state.pietopIndividuals}
          />
        ) : null}

        {this.state.topIndividuals !== null ? (
          <Table
            tablefor={"top-individuals"}
            thead={thead}
            key={this.state.topIndividuals.index}
            data={this.state.topIndividuals}
          />
        ) : null}
      </div>
    );
  }
}

export default TopIndividuals;
