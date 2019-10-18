import './index.pcss';

import { AddGridView, EditGridView } from '@/Views/EditGrid';
import { AddPresetView, EditPresetView } from '@/Views/EditPreset';
import { HookRouter, useRoutes } from 'hookrouter';
import React, { FunctionComponent } from 'react';
import store, { runSagas } from '@/store';

import AppContext from './appType';
import PresetsView from '@/Views/Presets';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

runSagas();

const routes = {
    '/': () => <PresetsView />,
    '/index.html': () => <PresetsView />,
    '/options.html': () => <PresetsView />,
    '/presets': () => <PresetsView />,
    '/preset': () => <AddPresetView />,
    '/preset/:id': ({ id }: HookRouter.QueryParams) => (
        <EditPresetView {...{ id }} />
    ),
    '/grid': () => <AddGridView />,
    '/grid/:index': ({ index }: HookRouter.QueryParams) => (
        <EditGridView {...{ index: Number(index) }} />
    )
};

const App: FunctionComponent = () => {
    const routeResult = useRoutes(routes);

    return <>{routeResult}</>;
};

render(
    <AppContext.Provider value={{ type: 'options' }}>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContext.Provider>,
    document.getElementById('root')
);
