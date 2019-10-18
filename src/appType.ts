import { createContext } from 'react';

const AppContext = createContext<{ type: 'app' | 'options' }>({
    type: 'app'
});

export default AppContext;
