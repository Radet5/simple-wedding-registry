import React from 'react';

import './item.scss';

const Item = (props) => {
	const { item } = props;
	return <div key={`item`} className='m-item' onClick={props.onClick}>
		<div className='m-item__name'>{item.name}</div>
		<div className='m-item__price'>{`$${item.price}`}</div>
		<a href={`http://${item.url}`} className='m-item__link'>{item.url}</a>
	</div>
}

export default Item;