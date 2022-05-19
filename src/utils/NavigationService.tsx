import { CommonActions,StackActions } from '@react-navigation/native';

let navigator;
function setTopLevelNavigator (navigatorRef) {
    navigator = navigatorRef;
}

function navigate (routeName, params = {}) {
    navigator.dispatch(
        CommonActions.navigate({
            name: routeName,
            params: params,
        })
    );
}

function replace (routeName, params = {}) {
    navigator.dispatch(
        StackActions.replace(routeName,params)
    );
}

function reset (routeName,params = {}) {
    navigator.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [
                {
                    name:routeName,
                    params: params,
                },
            ],
        })
    );
}

function goBack () {
    navigator.dispatch(CommonActions.goBack());
}

export default {
    navigate,
    reset,
    goBack,
    setTopLevelNavigator,
    replace
};
