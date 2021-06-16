import React from 'react';
import axios from 'axios';
import * as actionType from '../../../constants/actionTypes';
import { API_ROOT } from '../../../constants/actionTypes';
import PieChart from './../PieChart';
import Table from './../Table';
import { notify } from 'react-notify-toast';
class TopTenCountriesCumulative extends React.Component {
  constructor() {
    super();
    this.state = {
    cumulativeCountries: null,
    pieCumulativeCountries: null,
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
    await this.getTopCumulativeCountriesData();
  }

  componentDidUpdate() {
    if (this.props.error) {
      notify.show(this.props.error, "error");
    }
  }

  async getTopCumulativeCountriesData() {
    let year = new Date().getFullYear();
    let url = `${API_ROOT}/api/newsletter-topten-countries-cumulative?year=${year}`;
    if (this.state.newsletterFilters !== null) {
      year = this.state.newsletterFilters.year;
      url = `${API_ROOT}/api/newsletter-topten-countries-cumulative?year=${year}`;
      if (Object.keys(this.state.newsletterFilters.period).length !== 0) {
        let period_id = this.state.newsletterFilters.period.period_id;
        url = `${url}&period_id=${period_id}`;
      }
    }
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          let countries = [];
          const chartData = [["Task", "Points"]];
          response.data.map((countryData) => {
            countries.push(countryData);
            chartData.push([countryData.title, countryData.points]);
          });
          this.setState({
            cumulativeCountries: countries,
            pieCumulativeCountries: chartData,
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
          <h3 className="m-0">TOP TEN COUNTRIES (CUMULATIVE)</h3>
        </div>
        {this.state.pieCumulativeCountries !== null ? (
          <PieChart
            key={this.state.pieCumulativeCountries.index}
            data={this.state.pieCumulativeCountries}
          />
        ) : null}
        {this.state.cumulativeCountries !== null ? (
          <Table
            thead={thead}
            key={this.state.cumulativeCountries.index}
            data={this.state.cumulativeCountries}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default TopTenCountriesCumulative;
