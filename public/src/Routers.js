import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DesktopFilters from './DesktopFilters'
import GenerateNewsLetter from './GenerateNewsLetter'

const Routers = (props) => {
	return (
		<div className='main_container'>
			<BrowserRouter>
			<Switch>
				<Route path='/news-letter/:year/:period_id' component={GenerateNewsLetter} />
				<Route path='/newsletter' exact component={DesktopFilters} />
			</Switch>
			</BrowserRouter>
		</div>
	);
};
export default Routers;
