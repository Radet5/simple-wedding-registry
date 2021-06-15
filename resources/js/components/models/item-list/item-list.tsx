import React from 'react';
import Item from './item/item';

import './item-list.scss';

const ItemList = (props) => {
	return <div className='itemList'>
		{props.items.map(item => {
			return <div key={`itemContainer-${item.id}`} className='itemList__itemContainer'><Item key={`item-${item.id}`}
				     item={item}
				     onClick={()=>{alert(`oh you WANNA BUY ${item.id}???`)}}
				/></div>
		})}
	</div>
}

export default ItemList;