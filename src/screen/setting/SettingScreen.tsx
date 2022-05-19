import React, { useState } from "react";
import { View, Text} from 'react-native';

const SettingScreen = (props) => {
    const [visible,setVisible] = useState(false);

    function onClose(){
        setVisible(false)
    }

    return(
        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>SettingScreen Screen</Text>
            </View>
        </>
    )
}

export default SettingScreen;
