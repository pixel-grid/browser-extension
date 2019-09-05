import IGridForm from '@/Models/IGridForm.ts';

export default function generateGridName(grid: IGridForm): string {
    if (grid.layout === 'grid') {
        return `Grid (${grid.gridSize}px)`;
    } else if (grid.layout === 'columns') {
        return `${grid.columnsCount || ''} ${
            grid.columnsCount === 1 ? 'Column' : 'Columns'
        } ${
            grid.columnsWidth !== undefined
                ? `(${grid.columnsWidth}px)`
                : '(auto)'
        }`.trim();
    } else if (grid.layout === 'rows') {
        return `${grid.rowsCount || ''} ${
            grid.rowsCount === 1 ? 'Row' : 'Rows'
        } ${
            grid.rowsHeight !== undefined ? `(${grid.rowsHeight}px)` : '(auto)'
        }`.trim();
    }

    return `Grid: ${grid.layout}`;
}
