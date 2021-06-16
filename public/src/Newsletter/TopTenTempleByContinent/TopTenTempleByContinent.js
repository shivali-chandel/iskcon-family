import React, { PureComponent } from 'react';
import axios from 'axios';
import { API_ROOT } from '../../../constants/actionTypes';
import { notify } from 'react-notify-toast';
class TopTenTempleByContinent extends React.Component {
	constructor() {
		super();
	this.state = {
		topTenTemples: null,
		pietopIndividuals: null,
	};
}

	async componentDidMount() {
		await this.getTopIndividualsData();
	}

	componentDidUpdate() {
		if (this.props.error) {
			notify.show(this.props.error, 'error');
		}
	}

	async getTopIndividualsData() {
		let year = new Date().getFullYear();
		axios
			.get(API_ROOT + `/api/topten-temple-by-continent?year=${year}`)
			.then((response) => {
				if (response.status === 200) {
					this.setState({ topTenTemples: response.data });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		const thead = {
		sn: "",
		index: "",
		picture: "",
		title: "Address",
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
				<div className='top-content'>
					<h3 className='m-0'>TOP TEN TEMPLE BY CONTINENT</h3>
				</div>
				<div className='table-block'>
					<table className='table'>
						<thead>
							<tr>
								{Object.values(thead).map((th, indx) => (
									<th key={indx}>{th}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{this.state.topTenTemples !== null
								? this.state.topTenTemples.map((continent, indx) => (
										<ContinentTempleData
											key={indx}
											continent={continent.continent}
											temples={continent.temples}
										/>
								  ))
								: null}
						</tbody>
					</table>
				</div>
			</React.Fragment>
		);
	}
}
const ContinentTempleData = (props) => {
	return (
    <React.Fragment>
      <tr>
        <td colSpan={12} style={{textAlign: 'left'}} className="newsletterContinentHeading">
			<h4>TOP TEN TEMPLES - {props.continent}</h4>
        </td>
      </tr>
      {props.temples.map((temple, indx) => (
        <TempleDataTable temple={temple} key={indx} index={indx+1} />
      ))}
    </React.Fragment>
  );
};
const TempleDataTable = (props) => {
	return (
    <tr>
      <td>{props.index}</td>
      <td>{props.temple.name}</td>
      <td>
        <img
          className="list-book-icon"
          src={
            props.temple.picture_url
              ? props.temple.picture_url
              : "./img/user_icons.png"
          }
          alt={props.temple.name}
        />
      </td>
      <td>{props.temple.address}</td>
      <td>{props.temple.total}</td>
      <td>{props.temple.change}</td>
      <td>{props.temple.mbig}</td>
      <td>{props.temple.big}</td>
      <td>{props.temple.medium}</td>
      <td>{props.temple.small}</td>
      <td>{props.temple.btg}</td>
      <td>{props.temple.full}</td>
    </tr>
  );
};
export default TopTenTempleByContinent;
