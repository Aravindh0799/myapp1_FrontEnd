import { KeyboardAvoidingView, StyleSheet, Image, Text, TextInput, ActivityIndicator, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { SelectList } from 'react-native-dropdown-select-list'
import instance from './axios'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'


const ChangePwdScreen = ({ navigation, route }) => {
    const screenHeight = Dimensions.get('window').height
    const [isLoading, setIsLoading] = useState(false)
    const [newPwd, setNewPwd] = useState("")
    const [currentPwd, setCurrentPwd] = useState("")
    const email = route.params.email
    const mode = route.params.mode
    var prog = ""
    var section = null
    var year = null

    useFocusEffect(
        React.useCallback(() => {
            navigation.setOptions({
                gestureEnabled: false,
            });
            if (mode === "fac") {
                year = route.params.year
                section = route.params.section
                prog = route.params.prog
                console.log("yaer sec prog", prog, year, section)
            }
            else if (mode == "hod") {
                prog = route.params.prog
            }
            console.log("mode", mode)
        }, []
        ))

    const handleChangePwd = async (curPwd, newPwd) => {
        console.log("changePwd", prog, section, year)
        setIsLoading(true)
        await instance.post("/changePassword", { email: email, mode: mode, cPwd: curPwd, nPwd: newPwd }).then(
            (res) => {
                if (res.data.status === 200) {
                    Alert.alert("Successful", "Your password is changed",
                        [
                            {
                                text: "OK",
                                onPress: () => { navigation.goBack() }
                            }
                        ])
                }
                else if (res.data.status === 401) {
                    Alert.alert("Error", "Error occured please try again some time")
                }
                else if (res.data.status === 402) {
                    Alert.alert("Incorrect", "The entered current password is wrong")
                }
            }
        )
        setIsLoading(false)
    }
    return (
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={[styles.inner, { height: screenHeight }]}>
                    <TouchableOpacity style={styles.backTouch}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Image
                            source={require('../assets/back.png')}
                            style={styles.back}>
                        </Image>
                    </TouchableOpacity>
                    <View style={[styles.topBar, { height: screenHeight * 0.5 }]}>
                        <View style={styles.title}>
                            <Image source={require('../assets/password.png')}
                                style={styles.icon}>
                            </Image>
                            <Text style={styles.titleText}>Change Password</Text>
                        </View>
                    </View>

                    <View style={styles.inputContainer1}>
                        <TextInput
                            placeholder='Current Password'
                            value={currentPwd}
                            onChangeText={text => setCurrentPwd(text)}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='New Password'
                            value={newPwd}
                            onChangeText={text => setNewPwd(text)}
                            style={styles.input}

                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => { handleChangePwd(currentPwd, newPwd) }}
                            style={[styles.button, styles.buttonOutline]}
                            disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={styles.buttonOutlineText}>Change Password</Text>

                            )}
                        </TouchableOpacity>
                    </View>
                </View>

            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

export default ChangePwdScreen

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
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },


    buttonOutline: {
        backgroundColor: '#112D4E',
        marginTop: 10,
        borderColor: '#112D4E',
        borderWidth: 2,
    },

    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },

    buttonOutlineText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },

    topBar: {
        backgroundColor: "#112D4E",
        height: 350,
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
        // marginTop: 150,
        display: "flex",
        flexDirection: "column",
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
        marginTop: 50
    },
    icon: {
        height: 60,
        width: 60
    },
    inputContainer: {
        marginTop: 15,
        width: '80%'
    },

    inputContainer1: {
        marginTop: "10%",
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
})