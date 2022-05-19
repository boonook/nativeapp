import {size} from '@/utils';
import {StyleSheet} from 'react-native';
const colors = {
    primary:'#3875F6',
    primay_button:'#3875F6',
    normal:'#999999',
    subtitle:'#333333',
    intro:'#666666'
}
const main = StyleSheet.create({
    center:{
        display:'flex',
        justifyContent:"center",
        alignItems:'center'
    },
    column:{
        display:'flex',
        flexDirection:'column'
    },
    full:{
        flex:1,
    },
    columnCenter:{
        flexDirection:"column",
        alignItems:"center"
    },
    rowCenter:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    row:{
        flexDirection:"row",
    },
    rowVCenter:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start"
    },
    sp:{
        justifyContent:'space-between'
    },
    sa:{
        justifyContent:'space-around'
    },
    asp:{
        backgroundColor:'#f00'
    },
    shadow:{
        backgroundColor:'#fff',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: '#000000',
        elevation: 4,
    },
})


const button = StyleSheet.create({
    round:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
        paddingVertical:8,
        paddingHorizontal:16
    },
    gost:{
        borderWidth:1,
        borderColor:colors.primary
    },
    corner:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        paddingVertical:8,
        paddingHorizontal:16
    },
})

const texts = StyleSheet.create({
    bold:{
        fontWeight:'bold'
    },
    boldTitle:{
        fontWeight:'bold',
        fontSize:size(16),
        color:colors.intro
    },
    intro:{
        fontSize:size(12),
        color:colors.normal
    }
})

const nav = StyleSheet.create({
    button:{
        paddingRight:16,
    },
    img:{
        width:size(16),
        height:size(16)
    }
})


const icons = StyleSheet.create({
    arrowRight:{
        width:size(10),
        height:size(16)
    },
    round:{
        width:size(31),
        height:size(31)
    }
})

const space = StyleSheet.create({

})

export {
    main,
    button,
    colors,
    texts,
    nav,
    icons,
    space
}
