import { KeyboardAvoidingView, StyleSheet, Text, Image, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import instance from './axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const screenheight = Dimensions.get('window').height

    const ExistingCred = async () => {

        const chk = await AsyncStorage.getAllKeys()
        const localEmail = await AsyncStorage.getItem("email")
        const localPassword = await AsyncStorage.getItem("password")
        console.log(chk)
        if (localEmail && localPassword) {
            console.log("local: ", localPassword)
            handleLogin(localEmail, localPassword)
        }
        else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        ExistingCred()
    }, [])

    const handleLogin = async (email, password) => {
        if (email && password) {
            setIsLoading(true)
            await instance.post('login', {
                email: email.toLowerCase(),
                password: password
            }).then(async (res) => {
                console.log(res.data.status, "from the login")

                if (res.data.status == 200) {
                    Alert.alert(

                        'success',
                        'wahooo!',
                        [
                            {
                                text: 'OK', // Button text
                            },
                        ],
                        {
                            cancelable: true,
                        },
                    )

                    const dept = res.data.dept
                    const name = res.data.name
                    let prog = ""
                    let year = null
                    if (res.data.message === "fac") {
                        year = res.data.year
                        prog = res.data.prog
                    }
                    else if (res.data.message === "hod") {
                        prog = res.data.prog
                    }


                    console.log(res.data.year)
                    // console.log(email, password)
                    await AsyncStorage.setItem("email", email)
                    await AsyncStorage.setItem("password", password)

                    if (res.data.message === "user") {
                        // await AsyncStorage.setItem("dept", dept)
                        // await AsyncStorage.setItem("name", name)
                        navigation.navigate('Home', { email: email, mode: "stud", dept: dept, name: name })
                    }

                    else if (res.data.message === "fac") {
                        // await AsyncStorage.setItem("dept", dept)
                        // await AsyncStorage.setItem("name", name)
                        // await AsyncStorage.setItem("year", year)
                        // await AsyncStorage.setItem("section", res.data.section)
                        // await AsyncStorage.setItem("prog", prog)

                        navigation.navigate('Home', { email: email, mode: "fac", dept: dept, prog: prog, year: year, name: name, section: res.data.section })
                    }

                    else if (res.data.message === "hod") {
                        // await AsyncStorage.setItem("dept", dept)
                        // await AsyncStorage.setItem("name", name)
                        // await AsyncStorage.setItem("prog", prog)
                        navigation.navigate('Home', { email: email, mode: "hod", dept: dept, prog: prog, name: name })
                    }
                    else if (res.data.message === "prc") {
                        // await AsyncStorage.setItem("dept", dept)
                        // await AsyncStorage.setItem("name", name)
                        navigation.navigate('Home', { email: email, mode: "prc", dept: dept, name: name })
                    }


                }
                else if (res.data.status == 300) {
                    Alert.alert(

                        'Incorrect Password',
                        'Kindly enter the correct password',
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
                else if (res.data.status == 400) {
                    Alert.alert(

                        'User not found',
                        'Kindly register first',
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
            }).catch((error) => {
                console.log(error)
            })
                .finally(() => {

                    setIsLoading(false)
                })
        }
    }

    const handleFrgPwd = async () => {
        if (!email) {
            Alert.alert("Email required", "Please enter your email in the email field")
        }
        else {
            await instance.post("/sendOtp", { email: email }).then(
                (res) => {
                    if (res.data.message == "success") {
                        navigation.navigate('frgPwd', { email: email })
                    }
                    else {
                        Alert.alert("Error occured", "please try again later")
                    }
                })
        }
    }

    return (

        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={[styles.inner, { height: screenheight }]}>
                    <View style={styles.topBar}>
                        <View style={styles.title}>
                            <Image style={styles.img} source={require('../assets/signin.png')}></Image>
                            <Text style={styles.titleText}>Sign In</Text>
                        </View>
                    </View>

                    <View style={styles.inputContainer1}>
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Password'
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => { handleLogin(email, password) }}
                            style={[styles.button]}
                            disabled={isLoading}
                        >{isLoading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (

                            <Text style={styles.buttonText}>Login</Text>
                        )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                handleFrgPwd()

                            }}
                            style={styles.frgPwd}
                        >
                            <Text style={styles.frgTxt}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Signup')
                            }}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Register</Text>
                        </TouchableOpacity> */}

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


    inputContainer: {
        marginTop: 20,
        width: '80%',

    },

    inputContainer1: {
        marginTop: "5%",
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        height: 45,
        borderColor: "#112D4E",
        borderWidth: 2,
        borderRadius: 10,
        color: "#112D4E"
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#112D4E',
        width: '100%',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15
    },


    buttonOutline: {
        backgroundColor: '#F9F7F7',
        marginTop: 10,
        borderColor: '#112D4E',
        borderWidth: 2,
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    buttonOutlineText: {
        color: '#112D4E',
        fontWeight: '700',
        fontSize: 16,
    },

    inner: {
        alignItems: 'center',

    },

    topBar: {
        backgroundColor: "#112D4E",
        height: "50%",
        width: '100%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginBottom: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"

    },

    title: {
        alignItems: 'center',
        // marginTop: 150
    }
    ,
    titleText: {
        fontSize: 50,
        color: 'white'
    },
    frgTxt: {
        fontSize: 16,
        color: "#3F72AF",
        textDecorationLine: "underline"
    },
    frgPwd: {
        marginTop: 10
    },
    img: {
        height: 160,
        width: 160,
        marginBottom: 15
    }
})