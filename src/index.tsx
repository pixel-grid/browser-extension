import './index.pcss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AddGridView, EditGridView } from '@/Views/EditGrid';
import { AddPresetView, EditPresetView } from '@/Views/EditPreset';
import { HookRouter, usePath, useRoutes } from 'hookrouter';
import store, { runSagas } from '@/store';

import AppContext from './appType';
import MainView from '@/Views/Main';
import PresetsView from '@/Views/Presets';
import { Provider } from 'react-redux';

runSagas();

const routes = {
    '/': () => <MainView />,
    '/index.html': () => <MainView />,
    '/:safari/index.html': () => <MainView />,
    '/presets': () => <PresetsView />,
    '/:safari/presets': () => <PresetsView />,
    '/preset': () => <AddPresetView />,
    '/:safari/preset': () => <AddPresetView />,
    '/preset/:id': ({ id }: HookRouter.QueryParams) => (
        <EditPresetView {...{ id }} />
    ),
    '/:safari/preset/:id': ({ id }: HookRouter.QueryParams) => (
        <EditPresetView {...{ id }} />
    ),
    '/grid': () => <AddGridView />,
    '/:safari/grid': () => <AddGridView />,
    '/grid/:index': ({ index }: HookRouter.QueryParams) => (
        <EditGridView {...{ index: Number(index) }} />
    ),
    '/:safari/grid/:index': ({ index }: HookRouter.QueryParams) => (
        <EditGridView {...{ index: Number(index) }} />
    )
};

const App: React.FC = () => {
    const routeResult = useRoutes(routes);

    return <>{routeResult}</>;
};

ReactDOM.render(
    <AppContext.Provider value={{ type: 'app' }}>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContext.Provider>,
    document.getElementById('root')
);
