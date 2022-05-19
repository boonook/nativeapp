import * as React from 'react';
import Routers from '@/Routers';
import appState from '@/store/index';
import StoreContext from '@/contexts/storeContext';
let App = (props:any)=>{
    console.log(props);
    return (
        <>
            <StoreContext.Provider value={appState}>
                <Routers />
            </StoreContext.Provider>
        </>
    );
}

export default App;
