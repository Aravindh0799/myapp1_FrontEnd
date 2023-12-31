import { StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import instance from './axios'
import * as Print from 'expo-print';
import { useFocusEffect } from '@react-navigation/native';

const TrackScreen = ({navigation,route}) => {
    const email = route.params.email
    const mode = route.params.mode
    const dept = route.params.dept
    var year = null

    if(mode ==="fac"){
        year = route.params.year
        console.log("year ", year)
    }
    const [bdata,setBdata] = useState("")

    useFocusEffect(
        React.useCallback(() => {
        
        
        if(mode==="stud"){
        instance.post("/getBonafides",{email:email,mode:mode,dept:dept}).then(
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
    }

    else if(mode==="fac"){
        instance.post("/getBonafidesFac",{email:email,mode:mode,dept:dept,year:year}).then(
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
    }

    else if(mode==="hod"){
        instance.post("/getBonafidesHod",{email:email,mode:mode,dept:dept}).then(
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
    }

    else if(mode==="prc"){
        instance.post("/getBonafidesPrc",{email:email,mode:mode}).then(
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
    }


    }, [mode, email, dept, year])
    );


    const printPdf =async(id)=>{
            var data = null
            console.log("d pdf")
            await instance.post("/getpdf",{id:id}).then(
                (res)=>{
                    // console.log(res.data.content)
                    if(res.data.message==="download"){
                    data = res.data.content
                    // console.log(data)
                    }
                }
            )

            if(data){
                console.log(data)
            const my_uri = `data:application/pdf;base64,${data}`;
            await Print.printAsync({uri:my_uri});
            }

            else{
                Alert.alert(
                
                    'Not approved',
                    'Your bonafide could not be downloaded',
                    [
                        {
                          text: 'OK', // Button text
                        },
                      ],
                    {
                      cancelable: true,
                    },
                )
            }
    }

    const blist = () =>{
        if(bdata && Array.isArray(bdata)){
        return bdata.reverse().map(element=>{
        return(
            <TouchableOpacity
                onPress={()=>{
                    if(mode==="fac" || mode ==="hod" || mode=="prc"){
                        navigation.navigate('Bfide',{name:element.name,reason:element.b_type,status:element.status,mail:element.email,date:element.createdAt,
                                            id:element._id,mode:mode,dept:dept,email:email,year:year})
                    }
                    else{
                        printPdf(element._id)
                    }
                }
            }
            >
                <View key={element._id} style={styles.cards}>
                <Text style={styles.dName}>{element.name}</Text>
                
                {mode==="fac"?(<Text style={styles.dText}>Reason: {element.b_type}</Text>):""}
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

    
    if(mode==="stud"){
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

    else{
        return (

            <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            
            <View style={styles.inner}>
            <View style={styles.container}>
            <View style={styles.topBar}>
            <Text style={styles.topText}>Requests</Text>
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
      width:'100%',
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
        backgroundColor:'green',
        height:80,
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
        marginBottom:2,
      },

      
    })