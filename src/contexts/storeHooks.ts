import {useContext} from 'react';
import StoreContext from './storeContext';
import {observer} from 'mobx-react-lite';

function userStore(){
    const store = useContext(StoreContext);
    return store;
}

export {
    observer,
    userStore
}