import { StyleSheet, RefreshControl, Text, View, Image, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import instance from './axios'
import * as Print from 'expo-print';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';

const TrackScreen = ({ navigation, route }) => {


    const email = route.params.email
    const mode = route.params.mode
    const dept = route.params.dept
    const name = route.params.name

    let year = null
    let section = null
    let prog = ""
    const screenHeight = Dimensions.get('window').height
    const screenWidtht = Dimensions.get('window').width

    const [selectedOption, setSelectedOption] = useState("Approved")

    const [refreshing, setRefreshing] = React.useState(false);

    const [isLoading, setIsLoading] = useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            navigation.navigate("Track", { email: email, mode: mode, dept: dept, year: year, section: section })
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (mode === "fac") {
            year = route.params.year
            section = route.params.section
            prog = route.params.prog
            console.log("year sec", prog, year, section)
        }
        else if (mode === "hod") {
            prog = route.params.prog

        }
        console.log("mode", mode)
    }, [])

    const [bdata, setBdata] = useState([])

    useFocusEffect(
        React.useCallback(() => {

            if (mode === "stud") {
                setIsLoading(true)
                instance.post("/getBonafides", { email: email, mode: mode, dept: dept }).then(
                    (res) => {
                        if (res.data.message === "success") {
                            // console.log(res.data.data)
                            const arr = res.data.data
                            setBdata(arr)
                            arr.forEach(element => {
                                console.log(element.name)
                            });
                        }
                        else {
                            console.log("no data")
                        }
                    }

                ).catch((err) => {
                    console.log("from getBonafide", err)
                }).finally(() => {
                    setIsLoading(false)
                })
            }

            else if (mode === "fac") {
                setIsLoading(true)
                instance.post("/getBonafidesFac", { email: email, mode: mode, dept: dept, prog: prog, year: year, section: section }).then(
                    (res) => {
                        if (res.data.message === "success") {
                            // console.log(res.data.data)
                            const arr = res.data.data
                            setBdata(arr)
                            arr.forEach(element => {
                                console.log(element.name)
                            });
                        }
                        else {
                            console.log("no data")
                        }
                    }

                ).catch((err) => {
                    console.log("from getBonafide", err)
                }).finally(() => {
                    setIsLoading(false)
                })
            }

            else if (mode === "hod") {
                setIsLoading(true)
                instance.post("/getBonafidesHod", { email: email, mode: mode, dept: dept, prog: prog }).then(
                    (res) => {
                        if (res.data.message === "success") {
                            // console.log(res.data.data)
                            const arr = res.data.data
                            setBdata(arr)
                            arr.forEach(element => {
                                console.log(element.name)
                            });
                        }
                        else {
                            console.log("no data")
                        }
                    }

                ).catch((err) => {
                    console.log("from getBonafide", err)
                }).finally(() => {
                    setIsLoading(false)
                })
            }

            else if (mode === "prc") {
                setIsLoading(true)
                instance.post("/getBonafidesPrc", { email: email, mode: mode }).then(
                    (res) => {
                        if (res.data.message === "success") {
                            // console.log(res.data.data)
                            const arr = res.data.data
                            setBdata(arr)
                            arr.forEach(element => {
                                console.log(element.name)
                            });
                        }
                        else {
                            console.log("no data")
                        }
                    }

                ).catch((err) => {
                    console.log("from getBonafide", err)
                }).finally(() => {
                    setIsLoading(false)
                })
            }



        }, [mode, email, dept, year])
    );


    const printPdf = async (id) => {
        var data = null
        console.log("d pdf")
        var name = null
        await instance.post("/getpdf", { id: id }).then(
            (res) => {
                // console.log(res.data.content)
                if (res.data.message === "download") {
                    data = res.data.content
                    name = res.data.name
                    console.log(name)
                }
            }
        ).finally(() => {
            setIsLoading(false)
        })

        if (data) {
            // console.log(data)

            const pdfUri = FileSystem.cacheDirectory + "Bonafide_certificate"; // Set the path and filename
            await FileSystem.writeAsStringAsync(pdfUri, data, { encoding: FileSystem.EncodingType.Base64 }); // Write PDF data to file
            await Print.printAsync({ uri: pdfUri });


            // const my_uri = `data:application/pdf;base64,${data}`;
            // await Print.printAsync({ uri: my_uri });


        }

        else {
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



    const blist = () => {



        if (bdata && Array.isArray(bdata)) {

            let pendingList = []
            let approvedList = []
            let rejectedList = []

            bdata.map(element => {

                if (element.status == "success") {
                    approvedList.push(element)
                }
                else if (element.status.toLowerCase().startsWith("pending")) {
                    pendingList.push(element)
                }
                else {
                    rejectedList.push(element)
                }
            })

            if (selectedOption == "Approved") {

                if (approvedList.length == 0) {
                    // If bdata is null (initial state), show loading indicator or null state message
                    return (
                        <Image source={require("../assets/man.png")} style={styles.man}></Image>
                    )
                }

                return approvedList.map(element => {

                    return (
                        <TouchableOpacity
                            key={element._id}
                            onPress={() => {

                                setIsLoading(true)
                                printPdf(element._id)


                            }
                            }

                        >

                            <View style={styles.cards}>

                                <Text style={styles.dName}>{element.name}</Text>
                                {(mode === "hod" || mode === "fac" || mode === "prc") ? (<Text style={styles.dText}>Student Name: {element.stud}</Text>) : ""}
                                <Text style={styles.dText}>Status: {element.status}</Text>

                            </View>


                        </TouchableOpacity>

                    )
                })

            }

            else if (selectedOption == "Pending") {

                if (pendingList.length == 0) {
                    // If bdata is null (initial state), show loading indicator or null state message
                    return (
                        <Image source={require("../assets/man.png")} style={styles.man}></Image>
                    )
                }

                return pendingList.map(element => {

                    return (
                        <TouchableOpacity
                            key={element._id}
                            onPress={() => {
                                if (mode === "fac" && element.status.toLowerCase() == "pending - tutor") {
                                    console.log("date: ", element.createdAt)
                                    navigation.navigate('Bfide', {
                                        name: element.name, reason: element.b_type, status: element.status, mail: element.email, date: element.createdAt,
                                        id: element._id, stud: element.stud, mode: mode, dept: dept, prog: prog, email: email, year: year
                                    })
                                }
                                else if (mode === "hod" && element.status.toLowerCase() == "pending - hod") {
                                    navigation.navigate('Bfide', {
                                        name: element.name, reason: element.b_type, status: element.status, mail: element.email, date: element.createdAt,
                                        id: element._id, stud: element.stud, mode: mode, dept: dept, prog: prog, email: email, year: year
                                    })
                                }
                                else if (mode === "prc" && element.status.toLowerCase() == "pending - principal") {
                                    navigation.navigate('Bfide', {
                                        name: element.name, reason: element.b_type, status: element.status, mail: element.email, date: element.createdAt,
                                        id: element._id, stud: element.stud, mode: mode, dept: dept, email: email, year: year
                                    })
                                }
                                else {
                                    Alert.alert(
                                        "Unauthorised",
                                        "You are not authorised to take any action"
                                    )
                                }


                            }
                            }

                        >

                            <View style={styles.cards}>

                                <Text style={styles.dName}>{element.name}</Text>
                                {(mode === "hod" || mode === "fac" || mode === "prc") ? (<Text style={styles.dText}>Student Name: {element.stud}</Text>) : ""}
                                <Text style={styles.dText}>Status: {element.status}</Text>

                            </View>


                        </TouchableOpacity>

                    )
                })
            }

            else if (selectedOption == "Rejected") {

                if (rejectedList.length == 0) {
                    // If bdata is null (initial state), show loading indicator or null state message
                    return (
                        <Image source={require("../assets/man.png")} style={styles.man}></Image>
                    )
                }

                return rejectedList.map(element => {

                    return (
                        <TouchableOpacity
                            key={element._id}
                            onPress={() => {

                                Alert.alert(
                                    "Unauthorised",
                                    "You are not authorised to take any action"
                                )
                            }
                            }
                        >

                            <View style={styles.cards}>

                                <Text style={styles.dName}>{element.name}</Text>
                                {(mode === "hod" || mode === "fac" || mode === "prc") ? (<Text style={styles.dText}>Student Name: {element.stud}</Text>) : ""}
                                <Text style={styles.dText}>Status: {element.status}</Text>

                            </View>


                        </TouchableOpacity>

                    )
                })
            }


        }


    }


    if (mode === "stud") {
        return (

            <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                nestedScrollEnabled={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={[styles.inner,]}>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.backTouch}
                                onPress={() => {
                                    navigation.goBack()
                                }}>
                                <Image
                                    source={require('../assets/back.png')}
                                    style={styles.back}>
                                </Image>
                            </TouchableOpacity>
                            <View style={[styles.topBar, { height: screenHeight * 0.45 }]}>
                                <View style={styles.title}>
                                    <Image source={require('../assets/track-big.png')}
                                        style={styles.icon}>
                                    </Image>
                                    <Text style={styles.titleText}>Track</Text>
                                </View>
                            </View>

                            <View style={styles.toggleContainer}>
                                <View style={[selectedOption == "Approved" ? styles.toggleBox1 : (selectedOption == "Pending" ? styles.toggleBox2 : styles.toggleBox3)]}>

                                </View>
                                <TouchableOpacity style={styles.toggler1}
                                    onPress={
                                        () => {
                                            setSelectedOption("Approved")
                                        }}
                                >
                                    <Text style={selectedOption == "Approved" ? styles.toggleFont : styles.toggleTxt}>Approved</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.toggler2}
                                    onPress={
                                        () => {
                                            setSelectedOption("Pending")
                                        }
                                    }
                                >
                                    <Text style={selectedOption == "Pending" ? styles.toggleFont : styles.toggleTxt}>Pending</Text>

                                </TouchableOpacity>

                                <TouchableOpacity style={styles.toggler3}
                                    onPress={
                                        () => {
                                            setSelectedOption("Rejected")
                                        }
                                    }
                                >
                                    <Text style={selectedOption == "Rejected" ? styles.toggleFont : styles.toggleTxt}>Rejected</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardsContainer}>
                                <ScrollView showsVerticalScrollIndicator={true}>
                                    {bdata ? blist() : ""}
                                </ScrollView>
                            </View>

                        </View>
                        {isLoading && (<View style={[styles.loadingScreen, { height: screenHeight }]}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        )
    }

    else {
        return (

            <KeyboardAwareScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
                nestedScrollEnabled={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={[styles.inner]}>
                        <View style={styles.container}>
                            <TouchableOpacity style={styles.backTouch}
                                onPress={() => {
                                    navigation.goBack()
                                }}>
                                <Image
                                    source={require('../assets/back.png')}
                                    style={styles.back}>
                                </Image>
                            </TouchableOpacity>
                            <View style={[styles.topBar, { height: screenHeight * 0.45 }]}>
                                <View style={styles.title}>
                                    <Image source={require('../assets/request.png')}
                                        style={styles.icon}>
                                    </Image>
                                    <Text style={styles.titleText}>Requests</Text>
                                </View>
                            </View>
                            <View style={styles.toggleContainer}>
                                <View style={[selectedOption == "Approved" ? styles.toggleBox1 : (selectedOption == "Pending" ? styles.toggleBox2 : styles.toggleBox3)]}>

                                </View>
                                <TouchableOpacity style={styles.toggler1}
                                    onPress={
                                        () => {
                                            setSelectedOption("Approved")
                                        }}
                                >
                                    <Text style={selectedOption == "Approved" ? styles.toggleFont : styles.toggleTxt}>Approved</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.toggler2}
                                    onPress={
                                        () => {
                                            setSelectedOption("Pending")
                                        }
                                    }
                                >
                                    <Text style={selectedOption == "Pending" ? styles.toggleFont : styles.toggleTxt}>Pending</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={styles.toggler3}
                                    onPress={
                                        () => {
                                            setSelectedOption("Rejected")
                                        }
                                    }
                                >
                                    <Text style={selectedOption == "Rejected" ? styles.toggleFont : styles.toggleTxt}>Rejected</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardsContainer}>
                                <ScrollView showsVerticalScrollIndicator={true}>
                                    {bdata ? blist() : ""}
                                </ScrollView>
                            </View>

                        </View>
                        {isLoading && (<View style={[styles.loadingScreen, { height: screenHeight }]}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        )
    }

}

export default TrackScreen


const styles = StyleSheet.create({

    inner: {
        flex: 1,
        // height: '100%',
        // width: "100%"
    },
    container: {
        // flex: 1,
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
        left: 0,
        top: 0,
        zIndex: 1,
    },
    topBar: {
        backgroundColor: "#112D4E",
        // height: 350,
        width: '100%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginBottom: 30,
        alignItems: 'center',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"

    },
    topText: {
        // marginTop: 150,
        color: 'white',
        fontSize: 50,

    },

    cards: {
        backgroundColor: '#CAD4E5',
        height: 80,
        width: '100%',
        borderRadius: 20,
        // alignItems:'center',
        // textAlignVertical:'center',
        marginBottom: 20,
        marginTop: 10,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center'
    },

    cardsContainer: {
        marginTop: 20,
        width: '90%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingBottom: "10%"
    },

    dName: {
        // marginTop: '3%',
        // marginBottom: '1%',
        color: '#112D4E',
        fontSize: 15,
        fontWeight: "400"
    },

    dText: {
        color: "#112D4E",
        marginBottom: 2,
        fontWeight: "400"
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
    },
    icon: {
        height: 60,
        width: 60,
        marginRight: 10
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 18,
        color: 'black', // Customize the color of the message text
    },
    man: {
        height: 200,
        width: 200,
        marginTop: "25%",
        marginLeft: "25%"
    },
    loadingScreen: {
        // flex: "1 1",
        // height: 1000,
        ...StyleSheet.absoluteFillObject, // Fill the entire screen
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        justifyContent: 'center',
        alignItems: 'center',

    },

    toggleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#E3EAF7",
        borderRadius: 8,
        paddingVertical: 2,
        width: 270,
        // backgroundColor: "pink"
    },

    toggler1: {
        marginHorizontal: '2%',
        marginVertical: 5,
        // backgroundColor: "gray",
        paddingVertical: 5,
        // paddingLeft: "4%",
        transitionDuration: "5s",
        // backgroundColor: "red",
        width: "30%",
    },
    toggler2: {
        marginHorizontal: '2%',
        marginVertical: 5,
        // backgroundColor: "gray",
        paddingVertical: 5,
        paddingHorizontal: "4%",
        transitionDuration: "5s",
        width: "30%",
        // backgroundColor: "blue",


    },
    toggler3: {
        marginHorizontal: '2%',
        marginVertical: 5,
        // backgroundColor: "gray",
        paddingVertical: 5,
        paddingHorizontal: '4%',
        transitionDuration: "5s",
        width: "30%",
        // backgroundColor: "black",


    },


    toggleBox1: {
        height: 30,
        width: "29%",
        backgroundColor: "#135D66",
        position: "absolute",
        top: "15%",
        left: "2%",
        borderRadius: 6,
        // borderTopRightRadius: 0,
        // borderBottomRightRadius: 0

    },
    toggleBox2: {
        height: 30,
        width: "33%",
        backgroundColor: "#EE5F13",
        position: "absolute",
        top: "15%",
        // right: "33%",
        borderRadius: 6,


    },
    toggleBox3: {
        height: 30,
        width: "29%",
        backgroundColor: "#D80000",
        position: "absolute",
        top: "15%",
        right: "2%",
        borderRadius: 6,
        // borderTopLeftRadius: 0,
        // borderBottomLeftRadius: 0


    },
    toggleFont: {
        color: "white",
        fontWeight: "600",
        textAlign: "center"
    },
    toggleTxt: {
        color: "#003C43",
        textAlign: "center"
    }



})