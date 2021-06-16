import React, { PureComponent } from 'react';
import axios from 'axios';
import * as actionType from '../../../constants/actionTypes';
import { API_ROOT } from '../../../constants/actionTypes';
import BarGraph from './../BarGraph';
import Table from './../Table';
import { notify } from 'react-notify-toast';
class CongregationalPreaching extends PureComponent {
  state = {
    congregationalPreachings: null,
    chartCongPreachings: null,
    newsletterFilters: null,
  };

  async componentDidMount() {
	const newsletter_filter = JSON.parse(
      localStorage.getItem("newsletter_filter")
    );
    if ("newsletter_filter" in localStorage) {
      this.state.newsletterFilters = newsletter_filter;
    }
    await this.getCongregationalPreachingsData();
  }

  componentDidUpdate() {
    if (this.props.error) {
      notify.show(this.props.error, "error");
    }
  }

  async getCongregationalPreachingsData() {
    let year = new Date().getFullYear();
    let url = `${API_ROOT}/api/newsletter-congregational-preaching?year=${year}`;
    if (this.state.newsletterFilters !== null) {
      year = this.state.newsletterFilters.year;
      url = `${API_ROOT}/api/newsletter-congregational-preaching?year=${year}`;
      if (Object.keys(this.state.newsletterFilters.period).length !== 0) {
        let period_id = this.state.newsletterFilters.period.period_id;
        url = `${url}&period_id=${period_id}`;
      }
    }
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          let CongPreaching = [];
          const chartData = [["Congregation", "Points"]];
          response.data.map((preachingData) => {
            CongPreaching.push(preachingData);
            chartData.push([preachingData.title, preachingData.points]);
          });
          if (CongPreaching === undefined || CongPreaching.length == 0) {
            chartData.push(['', 0]);
          }
          this.setState({
            congregationalPreachings: CongPreaching,
            chartCongPreachings: chartData,
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
      title: "Congregation",
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
          <h3 className="m-0"> CONGREGATIONAL PREACHING</h3>
        </div>
        {this.state.chartCongPreachings !== null ? (
          <BarGraph
            key={this.state.chartCongPreachings.index}
            data={this.state.chartCongPreachings}
            haxis={"Congregation"}
            vaxix={"Points"}
          />
        ) : null}
        {this.state.congregationalPreachings !== null ? (
          <Table
            tablefor={"top-individuals"}
            thead={thead}
            key={this.state.congregationalPreachings.index}
            data={this.state.congregationalPreachings}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default CongregationalPreaching;
