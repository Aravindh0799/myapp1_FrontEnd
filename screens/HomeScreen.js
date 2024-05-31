import { StyleSheet, Text, Image, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, BackHandler, Modal, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dimensions } from 'react-native'

const HomeScreen = ({ navigation, route }) => {

  const screenHeight = Dimensions.get('window').height

  const [isLoading, setIsLoading] = useState(false)
  const email = route.params.email

  const mode = route.params.mode
  const dept = route.params.dept
  const name = route.params.name
  const [year, setYear] = useState(null)
  const [section, setSection] = useState(null)
  const [prog, setProg] = useState("")

  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const logout = async () => {
    await AsyncStorage.removeItem("email")
    await AsyncStorage.removeItem("password")
  }


  // Set navigation options once when the component mounts

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        gestureEnabled: false,
      });
      if (mode === "fac") {
        setYear(route.params.year)
        setSection(route.params.section)
        setProg(route.params.prog)
        console.log("yaer sec prog", prog, year, section)
      }
      else if (mode == "hod") {
        setProg(route.params.prog)
      }
      console.log("mode", mode)
    }, []
    ))
  // console.log(dept)

  const handleLogout = () => {
    setIsLoading(true)
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            logout()
            navigation.navigate("Login")
          },
        },
      ],
      { cancelable: false }
    );
    setIsLoading(false)
  }


  if (mode === "stud") {
    return (

      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={[styles.inner, { height: screenHeight }]}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.profileTouch}
                onPress={() => { openModal() }}
              >
                <Image source={require('../assets/user.png')}
                  style={styles.profile}>
                </Image>
              </TouchableOpacity>
              <View style={styles.modalParent}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Image source={require('../assets/user-3.png')}
                        style={styles.img}>
                      </Image>
                      <Text style={styles.modalTxt}>{name}</Text>
                      <Text style={styles.modalEmail}>{email}</Text>
                      <Text style={styles.modalDesg}>Student</Text>
                      <TouchableOpacity style={styles.pwdContainer}
                        onPress={() => {
                          setModalVisible(!modalVisible)
                          navigation.navigate("changePwd", { email: email, mode: mode, prog: prog, year: year, section: section })
                        }}
                      >
                        <Text style={styles.pwdText}>Change Password</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.logoutBtn}
                        onPress={
                          () => handleLogout()}

                      >
                        {isLoading ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <Text style={styles.modalLogout}>Logout</Text>
                        )}
                      </TouchableOpacity>
                      <View style={styles.close}>
                        <Button title="Close" color="#135D66" style={styles.closeTxt} onPress={closeModal} />
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>

              <View style={styles.topBar}>
                <Image source={require('../assets/home-2.png')}
                  style={styles.icon}>
                </Image>
                <Text style={styles.topText}>Home</Text>
              </View>
              <View style={styles.listContainer}>
                <View style={styles.innerlistContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Apply', { email: email, name: name })
                    }}
                    style={[styles.button, styles.buttonOutline]}
                  >
                    <View style={styles.buttonContainer}>
                      <Image source={require('../assets/apply-3.png')}
                        style={styles.icon}>
                      </Image>
                      <Text style={styles.buttonOutlineText}>Apply</Text>

                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Track', { email: email, mode: mode, dept: dept, name: name, prog: prog })
                    }}
                    style={[styles.button, styles.buttonOutline]}
                  >
                    <View style={styles.buttonContainer1}>
                      <Image source={require('../assets/track-3.png')}
                        style={styles.icon}>
                      </Image>
                      <Text style={styles.buttonOutlineText}>Track</Text>

                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

    )
  }

  else if (mode === "fac" || mode === "hod" || mode == "prc") {
    return (
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.inner}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.profileTouch}
                onPress={
                  () => {
                    openModal()
                  }}
              >
                <Image source={require('../assets/user.png')}
                  style={styles.profile}>
                </Image>
              </TouchableOpacity>
              <View style={styles.modalParent}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Image source={require('../assets/user-3.png')}
                        style={styles.img}>
                      </Image>
                      <Text style={styles.modalTxt}>{name}</Text>
                      <Text style={styles.modalEmail}>{email}</Text>
                      <Text style={styles.modalDesg}>{mode === "fac" ? "Tutor" : (mode === "hod" ? "Head of the Department" : (mode === "prc" ? "Principal" : ""))}</Text>
                      <TouchableOpacity style={styles.pwdContainer}
                        onPress={() => {
                          setModalVisible(!modalVisible)
                          navigation.navigate("changePwd", { email: email, mode: mode, prog: prog, year: year, section: section })
                        }}
                      >
                        <Text style={styles.pwdText}>Change Password</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.logoutBtn}
                        onPress={
                          () => handleLogout()}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <ActivityIndicator size="small" color="white" />
                        ) : (
                          <Text style={styles.modalLogout}>Logout</Text>
                        )}
                      </TouchableOpacity>
                      <View style={styles.close}>
                        <Button title="Close" color="#135D66" style={styles.closeTxt} onPress={closeModal} />
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
              <View style={styles.topBar}>
                <Image source={require('../assets/home-2.png')}
                  style={styles.icon}>
                </Image>
                <Text style={styles.topText}>Home</Text>
              </View>
              <View style={styles.listContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Track', { email: email, mode: mode, dept: dept, prog: prog, year: year, name: name, section: section })
                  }}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <View style={styles.buttonContainer1}>
                    <Image source={require('../assets/request-3.png')}
                      style={styles.icon}>
                    </Image>
                    <Text style={styles.buttonOutlineText}>Requests</Text>

                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>

    )
  }

}



