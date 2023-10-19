import { StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert, Dimensions} from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { TextDecoder } from 'util'
import { useFocusEffect } from '@react-navigation/native';
import instance from './axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const BfideScreen = ({navigation,route}) => {

const Buffer = require('buffer').Buffer;
  
    
    
    
  const temp = route.params.name

  const temp1 = temp.indexOf('_')
  const temp2 = temp.indexOf('_',temp1+1)
  const name = temp.substring(0,temp2)

  const reason = route.params.reason
  const status = route.params.status
  const email = route.params.email
  const date  = new Date(route.params.date)
  const id = route.params.id
  const mode = route.params.mode
  console.log(mode)
  const [data, setData] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      // Place your code here to run when the component gains focus
      instance.post('getpdf',{id:id}).then(
        (res)=>{
            // console.log(res.data.content)
            setData(res.data.content)
        }
      )
    }, [])
  );

  
  

  const approve = (id) =>{
    instance.post('approveBonafide',({id:id,mode:mode})).then(
        (res)=>{
            if(res.data.message==="success"){
                Alert.alert('Success', 'Bonafide has been approved succeesfully', [{ text: 'OK' }]);
            }
            else{
                Alert.alert('Failed', 'Could not process the request', [{ text: 'OK' }]);
            }
        }
    )
  }
  
  const reject = (id)=>{
    instance.post('rejectBonafide',({id:id, mode:mode})).then(
        (res)=>{
            if(res.data.message==="success"){
                Alert.alert('Success', 'Bonafide has been Rejected succeesfully', [{ text: 'OK' }]);
            }
            else{
                Alert.alert('Failed', 'Could not process the request', [{ text: 'OK' }]);
            }
        }
    )
  }

    
  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
   <View style={styles.container}>
   <View style={styles.topBar}>
      <Text style={styles.topText}>{name}</Text>
      </View>
    
    <View style={styles.dContainer}>
        <Text style={styles.dText}>
        <Text style={styles.label}>Requested by: </Text>{email}</Text>
        <Text style={styles.dText}>
        <Text style={styles.label}>Reason: </Text>{reason}</Text>
        <Text style={styles.dText}>
        <Text style={styles.label}>Status: </Text>{status}</Text>
        <Text style={styles.dText}>
        <Text style={styles.label}>Applied on: </Text>{date.toDateString()}</Text>

    </View>

    <View style={styles.bContainer }>
    <TouchableOpacity style={styles.btn}
        onPress={()=>{
            approve(id)
        }}>

       <View style={styles.button}>
           <Text style={styles.bText}>Approve</Text>
      
       </View>
   </TouchableOpacity>
   
   
    
    <TouchableOpacity style={styles.btn}
    onPress={()=>{
        reject(id)
    }}>
       
        <View style={styles.button}>
            <Text style={styles.bText}>Reject</Text>
       
        </View>
    </TouchableOpacity>
    </View>

   </View>
  </View>
  </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
   
  )
}


export default BfideScreen

const styles = StyleSheet.create({
container:{
  flex:1,
  justifyContent: 'center',
  alignItems: 'center',
},
topBar:{
  backgroundColor:"#0782F9",
  height:300,
  width:'100%',
  borderBottomLeftRadius:50,
  borderBottomRightRadius:50,
  marginBottom:30,
  alignItems:'center',

},
topText:{
  marginTop:'38%',
  color:'white',
  fontSize:33,
  marginLeft:'8%',
  marginRight:'8%'
  
},

dContainer:{
    marginTop:'20%',

},

dText:{
    marginBottom:10,
}
,
label:{
    fontWeight:'bold'
},
button:{
    padding:15,
    borderRadius:10,
},

bText:{
    color:'white'
},
bContainer:{
    marginTop:'20%',
    width:'80%',
    
},
btn:{
    
    backgroundColor:'black',
    alignItems:'center',
    borderRadius:10,
    marginTop:'5%'
}


})