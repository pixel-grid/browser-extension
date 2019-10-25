import PluginEnableErrorReason from './Models/pluginEnableErrorReason';

export interface IPluginStore {
    enabled: boolean;
    switching: boolean;
    errorReason?: PluginEnableErrorReason;
}

const defaultState: IPluginStore = {
    enabled: false,
    switching: false,
    errorReason: undefined
};

export default defaultState;
