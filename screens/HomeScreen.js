import { StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const HomeScreen = ({navigation,route}) => {

  

  const email = route.params.email

  const mode = route.params.mode
  const dept = route.params.dept
  console.log(dept)
  if(mode==="stud")
  {  
  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
   <View style={styles.container}>
   <View style={styles.topBar}>
      <Text style={styles.topText}>Home</Text>
      </View>
    <TouchableOpacity
            onPress={()=>{
                navigation.navigate('Apply',{email:email})
            }}
            style={[styles.button,styles.buttonOutline]}
            >
      <View style={styles.buttonContainer}>
        
          <Text style={styles.buttonOutlineText}>Apply</Text>
          
      </View>
    </TouchableOpacity>

    <TouchableOpacity
            onPress={()=>{
                navigation.navigate('Track',{email:email,mode:mode,dept:dept})
            }}
            style={[styles.button,styles.buttonOutline]}
            >
    <View style={styles.buttonContainer1}>
      
        <Text style={styles.buttonOutlineText}>Track</Text>
        
    </View>
    </TouchableOpacity>
   </View>
  </View>
  </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
   
  )
}

else if(mode ==="fac"){
  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
   <View style={styles.container}>
   <View style={styles.topBar}>
      <Text style={styles.topText}>Home</Text>
      </View>
    <TouchableOpacity
            onPress={()=>{
                navigation.navigate('Track',{email:email,mode:mode,dept:dept})
            }}
            style={[styles.button,styles.buttonOutline]}
            >
    <View style={styles.buttonContainer1}>
      
        <Text style={styles.buttonOutlineText}>Requests</Text>
        
    </View>
    </TouchableOpacity>
   </View>
  </View>
  </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
   
  )
}
}



export default HomeScreen

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

buttonContainer:{
  backgroundColor:'green',
  height:100,
  
  borderRadius:20,
  alignItems:'center',
  textAlignVertical:'center',
  marginBottom:20,
  marginTop:30
},

buttonContainer1:{
  backgroundColor:'green',
  height:100,
 
  borderRadius:20,
  alignItems:'center',
  textAlignVertical:'center',
  marginBottom:20,
  marginTop:30
},

buttonOutlineText:{
  marginTop:23,
  color:'white',
  fontSize:35
},

buttonOutline:{
  width:'80%',
}
})