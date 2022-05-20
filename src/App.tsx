import * as React from 'react';
import Routers from '@/Routers';
import appState from '@/store/index';
import StoreContext from '@/contexts/storeContext';
import {ThemeContextProvider} from '@/theme/ThemeContextProvider'
let App = (props:any)=>{
    console.log(props);
    return (
        <ThemeContextProvider>
            <StoreContext.Provider value={appState}>
                <Routers />
            </StoreContext.Provider>
        </ThemeContextProvider>
    );
}

export default App;
