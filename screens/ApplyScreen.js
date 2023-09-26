import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import React,{useState} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { SelectList } from 'react-native-dropdown-select-list'
import instance from './axios'
import { PDFDocument, rgb } from 'pdf-lib';



const ApplyScreen = ({navigation,route}) => {

    const[reason,setReason]=useState('')
    const data = [
        {key:'1', value:'Passport'},
        {key:'2', value:'Competition'},
    ]

    const [selected, setSelected] = React.useState("");
    const handleRes=(value)=>{
        setReason(value)
        // alert(value)
    }

    const email = route.params.email
    // const [name,setName]=useState('')
    // const [password,setPassword]=useState('')
    // const [cpassword,setCpassword]=useState('')
    // const [restatus,setResstatus]=useState('')
    // const [nationality,setNationality]=useState('')
    // const [religion,setReligion]=useState('')
    // const [dept,setDept]=useState('')
    // const [add,setAdd]=useState('')
    // const [year,setYear]=useState('')
    // const [dob,setDob]=useState('')


    const handleApply = ()=>{
        // console.log('from apply in')
        instance.post('/checkBonafide',{email:email,reason:reason}).then(
            (res)=>{
                
                
                if(res.data.message==="existing"){
                    Alert.alert(
                
                        'Already applied',
                        'Kindly wait for the approval.',
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
                else{
                    instance.post('/applyBonafide',{email:email,reason:reason}).then(
                        (res)=>{
                            // const{name,email,password,resiStatus,dob,dept,year,religion,nationality,address} = res.data;
                            console.log(res.data)
                            // setAdd(address)
                            // setDept(dept)
                            // setName(name)
                            // setDob(dob)
                            // setNationality(nationality)
                            // setYear(year)
                            // setResstatus(resiStatus)
                            // setReligion(religion)
                            // createPDF
                            if(res.data.message==="empty_reason"){
                                Alert.alert(
                            
                                    'Invalid reason',
                                    'Select a valid reason',
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
            
                            else if(res.data.message==="created"){
                                Alert.alert(
                                    
                                    'success',
                                    'applied',
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
                        
                        
                    )     
                    
                    
                }
            
                }
            
        )
            }
        
  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
    <View style={styles.inner}>
   <View style={styles.topBar}>
   <View style={styles.title}>
        <Text style={styles.titleText}>Apply</Text>
    </View>
    </View>

    <View style={styles.selectOption}>
    <SelectList
        setSelected={(val) => setSelected(val)} 
        data={data}
        maxHeight={90}
        save="value"
        placeholder='Reason'
        onSelect={()=>{handleRes(selected)}}
        
    />
    </View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity 
        onPress={handleApply}
            style={[styles.button,styles.buttonOutline]}>
        <Text style={styles.buttonOutlineText}>Apply</Text>
    </TouchableOpacity>
    </View>
    </View>
   
  </TouchableWithoutFeedback>
  </KeyboardAwareScrollView>
  )
}

export default ApplyScreen

const styles = StyleSheet.create({
    inner:{
        alignItems:'center',
    
    },
    
    buttonContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems: 'center',
        marginTop:40,
    },
    button:{
        backgroundColor:'#0782F9',
        width:'60%',
        padding: 10,
        borderRadius:10,
        alignItems:'center',
    },
    
    
    buttonOutline:{
        backgroundColor:'white',
        marginTop: 10,
        borderColor:'#0782F9',
        borderWidth: 2,
    },
    
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,
    },
    
    buttonOutlineText:{
        color:'#0782F9',
        fontWeight:'700',
        fontSize:16,
    },
    
    topBar:{
        backgroundColor:"#0782F9",
        height:350,
        width:390,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        marginBottom:30,
    
    },

    title:{
        alignItems:'center',
        marginTop:150
    }
    ,
    titleText:{
        fontSize:50,
        color:'white'
    }
    ,
    selectOption:{
        width:"80%",
        marginTop:50
    }
})