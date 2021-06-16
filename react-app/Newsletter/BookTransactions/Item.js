import React from "react";
import { Link } from "react-router-dom";
const Item = props => {
    if (props.item.id == "month" || props.item.id == "year") {
        return (
            <div className='box1 calendar-block'>
                <div className='figcaption'>
                    <h3>{props.item.data.title}</h3>
                    <h2>{props.item.data.points}</h2>
                </div>
            </div>
        );
    }else{
        return (
            <div className='box1'>
                <img
                    className='mahabooks'
                    src={props.item.data.image}
                    alt='Medium books'
                />
                <div className='figcaption'>
                    <h2>{props.item.data.points}</h2>
                    <span>{props.item.data.title}</span>
                </div>
            </div>
        );   
    }
};
export default Item;


