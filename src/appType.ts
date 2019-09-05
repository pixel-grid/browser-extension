import * as React from 'react';

const AppContext = React.createContext<{ type: 'app' | 'options' }>({
    type: 'app'
});

export default AppContext;
