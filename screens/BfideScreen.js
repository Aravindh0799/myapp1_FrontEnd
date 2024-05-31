import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { TextDecoder } from 'util'
import { useFocusEffect } from '@react-navigation/native';
import instance from './axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const BfideScreen = ({ navigation, route }) => {

    const Buffer = require('buffer').Buffer;

    const [isLoading, setIsLoading] = useState(false)
    const [isLoading1, setIsLoading1] = useState(false)

    const [rejReason, setRejReason] = useState("")
    const temp = route.params.name

    const temp1 = temp.indexOf('_')
    const temp2 = temp.indexOf('_', temp1 + 1)
    let name = temp.substring(0, temp2)
    name = name.replace("_", " ")
    const stud = route.params.stud
    const reason = route.params.reason
    const status = route.params.status
    const mail = route.params.mail
    const date = new Date(route.params.date)
    const id = route.params.id
    const mode = route.params.mode
    const dept = route.params.dept
    const email = route.params.email
    let prog = ""
    var year = null
    var section = null

    if (mode === "fac") {
        year = route.params.year
        section = route.params.section
        prog = route.params.prog
        console.log("b year ", year)
    }
    else {
        prog = route.params.prog

    }

    console.log(mode, date)
    const [data, setData] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            // Place your code here to run when the component gains focus
            instance.post('getpdf', { id: id }).then(
                (res) => {
                    // console.log(res.data.content)
                    setData(res.data.content)
                }
            )
        }, [])
    );

    const ANavigation = () => {
        if (mode === "fac") {
            navigation.goBack()
            // navigation.navigate("Track", { email: email, dept: dept, year: year, mode: mode, section:section })
        }
        else {
            navigation.goBack()
            // navigation.navigate("Track", { email: email, dept: dept, mode: mode })
        }
    }




    const approve = (id) => {
        setIsLoading(true)
        instance.post('approveBonafide', ({ id: id, mode: mode })).then(
            (res) => {
                if (res.data.message === "success") {
                    Alert.alert(

                        'Approved Successfully',
                        'Bonafide has been approved',
                        [
                            {
                                text: 'Ok', // Button text
                                onPress: () => { ANavigation() }
                            },
                            {
                                text: 'Cancel',

                            }
                        ],
                        {
                            cancelable: true,
                        },
                    )

                }
                else {
                    Alert.alert('Failed', 'Could not process the request', [{ text: 'OK' }]);
                }
            }
        ).finally(() => {
            setIsLoading(false)
        })
    }

    const reject = (id) => {


        setIsLoading1(true)
        Alert.prompt("Rejection", "Enter the reason for rejection", [
            {
                text: "Submit",
                onPress: (text) => (
                    instance.post('rejectBonafide', ({ id: id, mode: mode, reason: text })).then(
                        (res) => {
                            if (res.data.message === "success") {
                                Alert.alert(

                                    'Rejection',
                                    'Bonafide has been Rejected',
                                    [
                                        {
                                            text: 'Ok', // Button text
                                            onPress: () => { ANavigation() }
                                        },
                                        {
                                            text: 'Cancel',

                                        }
                                    ],
                                    {
                                        cancelable: true,
                                    },
                                )

                            }
                            else {
                                Alert.alert('Failed', 'Could not process the request', [{ text: 'OK' }]);
                            }
                        }
                    )


                )
            },
            {
                text: "Cancel",
                onPress: () => { ANavigation() }
            }
        ], 'plain-text', "")
        setIsLoading1(false)

    }


    return (
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.inner}>
                    <View style={styles.container}>
                        <View style={styles.topBar}>
                            <TouchableOpacity style={styles.backTouch}
                                onPress={() => {
                                    navigation.goBack()
                                }}>
                                <Image
                                    source={require('../assets/back.png')}
                                    style={styles.back}>
                                </Image>
                            </TouchableOpacity>
                            <Text style={styles.topText}>{name}</Text>
                        </View>

                        <View style={styles.dContainer}>
                            <Text style={styles.dText}>
                                <Text style={styles.label}>Requested by: </Text>{stud}</Text>
                            <Text style={styles.dText}>
                                <Text style={styles.label}>Mail Id: </Text>{mail}</Text>
                            <Text style={styles.dText}>
                                <Text style={styles.label}>Reason: </Text>{reason}</Text>
                            <Text style={styles.dText}>
                                <Text style={styles.label}>Status: </Text>{status}</Text>
                            <Text style={styles.dText}>
                                <Text style={styles.label}>Applied on: </Text>{date.toDateString()}</Text>

                        </View>

                        <View style={styles.bContainer}>
                            <TouchableOpacity style={styles.btn}
                                onPress={() => {
                                    approve(id)
                                }}
                            >

                                <View style={styles.button}>

                                    {isLoading ? (
                                        <ActivityIndicator size="small" color="white"></ActivityIndicator>
                                    ) : (
                                        <Text style={styles.bText}>Approve</Text>
                                    )}

                                </View>
                            </TouchableOpacity>



                            <TouchableOpacity style={styles.btn1}
                                onPress={() => {
                                    reject(id)
                                }}>

                                <View style={styles.button1}>
                                    {isLoading1 ? (
                                        <ActivityIndicator size="small" color="#112D4E"></ActivityIndicator>
                                    ) : (
                                        <Text style={styles.bText1}>Reject</Text>

                                    )}

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
    container: {
        flex: 1,
        justifyContent: 'center',
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
        left: 0
    },
    topBar: {
        backgroundColor: "#112D4E",
        height: 350,
        width: '100%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginBottom: 30,
        alignItems: 'center',

    },
    topText: {
        marginTop: '38%',
        color: 'white',
        fontSize: 33,
        marginLeft: '8%',
        marginRight: '8%'

    },

    dContainer: {
        marginTop: '20%',

    },

    dText: {
        marginBottom: 10,
    }
    ,
    label: {
        fontWeight: 'bold'
    },
    button: {
        padding: 15,
        borderRadius: 10,
    },
    button1: {
        padding: 12,
        borderRadius: 10,
    },

    bText: {
        color: 'white',
        fontWeight: "700",
        fontSize: 15
    },
    bText1: {
        color: "#112D4E",
        fontWeight: "700",
        fontSize: 15


    },
    bContainer: {
        marginTop: '20%',
        width: '80%',

    },
    btn: {

        backgroundColor: '#112D4E',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: '5%'
    },

    btn1: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: '5%',
        borderColor: "#112D4E",
        borderWidth: 2
    }


})