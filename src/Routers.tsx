import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, StyleSheet, Image} from 'react-native';
import HomeScreen from '@/screen/home/HomeScreen';
import MeScreen from '@/screen/me/MeScreen';
import LoginScreen from '@/screen/auth/LoginScreen';
import DrawerScreen from '@/screen/drawer/DrawerScreen';
import LoadingScreen from '@/screen/loadinng/LoadingScreen';
import RegisteredScreen from '@/screen/auth/RegisteredScreen';
import ForgetPasswordSccreen from '@/screen/auth/ForgetPasswordSccreen';
import MerchantScreen from '@/screen/merchant/MerchantScreen';
import MySettingScreen from '@/screen/me/common/MySettingScreen';
///修改登陆密码
import EditLoginPwdScreen from '@/screen/me/common/EditLoginPwdScreen';
///修改支付密码
import EditPayPwdScreen from '@/screen/me/common/EditPayPwdScreen';
import WebViewScreen from '@/screen/webview/WebViewScreen';
import ScanCodeScreen from '@/screen/me/common/ScanCodeScreen';
import UserInfoScreen from '@/screen/me/common/UserInfoScreen';
import AboutMeScreen from '@/screen/me/common/AboutMeScreen';
import NavigationService from '@/utils/NavigationService';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Menu = [
    {name:'loading',component:LoadingScreen,params:{statusbar:'dark-content'}},
    {name:'login',component:LoginScreen,params:{statusbar:'dark-content'}},
    {name:'main',component:DrawerApp},
    {name:'scanCode',component:ScanCodeScreen,params:{statusbar:'dark-content'}},
    {name:'registered',component:RegisteredScreen,params:{statusbar:'dark-content'}},
    {name:'forgetPwd',component:ForgetPasswordSccreen,params:{statusbar:'dark-content'}},
    {name:'editLoginPwd',component:EditLoginPwdScreen,params:{statusbar:'dark-content'}},
    {name:'editPayPwd',component:EditPayPwdScreen,params:{statusbar:'dark-content'}},
    {name:'mySetting',component:MySettingScreen,params:{statusbar:'dark-content'}},
    {name:'webView',component:WebViewScreen,params:{statusbar:'dark-content'}},
    {name:'userPage',component:UserInfoScreen,params:{statusbar:'dark-content'}},
    {name:'aboutMe',component:AboutMeScreen,params:{statusbar:'dark-content'}},
];

function HomeTab() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                if (route.name === 'home') {
                    return <View style={styles.tabCenter}>
                            <Image source={focused ? require('@/assess/images/tabs/tab-airport.png') : require('@/assess/images/tabs/tab-airport-outline.png')} style={[styles.IconImage]}/>
                    </View>;
                }
                else if (route.name === 'shoppingcart') {
                    return <View style={styles.tabCenter}>
                            <Image source={focused ? require('@/assess/images/tabs/tab-shop.png') : require('@/assess/images/tabs/tab-shop-outline.png')} style={[styles.IconImage]}/>
                            </View>;
                }
                else if (route.name === 'mine') {
                    return <View style={styles.tabCenter}>
                        <Image source={focused ? require('@/assess/images/tabs/tab-person.png') : require('@/assess/images/tabs/tab-person-outline.png')} style={[styles.IconImage]}/>
                    </View>;
                }
            },
            tabBarActiveTintColor:'#0078ff',
            inactiveTintColor: 'gray',
            initialRouteName:'home',
            tabStyle:{borderColor:'#000000'},
            style:{backgroundColor:'#000000',position:'absolute',borderTopColor:'#000000'},
        })}
        >
            <Tab.Screen name="home" component={HomeScreen} options={{
                tabBarBadge:12,
                tabBarBadgeStyle:{color:'#fff'},
                headerShown: false,
                tabBarLabel:'首页'
            }}/>
            <Tab.Screen name="shoppingcart" component={MerchantScreen} options={{
                // tabBarBadge:12,
                tabBarBadgeStyle:{color:'#fff'},
                headerShown: false,
                tabBarLabel:'购物车'
            }}/>
            <Tab.Screen name="mine" component={MeScreen} options={{
                // tabBarBadge:12,
                tabBarBadgeStyle:{color:'#fff'},
                headerShown: false,
                tabBarLabel:'我的'
            }} />
        </Tab.Navigator>
    );
}

function DrawerApp() {
    return (
        <Drawer.Navigator screenOptions={{
            drawerStyle: {
              backgroundColor: 'orange',
              width:'100%',
            },
          }} drawerContent={(props) => <DrawerScreen {...props} />}>
            <Drawer.Screen options={{ headerShown: false}} name="drawer" component={HomeTab} />
        </Drawer.Navigator>
    );
}

function Routers() {
    return (
        <NavigationContainer  ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef);}}>
            <Stack.Navigator>
                {Menu.map((item,index)=>{
                    return <Stack.Screen options={{ headerShown: false}} key={index.toString()} name={item.name} component={item.component} />;
                })}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabCenter:{
        width:50,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    IconImage:{
        width: 24,
        height: 24,
    },
});

export default Routers;
