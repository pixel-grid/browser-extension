export interface IPluginStore {
    enabled: boolean;
    switching: boolean;
    errorMessage?: string;
}

const defaultState: IPluginStore = {
    enabled: false,
    switching: false,
    errorMessage: undefined
};

export default defaultState;
