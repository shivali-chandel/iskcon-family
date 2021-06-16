import React, { PureComponent } from 'react';
import axios from 'axios';
import * as actionType from '../../../constants/actionTypes';
import { API_ROOT } from '../../../constants/actionTypes';
import PieChart from '../PieChart';
import Table from '../Table';
import { notify } from 'react-notify-toast';
class AllTemples extends PureComponent {
  state = {
    AllTemples: null,
    pieAllTemples: null,
    newsletterFilters: null,
  };

  async componentDidMount() {
    const newsletter_filter = JSON.parse(
      localStorage.getItem("newsletter_filter")
    );
    if ("newsletter_filter" in localStorage) {
      this.state.newsletterFilters = newsletter_filter;
    }
    await this.getAllTemplesData();
  }

  componentDidUpdate() {
    if (this.props.error) {
      notify.show(this.props.error, "error");
    }
  }

  async getAllTemplesData() {
    let year = new Date().getFullYear();
    let url = `${API_ROOT}/api/newsletter-all-temples?year=${year}`;
    if (this.state.newsletterFilters !== null) {
      year = this.state.newsletterFilters.year;
      url = `${API_ROOT}/api/newsletter-all-temples?year=${year}`;
      if (Object.keys(this.state.newsletterFilters.period).length !== 0) {
        let period_id = this.state.newsletterFilters.period.period_id;
        url = `${url}&period_id=${period_id}`;
      }
    }
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          let temples = [];
          const chartData = [["Task", "Points"]];
          response.data.map((continentData) => {
            temples.push(continentData);
            chartData.push([continentData.title, continentData.points]);
          });
          this.setState({
            AllTemples: temples,
            pieAllTemples: chartData,
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
      title: "Temples",
      country: "",
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
          <h3 className="m-0">ALL TEMPLES</h3>
        </div>
        {/* {this.state.pieAllTemples !== null ? (
          <PieChart
            key={this.state.pieAllTemples.index}
            data={this.state.pieAllTemples}
          />
        ) : null} */}
        {this.state.AllTemples !== null ? (
          <Table
            thead={thead}
            key={this.state.AllTemples.index}
            data={this.state.AllTemples}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default AllTemples;
