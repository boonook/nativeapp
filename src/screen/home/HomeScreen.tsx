import React,{useEffect,useState} from "react";
import _ from 'lodash';
import { StyleSheet, ScrollView,StatusBar} from 'react-native';
import {
    Text,
    View,
    Button,
    Colors,
    Typography,
    Card,
    Icon,
    Assets,
    Picker,
    DateTimePicker,
    TouchableOpacity,
    Incubator,
  } from 'react-native-ui-lib';
import Headers from '@/Components/header/Headers';
import Languagess from '@/language/Language'
import {longOptions} from './longOptions';
import {size} from '@/utils';
let HomeScreen = (props:any)=>{
    const ButtonSpace = 20;
    const {Toast} = Incubator;
    let dropdown = require('./chevronDown.png');
    const options = [
        {label: 'JavaScript', value: 'js'},
        {label: 'Java', value: 'java'},
        {label: 'Python', value: 'python'},
        {label: 'C++', value: 'c++', disabled: true},
        {label: 'Perl', value: 'perl'}
    ];
    let [language,setLanguage] = useState(undefined);
    let [toastShow,setToastShow] = useState(false);
    let [animationConfig,setAnimationConfig] = useState({});
    let [loading,setLoading] = useState(true);
    let [languages,setLanguages] = useState(options[2].value);
    let [nativePickerValue,setNativePickerValue] = useState('java');

    function getCustomInputValue(value: string){
        if (!value) {
          return 'Default';
        }
        return value.includes((new Date().getFullYear() + 1).toString()) ? 'Next Year' : value;
    };

    function renderCustomInput(props: {value: string}, toggle: (shouldToggle: boolean) => void){
        const {value} = props;
        return (
            <TouchableOpacity
            flex
            row
            spread
            onPress={() => {
                toggle(true);
            }}
            >
            <Text>Valid from</Text>
            <Text absR color={Colors.primary} text80BO>
                {getCustomInputValue(value)}
            </Text>
            </TouchableOpacity>
        );
    };
    useEffect(()=>{
        StatusBar.setHidden(false);
        setTimeout(() => {
            setAnimationConfig(
                {
                    animation: "fadeOut",
                    onAnimationEnd: () => setLoading(false),
                }
              );
        }, 2500);
    },[])
    return (
            <View style={{flex: 1, backgroundColor: '#eee'}}>
                <Headers
                    title={Languagess.t("home.title")}
                    border={true}
                    backgroundColor={'#fff'}
                    centerColor={'#666'}
                    barStyle={0}
                    {...props}
                />
                <ScrollView>
                    <View style={{margin:size(20)}}>
                        <Text blue50 text20>Welcome</Text>
                        <Icon
                            margin-30
                            size={size(24)}
                            tintColor={'orange'}
                            source={Assets.icons.search}
                        />
                        <Text style={styles.title}>Buttons</Text>
                        <Button
                            backgroundColor="#30B650"
                            label="SHUFFLE PLAY"
                            labelStyle={{fontWeight: '600'}}
                            style={{marginBottom: ButtonSpace}}
                            enableShadow
                        />
                        <Button
                            backgroundColor="#FB3C62"
                            label="Get 3 Months Free"
                            borderRadius={size(7)}
                            style={{height:size(45), marginBottom: ButtonSpace}}
                        />
                        <Button
                            label={'Red Button'}
                            backgroundColor={Colors.red30}
                            style={{marginBottom: ButtonSpace}}
                        />
                    </View>
                    <View style={styles.cardbox}>
                        <View style={styles.cardboxItem}>
                            <Card flex height={size(160)} onPress={() => {}} useNative activeOpacity={1}>
                                <Card.Section
                                    bg-red30
                                    padding-20
                                    flex-3
                                    content={[
                                        {text: 'Special sale!', text70: true, white: true},
                                        {text: '10%', text60: true, white: true}
                                    ]}
                                    contentStyle={{alignItems: 'center'}}
                                />
                                <Card.Section
                                    bg-white
                                    padding-20
                                    flex
                                    content={[{text: 'All site', text70: true, grey10: true}]}
                                    contentStyle={{alignItems: 'center', margin: 0, padding: 0}}
                                />
                            </Card>
                        </View>
                        <View style={styles.cardboxItem}>
                            <Card flex height={size(160)} onPress={() => {}} useNative activeOpacity={1}>
                                <Card.Section
                                    bg-red30
                                    padding-20
                                    flex-3
                                    content={[
                                        {text: 'Special sale!', text70: true, white: true},
                                        {text: '10%', text60: true, white: true}
                                    ]}
                                    contentStyle={{alignItems: 'center'}}
                                />
                                <Card.Section
                                    bg-white
                                    padding-20
                                    flex
                                    content={[{text: 'All site', text70: true, grey10: true}]}
                                    contentStyle={{alignItems: 'center', margin: 0, padding: 0}}
                                />
                            </Card>
                        </View>
                    </View>
                    <View style={styles.cardbox}>
                        <View style={styles.cardboxItem}>
                            <Card flex height={size(160)} onPress={() => {}} useNative activeOpacity={1}>
                                <Card.Section
                                    bg-red30
                                    padding-20
                                    flex-3
                                    content={[
                                        {text: 'Special sale!', text70: true, white: true},
                                        {text: '10%', text60: true, white: true}
                                    ]}
                                    contentStyle={{alignItems: 'center'}}
                                />
                                <Card.Section
                                    bg-white
                                    padding-20
                                    flex
                                    content={[{text: 'All site', text70: true, grey10: true}]}
                                    contentStyle={{alignItems: 'center', margin: 0, padding: 0}}
                                />
                            </Card>
                        </View>
                    </View>
                    <View padding-20>
                        <Text text40>Picker</Text>
                        <Picker
                            placeholder="Favorite Language"
                            floatingPlaceholder
                            value={language}
                            // enableModalBlur={false}
                            onChange={item => setLanguage(item)}
                            topBarProps={{title: 'Languages',useSafeArea:true}}
                            style={{color: Colors.red20}}
                            showSearch
                            searchPlaceholder={'Search a language'}
                            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
                            // onSearchChange={value => console.warn('value', value)}
                        >
                            {_.map(longOptions, option => (
                                <Picker.Item key={option.value} value={option} disabled={option.disabled}/>
                            ))}
                        </Picker>
                        <View>
                            <Picker
                                marginT-20
                                topBarProps={{title: 'Languages Two',useSafeArea:true}}
                                placeholder="Favorite Languages (up to 3)"
                                value={languages}
                                onChange={items => setLanguages(items)}
                                mode={Picker.modes.MULTI}
                                selectionLimit={3}
                                rightIconSource={dropdown}
                            >
                                {_.map(options, option => (
                                <Picker.Item key={option.value} value={option} disabled={option.disabled}/>
                                ))}
                            </Picker>
                        </View>
                        <View>
                            <Picker
                                title="Native Picker"
                                placeholder="Pick a Language"
                                useNativePicker
                                value={nativePickerValue}
                                onChange={nativePickerValue => setNativePickerValue(nativePickerValue)}
                                rightIconSource={dropdown}
                                containerStyle={{marginTop: 20}}
                                renderPicker={() => {
                                  return (
                                    <View>
                                      <Text>Open Native Picker!{nativePickerValue}</Text>
                                    </View>
                                  );
                                }}
                                topBarProps={{doneLabel: '确定', cancelLabel: '取消'}}
                            >
                                {_.map(options, option => (
                                    <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}/>
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View padding-20>
                        <Text text40>Date Time Picker</Text>
                        <DateTimePicker
                            // @ts-expect-error
                            containerStyle={{marginVertical: size(20)}}
                            title={'Date'}
                            placeholder={'Select a date'}
                            dateFormat={'MMM D, YYYY'}
                            value={new Date('October 13, 2014')}
                        />
                        <Text text60R marginT-40>
                            Custom Input
                        </Text>
                        <DateTimePicker
                            containerStyle={{marginVertical: size(20)}}
                            title={'Date'}
                            placeholder={'Select a date'}
                            // @ts-expect-error
                            renderInput={renderCustomInput}
                            dateFormat={'MMM D, YYYY'}
                            // value={new Date('2015-03-25T12:00:00-06:30')}
                        />
                        <View>
                            <Text text60R marginT-40>
                                Custom Toast
                            </Text>
                        </View>
                        <Button
                            backgroundColor="#FB3C62"
                            label="Get 3 Months Free"
                            borderRadius={size(7)}
                            style={{height: size(45), marginBottom: ButtonSpace}}
                            onPress={()=>{
                                setToastShow(true);
                            }}
                        />
                        {/* {loading && (<LoaderScreen
                                color={Colors.blue60}
                                message="Loading..."
                                overlay
                                backgroundColor="rgba(0,0,0,0.2)"
                                {...animationConfig}
                            />
                        )} */}
                    </View>
                </ScrollView>
                <Toast
                    visible={toastShow}
                    position={'bottom'}
                    showLoader={true}
                    backgroundColor="rgba(0,0,0,0.5)"
                    message='数据加载异常！'
                    messageStyle={{color:'#fff'}}
                    autoDismiss={3000}
                    onDismiss={() =>{
                        setToastShow(false);
                        console.log('dismissed')
                    }}
                />
            </View>
        )
};

const styles = StyleSheet.create({
    title: {
        ...Typography.text20
    },
    cardbox:{
        flexDirection:'row',
        marginLeft:size(15),
        marginTop:size(15)
    },
    cardboxItem:{
        flex:1,
        marginRight:size(15)
    }
})

export default HomeScreen;

