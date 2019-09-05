import IGridForm from '@/Models/IGridForm';

export default interface IPresetForm {
    id?: string;
    name: string;
    grids: IGridForm[];
    changed: boolean;
}
