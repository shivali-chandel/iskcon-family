import React from 'react';
import * as actionType from '../../constants/actionTypes';
const Table = (props) => {
	let row = 1;
	return (
		<div className={'table-block ' + props.tablefor}>
			<table className='table'>
				<thead>
					<tr>
						{Object.values(props.thead).map((th, indx) => (
							<th key={indx}>{th}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{props.data !== undefined
						? props.data.map((rowData) => (
							
								<tr key={row}>
									{Object.keys(props.thead).map((th, indx) => {
										if (th === 'sn') {
											return <td key={indx}>{row++}</td>;
										}
										if (th === 'picture') {
											return (
												<td key={indx}>
													<img
														className='list-book-icon'
														src={
															rowData[th] ? rowData[th] : '../../images/user_icons.png'
														}
														alt={rowData.title}
													/>
												</td>
											);
										}
										return (
											<td key={indx}>
												{(th === 'title' || th === 'country') ? rowData[th] : actionType.numberWithCommas(rowData[th])}
											</td>
										);
									})}
								</tr>
						  ))
						: null}
				</tbody>
			</table>
		</div>
	);
};
export default Table;
