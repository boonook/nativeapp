import React,{useEffect,useState,useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import Headers from '@/Components/header/Headers';
import moment from 'moment'
import ImageScreen from '@/Components/Image/ImageScreen';
import {ListFooter,ListEmptyComponent} from '@/utils/ListFooter'
import CLoading from '@/Components/CLoading'
import {size} from '@/utils';
let MerchantScreen = (props:any)=>{
    let [list,setList] = useState([{},{},{},{},{},{},{},{},{},{}]);
    let [total,setTotal] = useState(10000);
    let [refreshing,setRefreshing] = useState(false);
    let [refreshing2,setRefreshing2] = useState(false);
    let [isLoading,setIsLoading] = useState(true);
    let flastlist = useRef(null);

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        },2000)
    },[]);

    function onDetail(data){
        
    }

    function handleRefresh(){
        setRefreshing(true);
        let timer = setTimeout(()=>{
            setList([...[{},{},{},{},{},{},{},{},{},{}]]);
            setRefreshing(false);
            clearTimeout(timer)
        },1500)
    }

    function handleLoadMore(){
        if(list.length<10){
            return false;
        }else{
            if(list.length!=total){
                let timer:any = setTimeout(()=>{
                    let data = [...list];
                    setList([...data,...[{},{},{},{},{},{},{},{},{},{}]]);
                    clearTimeout(timer)
                },500)
            }
        }
    }

    function wait(timeout){
        return new Promise((resolve:any)=>{
            setTimeout(resolve,timeout)
        })
    }

    function onRefresh(){
        setRefreshing2(true);
        wait(2000).then(()=>setRefreshing2(false))
    }

    return (
        <View style={styles.container}>
            <Headers
                backgroundColor={'#f9f9f9'}
                centerColor={'#666'}
                barStyle={0}
                title={'购物车'}
                {...props}
            />
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <CLoading loading={isLoading}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={list}
                        refreshControl={
                            <RefreshControl refreshing={refreshing2} onRefresh={onRefresh} tintColor={'#0078ff'}/>
                        }
                        renderItem={({ item,index }) => (
                            <TouchableOpacity onPress={()=>onDetail(item)}>
                                <View style={[styles.listItem,{borderBottomWidth:(list.length==index+1)?0:1}]}>
                                    <View style={styles.touxiang}>
                                        <ImageScreen width={size(30)} source={require('@/assess/images/me/wd_icon_gj08.png')}/>
                                    </View>
                                    <View style={styles.listItemRight}>
                                        <View style={styles.listItemRightTop}>
                                            <Text  style={styles.listItemRightTopText} numberOfLines={2}>
                                                How to Change Resolution - All About Images - Research Guides at University of Michigan Library
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.listItemRightFooterText}>{moment(new Date()).format('YYYY-MM-DD HH:mm')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={()=>ListFooter({list,total})}
                        onRefresh={handleRefresh}
                        refreshing={refreshing}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListEmptyComponent={()=>ListEmptyComponent()}
                    />
                </CLoading>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
        backgroundColor:'#fff',
        padding:size(10),
        marginTop:size(10),
        borderRadius:size(5),
        borderBottomColor:'#f9f9f9',
        borderStyle:'solid'
    },
    listItemRight:{
        flex:1,
        flexDirection:'column',
        paddingLeft:size(15),
        paddingRight:size(15),
        marginTop:size(5),
        marginBottom:size(5),
    },
    listItemRightTop:{
        flex:1
    },
    listItemRightFooterText:{
        color:'#999',
        marginTop:size(10),
        fontSize:size(12)
    },
    listItemRightTopText:{
        lineHeight:size(20),
        fontSize:size(16)
    },
    touxiang:{
        width:size(100),
        height:size(100),
        backgroundColor:'#f9f9f9',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:size(8)
    }
});

export default MerchantScreen;

