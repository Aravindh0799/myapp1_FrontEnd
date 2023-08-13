import {TextInput, TouchableOpacity,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,} from 'react-native'
import React,{useState} from 'react'
import axios from 'axios'
import Dropdown from '../components/dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SelectList } from 'react-native-dropdown-select-list'

const SignupScreen2 = ({navigation,route}) => {
    
    const [religion,setReligion]=useState('')
    const [dept,setDept]=useState('')
    const [add,setAdd]=useState('')
    const [year,setYear]=useState('')
    const [date, setDate] = useState(new Date("1999-07-10"))
    const [showPicker,setShowPicker]=useState(false)
    const [dob,setDob]=useState('')
    const [selected, setSelected] = React.useState("");


    const data = [
        {key:'1', value:'MCA'},
        {key:'2', value:'EEE'},
    ]

    const handleRegister =()=>{
        axios.post('https://myapp1-jsxm.onrender.com/register',{
        name:route.params.name,
        email:route.params.email,
        password:route.params.password,
        resiStatus:route.params.residentialStatus,
        dob:dob,
        dept:dept,
        year:year,
        religion:religion,
        nationality:route.params.nationality,
        address:add
    }
        ).then((res)=>{

            if(res.data.status==409){
                Alert(alert(
                
                    'User already registered',
                    'Kindly try to login with correct credentials',
                
                    {
                      cancelable: true,
                    },
                ))
            }

            else if(res.data.status==200){
                Alert(alert(
                
                    'Registration Successful',
                    'Yayyy! thanks for registering',
                
                    {
                      cancelable: true,
                    },
                ))

                navigation.navigate('Login')
            }
            
            else if(res.data.status==300){
                Alert(alert(
                
                    'Registration Unsuccessful',
                    'Something went wrong. Try again later',
                
                    {
                      cancelable: true,
                    },
                ))
            }
            console.log(res.message,"from the backend")
        }).catch((err)=>{
            console.log(err,"error occurred")
        })
    }

    const confirmIOSDate = () =>{
        setDob(date.toDateString())
        toggleDate()
    }

    const toggleDate =()=>{
        setShowPicker(!showPicker)
    }

    const onChange = ({type}, selectedDate)=>{
        if(type == "set"){
            const currentDate = selectedDate
            setDate(currentDate)

            if(Platform.OS === "android"){
                
                toggleDate()
                setDob(currentDate.toDateString())
                
            }
            
        }
        else{
            toggleDate()
        }
    }

    const handleDept = (value) =>{
        setDept(value)
    }
   

  return (

    
    // <KeyboardAvoidingView
    //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //     style={styles.container}  
    // >
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.inner}>
    <View style={styles.topBar}>
    <View style={styles.title}>
    <Text style={styles.titleText}>Sign Up</Text>
    </View>
    
        
    </View>
    

    <View style={styles.DatePicker}>
        {showPicker && (
        <DateTimePicker
            mode ="date"
            display="spinner"
            value={date}
            onChange={onChange}
        />
        )}

        {showPicker && Platform.OS==="ios" && (
            <View
            style={{flexDirection:"row",
                    justifyContent:"space-around"
                }}
        >
            <TouchableOpacity
            style={[
                styles.DatePickerbutton,
                styles.pickerButton,
                {backgroundColor:"#11182711"},
            ]}
            onPress={toggleDate}>
                
                <Text
                style={[
                    styles.DatePickerbuttonText,
                    {color: "#075985"}
                ]}>
                   Cancel 
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[
                styles.DatePickerbutton,
                styles.pickerButton, 
            ]}
            onPress={confirmIOSDate}>
                
                <Text
                style={[
                    styles.DatePickerbuttonText,
                    
                ]}>
                   Confirm 
                </Text>
            </TouchableOpacity>
        </View>
        )}
        
        {!showPicker && (
        <Pressable
            onPress={toggleDate}>
            
        <TextInput
            style={styles.input}
            placeholder='DOB: 10-07-1999'
            value={dob}
            onChangeText={setDob}
            placeholderTextColor="#11182744"
            editable={false}
            onPressIn={toggleDate}
            >

        </TextInput>
        </Pressable>)
        }
    </View>


    <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Religion'
        value={religion}
        onChangeText={text=>setReligion(text)}
        style={styles.input}
        />
    </View>

    {/* <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Department'
        value={dept}
        onChangeText={text=>setDept(text)}
        style={styles.input}
        />
    </View> */}

    <View style={styles.selectOption}>
    <SelectList
        setSelected={(val) => setSelected(val)} 
        data={data}
        maxHeight={90}
        save="value"
        placeholder='Department'
        onSelect={()=>{handleDept(selected)}}
    />
    </View>

    <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Year Ex: IV'
        value={year}
        placeholderTextColor="#11182744"
        onChangeText={text=>setYear(text)}
        style={styles.input}
        />
    </View>

    <View style={styles.inputContainer}>
        <TextInput 
        placeholder='Address'
        value={add}
        onChangeText={text=>setAdd(text)}
        style={styles.input}
        />
    </View>

    
    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleRegister}
            style={[styles.button,styles.buttonOutline]}
            >
        <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

    </View>


    </View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  ) 
}

export default SignupScreen2

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    inner: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems:'center'
      },

inputContainer:{
    width:'80%'
},

titleText:{
    marginTop:10,
    fontSize:40,
    fontWeight:"500",
    color:"white"
},
input:{
    backgroundColor:'white',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:10,
    marginTop:15,
    color:'black',
    height:45,
},
buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems: 'center',
    marginTop:40,
},
button:{
    backgroundColor:'#0782F9',
    width:'100%',
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

pickerButton:{
    paddingHorizontal: 20,
    paddingVertical:10,
    alignItems:"center",
    borderRadius:10,
    marginBottom:10
},

DatePickerbutton:{
    width:120,
    backgroundColor: '#0782F9',
    
},

DatePickerbuttonText:{
    color:'white'
},

DatePicker:{
    width:'80%'
},

topBar:{
    backgroundColor:"#0782F9",
    height:250,
    width:390,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
    marginBottom:30,
},

title:{
    alignItems:'center',
    marginTop:100,
},

selectOption:{
    width:'80%',
    marginTop:15,
    backgroundColor:'white'
}
})