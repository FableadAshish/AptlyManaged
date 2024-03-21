import React from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  RefreshControl,
  StatusBar,
  ScrollView, KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  TouchableNativeFeedback,
  Pressable,
  TouchableWithoutFeedback
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContainer } from '../components/AuthContainer';
import { Heading } from '../components/Heading';
import SecureStorage from 'react-native-secure-storage';
import { UserContext } from '../contexts/UserContext';
import { Input } from '../components/Input';
import { FilledButton } from '../components/FilledButton';
import { Error } from '../components/Error';
import { BASE_URL } from '../config';
import { Loading } from '../components/Loading';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';
import { Formik } from 'formik';
import * as yup from 'yup';
import { EmergencyAlarmModal } from '../components/EmergencyAlarmModal';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../themes/Colors';

export function IssueScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const { token } = React.useContext(UserContext);
  const [data, setData] = React.useState();
  const [appUser, setAppUser] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const showModal = () => setIsVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: '#FFF',
    padding: 30,
    marginHorizontal: 15,
    borderRadius: 30,
    borderColor: '#FFF',
    borderWidth: 2.5,
  };
  const [error, setError] = React.useState('');
  const validationSchema = yup.object().shape({
    issue: yup.string().required('Issue is Required'),
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getServices();
  }, []);
  React.useEffect(function () {
    getServices();
  }, []);

  function sendIssue(issue) {
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/add-issue`,
        {
          issue: issue,
          company_id: appUser.company_id,
          unit_id: appUser.unit_id,
          user_id: appUser.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        setLoading(false);
        console.log(response);
        getServices();
        setVisible(false);
      })
      .catch(function (e) {
        setLoading(false);
        setError(e.response.data.msg);
        setLoading(false);
        console.log(e.response.data);
      });
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 40,
    gestureIsClickThreshold: 5,
  };
  function onSwipeLeft(direction) {
    navigation.navigate('Advertise');
  }

  function getServices() {
    setRefreshing(false);
    setLoading(true);
    SecureStorage.getItem('user').then((user) => {
      if (user) {
        const userDetails = JSON.parse(user);
        console.log(userDetails);
        setAppUser(userDetails.details);
        axios
          .post(
            `${BASE_URL}/unit-issues`,
            {
              company_id: userDetails.details.company_id,
              unit_id: userDetails.details.unit_id,
              user_id: userDetails.details.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(function (response) {
            setLoading(false);
            setData(response.data.data.data);
            console.log("response.data.data.data", response.data.data.data);
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error.response.data);
          });
      }
    });
  }

  const Service = ({ item, onPress, style }) => (
    <View style={[styles.item, style]}>
      <View style={styles.leftView}>
        <Text style={styles.name}>{item.issue}</Text>
        {
          item.comment &&
          <Text style={[styles.dateTime, { marginBottom: 5 }]}>{item.comment}</Text>
        }
        <Text style={styles.dateTime}>
          <Icon name="time-outline" style={styles.iconSize} />{' '}
          Created: {Moment(item.created_at).format('Do MMM, yyyy H:mm ')}{' '}
        </Text>
        <Text style={styles.dateTime}>
          {item.status == 1 && <Text><Icon name="time-outline" style={styles.iconSize} />{' '}
            Completed: {Moment(item.updated_at).format('Do MMM, yyyy H:mm ')}</Text>}
        </Text>
      </View>
      <View style={styles.rightView}>
        {item.status == 0 && <Text style={styles.statusClose}>Pending</Text>}
        {item.status == 1 && <Text style={styles.statusOpen}>Completed</Text>}
        {item.status == 2 && <Text style={styles.statusOpen}>In Review</Text>}
      </View>
    </View>
  );

  const services = ({ item }) => {
    return <Service item={item} style={styles.flatListBox} />;
  };
  return (
    <AuthContainer>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } style={styles.mainView}>
        {/* <Icon
            name="arrow-back"
            size={30}
            style={{
              // position: 'absolute',
              // top: 35,
              color: 'black',
              // zIndex: 1000,
              // left: 20,
              paddingTop:50,
              backgroundColor: Colors.primarColor,
              paddingLeft: 20,
            }}
            onPress={() => navigation.goBack()}
          /> */}
        <View style={styles.headerBG} >
          <Heading style={styles.titleText}>Reported Issues</Heading>
          <Image source={require('../../Image/report.png')} style={styles.headerImage} />
        </View>
        <View style={styles.roudedLayout}>
          <SafeAreaView style={styles.container}>
            <View style={styles.listWrap}>
              {data && (
                <FlatList
                  data={data}
                  renderItem={services}
                  keyExtractor={(item) => 'ses' + item.id}
                />
              )}
            </View>
          </SafeAreaView>
        </View>
        {/* <TouchableOpacity activeOpacity={0.8} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>+</Text>
          </TouchableOpacity> */}

      </ScrollView>
      {/* <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Formik
              validationSchema={validationSchema}
              initialValues={{ issue: '' }}
              onSubmit={(values) => {
                sendIssue(values.issue);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <ScrollView style={{ paddingBottom: 15 }}>
                  <Text style={styles.lableInput}>Raise Issue</Text>
                  <View style={styles.SectionStyle}>
                    <Input
                      name="issue"
                      placeholder="Enter issue"
                      style={styles.textInput}
                      onChangeText={handleChange('issue')}
                      onBlur={handleBlur('issue')}
                      value={values.issue}
                      keyboardType="default"
                    />
                  </View>
                  {errors.issue && (
                    <Text style={styles.errorTextStyle}>{errors.issue}</Text>
                  )}
                  <Error error={error} />
                  <FilledButton style={styles.submitButton} title={'Send Issue'} onPress={handleSubmit} />
                </ScrollView>
              )}
            </Formik>

          </Modal>
        </Portal>
      </Provider> */}
      <View style={styles.centeredView}>
        <Modal transparent={true} visible={isVisible} animationType="fade" onRequestClose={() => setIsVisible(false)}>
          <Pressable onPressOut={()=>setIsVisible(false)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <Formik
              validationSchema={validationSchema}
              initialValues={{ issue: '' }}
              onSubmit={(values) => {
                sendIssue(values.issue);
                setIsVisible(false);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <ScrollView style={{
                  backgroundColor: '#FFF',
                  paddingTop: 40,
                  padding: 10,
                  marginHorizontal: 15,
                  borderRadius: 30,
                  borderColor: '#FFF',
                  borderWidth: 2.5,
                  width: 300,
                  marginTop: 200,
                  marginBottom: 350
                  // height:300
                }}>
                  <TouchableWithoutFeedback>
                    <View>

                    <Text style={styles.lableInput}>Raise Issue</Text>
                    <View style={styles.SectionStyle}>
                      <Input
                        name="issue"
                        placeholder="Enter issue"
                        style={styles.textInput}
                        onChangeText={handleChange('issue')}
                        onBlur={handleBlur('issue')}
                        value={values.issue}
                        keyboardType="default"
                      />
                    </View>
                    {errors.issue && (
                      <Text style={styles.errorTextStyle}>{errors.issue}</Text>
                    )}
                    <Error error={error} />
                    <FilledButton style={styles.submitButton} title={'Send Issue'} onPress={handleSubmit} />
                    </View>

                  </TouchableWithoutFeedback>
                </ScrollView>
              )}
            </Formik>
          </Pressable>
        </Modal>
      </View>
      <EmergencyAlarmModal setLoading={setLoading} />
      <Loading loading={loading} />
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.openButton}>
        {/* <Text style={styles.textStyle}>Open</Text> */}
        <Icon name={'add'} size={25} />
      </TouchableOpacity>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#FFF',
  },
  headerImage: {
    position: 'absolute',
    right: 40,
    top: 5,
    width: 122,
    height: 115,
  },
  roudedLayout: {
    marginTop: -36,
    minHeight: '100%',
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: '#FFF',
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
  },
  headerBG: {
    position: 'relative',
    height: 180,
    width: '100%',
    backgroundColor: '#EDB43C',
  },
  titleText: {
    position: 'absolute',
    top: 30,
    left: 0,
    color: '#000',
    fontSize: 22,
    textAlign: 'left',
  },
  listWrap: {
    marginTop: 20,
  },
  flatListBox: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#B2B2B2',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftView: {
    flex: 1,
  },
  rightView: {
    // width: 80,

    textAlign: 'right',
  },
  statusOpen: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'green',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 3,
    color: '#FFF',
    textTransform: 'uppercase',
  },
  statusClose: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 3,
    color: '#FFF',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconSize: {
    fontSize: 14,
    color: '#999',
  },
  dateTime: {
    color: '#999',
    fontSize: 12,
  },
  buttonStyle: {
    backgroundColor: '#EDB43C',
    width: 66,
    height: 66,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 45,
    marginBottom: 6,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 0,
  },
  lableInput: {
    marginBottom: 40,
    color: '#EDB43C',
    fontSize: 28,
    marginLeft: 15,
    marginRight: 15,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 0,
    backgroundColor: '#EDB43C',
    color: '#000',
  },
  errorTextStyle: {
    marginLeft: 15,
    color: 'red',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: '',
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  openButton: {
    position: 'absolute',
    bottom: 50,
    width: 50,
    height: 50,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4
  },
});
