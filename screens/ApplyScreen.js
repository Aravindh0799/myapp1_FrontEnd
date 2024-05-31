import { KeyboardAvoidingView, StyleSheet, Image, Text, TextInput, ActivityIndicator, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { SelectList } from 'react-native-dropdown-select-list'
import instance from './axios'
import { Dimensions } from 'react-native'


const ApplyScreen = ({ navigation, route }) => {
    const screenheight = Dimensions.get('window').height
    const [isLoading, setIsLoading] = useState(false)
    const [reason, setReason] = useState('')
    const data = [
        { key: '1', value: 'Passport' },
        { key: '2', value: 'Competition' },
        { key: '3', value: 'Bank application' },
        { key: '4', value: 'Scholarship' }
    ]

    const [selected, setSelected] = React.useState("");
    const handleRes = (value) => {
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


    const handleApply = () => {
        // console.log('from apply in')
        setIsLoading(true)
        instance.post('/checkBonafide', { email: email, reason: reason }).then(
            (res) => {
                // console.log(res)
                console.log("chk bf: ", res.data.message)
                if (res.data.message === "pending") {
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
                else {
                    instance.post('/applyBonafide', { email: email, reason: reason }).then(
                        (res) => {
                            // const{name,email,password,resiStatus,dob,dept,year,religion,nationality,address} = res.data;
                            // console.log(res.data)
                            // setAdd(address)
                            // setDept(dept)
                            // setName(name)
                            // setDob(dob)
                            // setNationality(nationality)
                            // setYear(year)
                            // setResstatus(resiStatus)
                            // setReligion(religion)
                            // createPDF
                            if (res.data.message === "empty_reason") {
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

                            else if (res.data.message === "created") {
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

        ).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={[styles.inner, { height: screenheight }]}>
                    <TouchableOpacity style={styles.backTouch}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Image
                            source={require('../assets/back.png')}
                            style={styles.back}>
                        </Image>
                    </TouchableOpacity>
                    <View style={[styles.topBar, { height: screenheight * 0.45 }]}>
                        <View style={styles.title}>
                            <Image source={require('../assets/apply-4.png')}
                                style={styles.icon}>
                            </Image>
                            <Text style={styles.titleText}>Apply</Text>
                        </View>
                    </View>

                    <View style={styles.selectOption}>
                        <SelectList
                            style={styles.selectBox}
                            setSelected={(val) => setSelected(val)}
                            data={data}
                            maxHeight={150}
                            save="value"
                            placeholder='Reason'
                            onSelect={() => { handleRes(selected) }}

                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleApply}
                            style={[styles.button, styles.buttonOutline]}
                            disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={styles.buttonOutlineText}>Apply</Text>

                            )}
                        </TouchableOpacity>
                    </View>
                </View>

            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

export default ApplyScreen

const styles = StyleSheet.create({
    inner: {
        alignItems: 'center',

    },
    back: {
        position: 'absolute',
        left: 0,
        top: 50,
        marginLeft: 20,
        height: 40,
        width: 40,
    },
    backTouch: {
        position: 'absolute',
        left: 0,

        zIndex: 1,

    },

    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#112D4E',
        width: '60%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },


    buttonOutline: {
        backgroundColor: '#112D4E',
        marginTop: 10,
        borderColor: '#135D66',
        borderWidth: 2,
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    buttonOutlineText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },

    topBar: {
        backgroundColor: "#112D4E",
        // height: 350,
        width: '100%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginBottom: 30,
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center'

    },

    title: {
        alignItems: 'center',
        // marginTop: 150,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center'
    }
    ,
    titleText: {
        fontSize: 50,
        color: 'white'
    }
    ,
    selectOption: {
        width: "80%",
        marginTop: 50,
        borderColor: '#112D4E', // Change border color here
        borderWidth: 1, // Optional: Set border width
        borderRadius: 11,
        // backgroundColor: "#E3FEF7"

    },
    selectBox: {
        borderColor: "red", // Change border color here
        borderWidth: 1, // Optional: Set border width
        borderRadius: 11,

    },
    icon: {
        height: 60,
        width: 60
    }
})