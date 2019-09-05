import { IGridBase } from "@sergeyzwezdin/pixelgrid";

export default interface IPreset {
  id: string;
  name: string;
  grids: {
    grid: IGridBase;
    mediaQuery?: string;
  }[];
}
