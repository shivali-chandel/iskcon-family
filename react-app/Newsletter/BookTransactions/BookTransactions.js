import React, { PureComponent } from 'react';
import axios from 'axios';
import * as actionType from '../../../constants/actionTypes';
import { API_ROOT } from '../../../constants/actionTypes';
import Item from './Item';
import { notify } from 'react-notify-toast';
class BookTransactions extends PureComponent {
	state = {
		bookTypeTransactions: null,
		newsletterFilters: null
	};
	async componentDidMount() {
		const newsletter_filter = JSON.parse(localStorage.getItem("newsletter_filter"));
		if ("newsletter_filter" in localStorage) {
			this.state.newsletterFilters = newsletter_filter;
   		}
		await this.getbookTypeTransactions();
	}

	componentDidUpdate() {
		if (this.props.error) {
			notify.show(this.props.error, 'error');
		}
	}

	async getbookTypeTransactions() {
		let year = new Date().getFullYear();
		let url = `${API_ROOT}/api/newsletter-book-types?year=${year}`;
		if (this.state.newsletterFilters !== null) {
			year = this.state.newsletterFilters.year;
			url = `${API_ROOT}/api/newsletter-book-types?year=${year}`;
			if (Object.keys(this.state.newsletterFilters.period).length !== 0) {
				let period_id = this.state.newsletterFilters.period.period_id;
				url = `${url}&period_id=${period_id}`;
			} 
    	}
		axios
			.get(url)
			.then((response) => {
				if (response.status === 200) {
					const bTypeTransactions = response.data;
					this.setState({
						bookTypeTransactions: bTypeTransactions,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		let bookTypes = {
			mbig: {
				title: 'Maha-big Books',
				image: './img/newsletter/maha-books.png',
				points:
					this.state.bookTypeTransactions !== null
						? actionType.numberWithCommas(this.state.bookTypeTransactions.mbig)
						: 0,
			},
			big: {
				title: 'Big Books',
				image: './img/newsletter/Bigbooks.png',
				points:
					this.state.bookTypeTransactions !== null
						? actionType.numberWithCommas(this.state.bookTypeTransactions.big)
						: 0,
			},
			medium: {
				title: 'Medium Books',
				image: './img/newsletter/mediumbooks.png',
				points:
					this.state.bookTypeTransactions !== null
						? actionType.numberWithCommas(
								this.state.bookTypeTransactions.medium
						  )
						: 0,
			},
			small: {
				title: 'Small Books',
				image: './img/newsletter/Smallbooks.png',
				points:
					this.state.bookTypeTransactions !== null
						? actionType.numberWithCommas(this.state.bookTypeTransactions.small)
						: 0,
			},
			magazines: {
				title: 'Magazines',
				image: './img/newsletter/magazines.png',
				points:
					this.state.bookTypeTransactions !== null &&
						this.state.bookTypeTransactions.magazines
						? actionType.numberWithCommas(
							this.state.bookTypeTransactions.magazines
						  )
						: 0,
			},
			btg: {
				title: 'BTG Subscriptions',
				image: './img/newsletter/subscription.png',
				points:
					this.state.bookTypeTransactions !== null
						? actionType.numberWithCommas(this.state.bookTypeTransactions.btg)
						: 0,
			},
			full: {
				title: 'Full Sets',
				image: './img/newsletter/fullsets.png',
				points:
					this.state.bookTypeTransactions !== null
						? actionType.numberWithCommas(this.state.bookTypeTransactions.full)
						: 0,
			},
			month: {
				title:
					this.state.bookTypeTransactions !== null
						? this.state.bookTypeTransactions.month.name
						: 'August',
				image: '',
				points:
					this.state.bookTypeTransactions !== null
						? actionType.numberWithCommas(
								this.state.bookTypeTransactions.month.points
						  )
						: 0,
			},
			year: {
				title:
					this.state.bookTypeTransactions !== null
						? this.state.bookTypeTransactions.year.name
						: 'August',
				image: '',
				points:
					this.state.bookTypeTransactions !== null
						? actionType.numberWithCommas(
								this.state.bookTypeTransactions.year.points
						  )
						: 0,
			},
		};
		let book_types = [];
		for (let key in bookTypes) {
			book_types.push({ id: key, data: bookTypes[key] });
		}
		return (
			<React.Fragment>
				<div className='top-content'>
					<h3 className='m-0'> For the pleasure of Srila Prabhupada </h3>
					<p className='m-0'>
						this page contains the following results for the month of{' '}
						{bookTypes.month.title} {bookTypes.year.title}.
					</p>
				</div>
				<div className='output'>
					{book_types !== null
						? book_types.map((book_type) => (
								<Item key={book_type.id} item={book_type} />
						  ))
						: null}
				</div>
				<div className='output'>
					<div className='full-box'>
						<div className='img-block'>
							<img src='./img/guru-ji.png' alt='Medium books' />
						</div>
						<div className='contet-side'>
							<p className='m-0'>Literatures worldwide since 1965</p>
							<h2 className='m-0'>
								{this.state.bookTypeTransactions !== null
									? this.state.bookTypeTransactions.lifetime_points
										? actionType.numberWithCommas(
												this.state.bookTypeTransactions.lifetime_points
										  )
										: actionType.numberWithCommas(
												this.state.bookTypeTransactions.year.points
										  )
									: 0}
							</h2>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default BookTransactions;
