import './list.pcss';

import * as React from 'react';

import classnames from 'classnames';
import { resolveAssetUrl } from '@/Helpers/environment';

const grid = require('./assets/grid.svg');
const rows = require('./assets/rows.svg');
const columns = require('./assets/columns.svg');

interface IListProps {
    items: { id: string; name: string; type?: 'grid' | 'rows' | 'columns' }[];
    selectedIndex?: number;
    noItemsText?: string;
    onSelect?: (id: string, index?: number) => void;
}

const List: React.FC<IListProps> = ({
    items,
    selectedIndex,
    noItemsText = 'No items yet',
    onSelect
}) => (
    <div className="list">
        {items.map((item, index) => (
            <button
                key={index}
                className={classnames('list__button', {
                    list__button_active: index === selectedIndex
                })}
                onClick={() => onSelect && onSelect(item.id, index)}
            >
                <div className="list__button-title">{item.name}</div>
                <div className="list__button-icon">
                    {(item.type === undefined || item.type === 'grid') && (
                        <img src={resolveAssetUrl(grid)} />
                    )}
                    {item.type === 'rows' && (
                        <img src={resolveAssetUrl(rows)} />
                    )}
                    {item.type === 'columns' && (
                        <img src={resolveAssetUrl(columns)} />
                    )}
                </div>
            </button>
        ))}
        {(items === undefined || items.length === 0) && (
            <p className="list__error">{noItemsText}</p>
        )}
    </div>
);

export default List;
