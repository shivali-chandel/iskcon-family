import React from 'react';
import DatePicker from 'react-datepicker';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { API_ROOT } from '../constants/actionTypes';
import { CONTINENTS, YEARS } from '../constants/masters';
import GenerateNewsLetter from './GenerateNewsLetter'
import axios from 'axios';
import { notify } from "react-notify-toast";

class DesktopFilters extends React.Component {
  constructor(props) {
    super(props);
   this.state = {
    isLoading: false,
    periods: [],
    group_id: 0,
    distributor_id: 0,
    group_name: "",
    distributor_name: "",
    start_date: "",
    end_date: "",
    year: new Date().getFullYear(),
    continent: CONTINENTS[4],
    period: "",
    country: "United States",
    typeaheadOptionsPeriod: [],
    userData : {},
    showNewsletter : false
  };
  this.newsletter_filter = {
    year: this.state.year,
    period: [],
  };

  this.getPeriod = this.getPeriod.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
  this.clickNewsletter = this.clickNewsletter.bind(this);
  this.changeHandler = this.changeHandler.bind(this);
  
}

async getPeriod ()  {
    const periods = await axios
      .get(`${API_ROOT}/api/periods?type=MSF&status=Open`)
      .then((result) => {
       // console.log('result is', result)
        if (result.status === 200) {
          return result.data;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
   // console.log('thisss', this)
   this.setState({ periods: periods });
  };

  onSubmitFilter (event) {
    event.preventDefault();
    // const filters = { ...this.state };
    delete filters.isLoading;
    delete filters.periods;
    delete filters.period;
    this.props.getFilters(filters);
  };

  clickNewsletter (event)  {
    event.preventDefault();
    if (this.state.period.length !== 0)
    {
    let period = {
      period_id : this.state.period[0].id,
      start_date : this.state.period[0].start,
      end_date : this.state.period[0].end,
      name : this.state.period[0].name,
    }
    this.newsletter_filter['period'] = period
    localStorage.setItem(
      "newsletter_filter",
      JSON.stringify(this.newsletter_filter)
    );
    this.setState({showNewsletter : true})
  }
  else {
    alert("Please select period")
  }

  };

  componentDidMount() {
    const user_info = JSON.parse(localStorage.getItem('user_info'));
    if(user_info !== null){
      this.setState({userData : user_info})
		}
    this.getPeriod();
    // localStorage.setItem(
    //   "newsletter_filter",
    //   JSON.stringify(this.state.newsletter_filter)
    // );
  }

  changeHandler (event, identifier)  {
      if (identifier === "year") {
        this.setState({ periods: [], year : event.target.value });
      }
      this.newsletter_filter[identifier] = event.currentTarget.value;
     // console.log('filter', this.newsletter_filter)
   
  //  this.typeahead.getInstance().clear();
  };



   handleInputChange (query) {
     // console.log('query', query);
     // console.log('selected year', this.state.year)
      this.setState({ isLoading: true });
      fetch(
        API_ROOT +
          `/api/search-period?q=${query}&year=${this.state.year}`
      )
        .then((resp) => resp.json())
        .then((json) => {
          // console.log('returnedValue', json)
          this.setState({
            isLoading: false,
            typeaheadOptionsPeriod: json,
          })
        });
 //   setQuery(q);
  };

  render() {
    return (
      <div className="filter-block">
       <div style={{fontSize: 25,
      fontWeight: 'bold'}}>Generate Newsletter</div> 
        <div className="accordion" id="accordionExample">
          <div className="card" style={{marginTop:30}}>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-12">
                      <div className="row" id="period_select">
                        <div className="col-12 col-sm-6 col-lg-3">
                          <div className="form-group">
                            <select
                              className="form-control"
                              onChange={(event) =>
                                this.changeHandler(event, "year")
                              }
                              value={this.state.year}
                            >
                              <option value="">Select Year</option>
                              {YEARS.map((year, indx) => (
                                <option key={"yr" + indx + 1}>{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                          <div className="form-group">
                            <AsyncTypeahead
                              id="period-filter"
                              placeholder="Choose period..."
                              isLoading={this.state.isLoading}
                              labelKey={(option) => `${option.name}`}
                              onInputChange={this.handleInputChange}
                              onChange={(selected) => {
                                this.setState({period : selected})
                              }}
                              onSearch={(query) => {
                              }}
                              ref={(typeahead) => (this.typeahead = typeahead)}
                              options={this.state.typeaheadOptionsPeriod}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form-group">
                            <AsyncTypeahead
                              id="group-filter"
                              placeholder="Choose group..."
                              isLoading={this.state.isLoading}
                              labelKey={(option) => `${option.name}`}
                              onChange={(selected) => {
                                this.setState({
                                  group_id:
                                    typeof selected[0] === "undefined"
                                      ? 0
                                      : selected[0].id,
                                  group_name:
                                    typeof selected[0] === "undefined"
                                      ? ""
                                      : selected[0].name,
                                });
                              }}
                              onSearch={(query) => {
                                this.setState({ isLoading: true });
                                fetch(API_ROOT + `/api/search-group?q=${query}`)
                                  .then((resp) => resp.json())
                                  .then((json) => {
                                    this.setState({
                                      isLoading: false,
                                      typeaheadOptions: json,
                                    })
                              });
                              }}
                              options={this.state.typeaheadOptions}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                        <div className="form-group">
                            <AsyncTypeahead
                              id="distributor-filter"
                              placeholder="Choose distributor..."
                              isLoading={this.state.isLoading}
                              labelKey={(option) => `${option.name}`}
                              onChange={(selected) => {
                                this.setState({
                                  distributor_id:
                                    typeof selected[0] === "undefined"
                                      ? 0
                                      : selected[0].id,
                                  distributor_name:
                                    typeof selected[0] === "undefined"
                                      ? ""
                                      : selected[0].name,
                                });
                              }}
                              onSearch={(query) => {
                                this.setState({ isLoading: true });
                                fetch(
                                  API_ROOT + `/api/search-people?q=${query}`
                                )
                                  .then((resp) => resp.json())
                                  .then((json) =>
                                    this.setState({
                                      isLoading: false,
                                      typeaheadOptions: json,
                                    })
                                  );
                              }}
                              options={this.state.typeaheadOptions}
                            />
                          </div>
                        </div>
                        <div className="col-3 display-none">
                          <div className="form-group" style={{ marginTop: 15 }}>
                            <DatePicker
                              onChange={(event) =>
                                this.changeHandler(event, "start_date")
                              }
                              selected={this.state.start_date}
                              className="form-control"
                              placeholderText="Start Date"
                            />
                          </div>
                        </div>
                        <div className="col-3 display-none">
                          <div className="form-group" style={{ marginTop: 15 }}>
                            <DatePicker
                              onChange={(event) =>
                                this.changeHandler(event, "end_date")
                              }
                              selected={this.state.end_date}
                              className="form-control"
                              placeholderText="End Date"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                          <button
                            type="click"
                            className="btn btn_apply"
                            style={{ marginTop: 15 }}
                            onClick={(event) => this.clickNewsletter(event)}
                          >
                            Generate Newsletter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
          </div>
        </div> 
      </div>
    );
  }
}

export default DesktopFilters;
