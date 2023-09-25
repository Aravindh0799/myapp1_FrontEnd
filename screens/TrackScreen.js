import { StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import instance from './axios'


const TrackScreen = ({navigation,route}) => {
    const email = route.params.email

    const [bdata,setBdata] = useState("")

    useEffect(()=>{
        instance.post("/getBonafides",{email:email}).then(
            (res)=>{
                if(res.data.message==="success"){
                    // console.log(res.data.data)
                    const arr = res.data.data
                    setBdata(arr)
                    arr.forEach(element => {
                        console.log(element.name)
                    });
                }
                else{
                    console.log("no data")
                }
            }
            
        ).catch((err)=>{
            console.log("from getBonafide",err)
        })
    },[])

    const blist = () =>{
        if(bdata && Array.isArray(bdata)){
        return bdata.map(element=>{
        return(
            <TouchableOpacity
                onPress={()=>{

                }
            }
            >
                <View key={element._id} style={styles.cards}>
                <Text style={styles.dName}>{element.name}</Text>
                
                <Text style={styles.dText}>Status: {element.status}</Text>
                
                </View>
                
                
            </TouchableOpacity>

        )
       })
    }
       
            
            return(
            
                <View>
                    <Text>No Data</Text>
                </View>
            )
        
    
        
    }

    const elist = ()=>{
        
        return(
            
            <View>
                <Text>No Data</Text>
            </View>
        )
    }

    
    
    return (

        <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
        <View style={styles.inner}>
        <View style={styles.container}>
        <View style={styles.topBar}>
        <Text style={styles.topText}>Track</Text>
        </View>

        <View style={styles.cardsContainer}>
            {bdata?blist():elist()}
        </View>

        </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
    )
}

export default TrackScreen


const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topBar:{
      backgroundColor:"#0782F9",
      height:350,
      width:390,
      borderBottomLeftRadius:50,
      borderBottomRightRadius:50,
      marginBottom:30,
      alignItems:'center',
    
    },
    topText:{
      marginTop:150,
      color:'white',
      fontSize:50,
      
    },

    cards:{
        backgroundColor:'#FF6969',
        height:60,
        width:'100%',
        borderRadius:20,
        // alignItems:'center',
        // textAlignVertical:'center',
        marginBottom:20,
        marginTop:10,
        alignItems:"center"
      },
      
      cardsContainer:{
        width:'90%'
      },
      
      dName:{
        marginTop:'4%',
        marginBottom:'1%',
        color:'white',
        fontSize:15
      },

      dText:{
        color:"white",
        
      },

      
    })