export default HomeScreen

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    // flexDirection: "column",
    // justifyContent: "center"
  },
  container: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    // height: "100%",
    // backgroundColor: "gray"
  },
  innerlistContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    // height: "100%",
    // backgroundColor: "gray"
  },
  profile: {
    position: 'absolute',
    right: 0,
    top: 50,
    color: 'white',
    marginRight: 20,
    height: 30,
    width: 30,
  },
  profileTouch: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  icon: {
    height: 40,
    width: 40,
    // marginRight: 10
  },
  topBar: {
    backgroundColor: "#112D4E",
    height: 350,
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: 30,
    alignItems: 'center',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"

  },
  topText: {
    color: 'white',
    fontSize: 50,

  },

  buttonContainer: {
    backgroundColor: '#DBE2EF',
    height: 100,

    borderRadius: 20,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginBottom: 20,
    marginTop: '20%',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center'
  },

  buttonContainer1: {
    backgroundColor: '#DBE2EF',
    height: 100,

    borderRadius: 20,
    alignItems: 'center',
    textAlignVertical: 'center',
    // marginBottom: 20,
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center'
  },

  buttonOutlineText: {
    marginTop: 0,
    color: '#112D4E',
    fontSize: 35
  },

  buttonOutline: {
    width: '100%',
  },
  icon: {
    height: 50,
    width: 50,
    marginRight: 10
  }
  ,

  modalContent: {

    margin: "5%",
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    width: "90%",
    top: 70
  },

  modalParent: {

  },

  img: {
    marginBottom: 10,
    height: 150,
    width: 150
  },

  modalTxt: {
    fontSize: 30,
    fontStyle: "italic",
    color: "#112D4E",

  },

  modalLogout: {
    fontSize: 17,
    marginTop: 10,
    textAlign: "center",
    alignItems: "center",
    color: "white"
  },

  logoutBtn: {
    backgroundColor: "#112D4E",
    width: "80%",
    display: "flex",
    alignItems: "center",
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 10
  },

  modalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

  },

  close: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "red"
  },

  modalEmail: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: "italic",
    color: "#112D4E"
  },

  modalDesg: {
    marginTop: 10,
    fontWeight: "700",
    color: "#3F72AF",
    fontSize: 17,
    fontStyle: "italic",

  },
  pwdContainer: {
    marginTop: 20,
    borderWidth: 2, // Border width in pixels
    borderColor: '#3F72AF', // Border color
    borderRadius: 5,
    width: "80%",
    textAlign: "center",
    paddingVertical: 7,
    borderRadius: 10,
    // backgroundColor: "#E3FEF7"
  },
  pwdText: {
    fontSize: 16,
    color: "#3F72AF",
    textAlign: "center"
  },
  closeTxt: {
    color: "#112D4E"
  }
})