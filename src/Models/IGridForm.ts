export default interface IGridForm {
    layout: 'grid' | 'columns' | 'rows';

    gridSize?: number;
    gridColor?: string;
    gridOpacity?: number;

    columnsCount?: number;
    columnsColor?: string;
    columnsOpacity?: number;
    columnsType?: 'left' | 'right' | 'center' | 'stretch';
    columnsWidth?: number;
    columnsOffset?: number;
    columnsMargin?: number;
    columnsGutter?: number;

    rowsCount?: number;
    rowsColor?: string;
    rowsOpacity?: number;
    rowsType?: 'top' | 'bottom' | 'center' | 'stretch';
    rowsHeight?: number;
    rowsOffset?: number;
    rowsMargin?: number;
    rowsGutter?: number;

    mediaQueryType: undefined | 'raw' | 'boundaries';
    mediaQueryRaw: string;
    mediaQueryFrom: string;
    mediaQueryTo: string;
}
