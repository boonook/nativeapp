import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Routers from '@/Routers';
import appState from '@/store/index';
import StoreContext from '@/contexts/storeContext';
import Modal from '@/toast/ToastModal';
import Toast from '@/toast/Toast';
import Loading from '@/toast/ToastLoading';
import {ThemeContextProvider} from '@/theme/ThemeContextProvider'
let App = (props:any)=>{
    console.log(props);
    return (
        <View style={styles.app}>
            <Loading />
            <Toast />
            <Modal />
            <ThemeContextProvider>
                <StoreContext.Provider value={appState}>
                    <Routers />
                </StoreContext.Provider>
            </ThemeContextProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    app: {
        position: "relative",
        backgroundColor: "#000",
        flex: 1
    }
})

export default App;
