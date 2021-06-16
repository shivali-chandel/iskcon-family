import React, { PureComponent } from 'react';
import axios from 'axios';
import * as actionType from '../../../constants/actionTypes';
import { API_ROOT } from '../../../constants/actionTypes';
import PieChart from './../PieChart';
import Table from './../Table';
import { notify } from 'react-notify-toast';
class AllCountries extends PureComponent {
  state = {
    AllCountries: null,
    pieAllCountries: null,
    newsletterFilters: null,
  };

  async componentDidMount() {
    const newsletter_filter = JSON.parse(
      localStorage.getItem("newsletter_filter")
    );
    if ("newsletter_filter" in localStorage) {
      this.state.newsletterFilters = newsletter_filter;
    }
    await this.getAllCountriesData();
  }

  componentDidUpdate() {
    if (this.props.error) {
      notify.show(this.props.error, "error");
    }
  }

  async getAllCountriesData() {
    let year = new Date().getFullYear();
    let url = `${API_ROOT}/api/newsletter-all-countries-monthly?year=${year}`;
    if (this.state.newsletterFilters !== null) {
      year = this.state.newsletterFilters.year;
      url = `${API_ROOT}/api/newsletter-all-countries-monthly?year=${year}`;
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
            AllCountries: monthContinents,
            pieAllCountries: chartData,
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
      title: "Country (Temples)",
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
          <h3 className="m-0">ALL COUNTRIES</h3>
        </div>
        {/* {this.state.pieAllCountries !== null ? (
          <PieChart
            key={this.state.pieAllCountries.index}
            data={this.state.pieAllCountries}
          />
        ) : null} */}
        {this.state.AllCountries !== null ? (
          <Table
            thead={thead}
            key={this.state.AllCountries.index}
            data={this.state.AllCountries}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default AllCountries;
