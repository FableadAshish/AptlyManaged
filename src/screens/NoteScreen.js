import React, { useRef } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  View,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  Image,
  RefreshControl,
  StatusBar,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
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
// import {
//   FAB,
//   Modal,
//   Portal,
//   TouchableOpacity,
//   Text as PapaerText,
//   TextInput,
//   Button,
//   Provider,
// } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { EmergencyAlarmModal } from '../components/EmergencyAlarmModal';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../themes/Colors';

export function NoteScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const { token } = React.useContext(UserContext);
  const [data, setData] = React.useState();
  const [appUser, setAppUser] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [loadMore, setLoadMore] = React.useState(false);
  const scrollRef = useRef();
  const [isLoadMore, setIsLoadMore] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isVisible, setIsVisible] = React.useState(false)
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
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
    title: yup.string().required('Title is Required'),
    description: yup.string().required('Note is Required'),
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
        `${BASE_URL}/add-notes`,
        {
          title: issue.title,
          sub_title: issue.sub_title,
          description: issue.description,
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

  function getServices() {
    setRefreshing(false);
    setLoading(true);
    SecureStorage.getItem('user').then(user => {
      if (user) {
        const userDetails = JSON.parse(user);
        setAppUser(userDetails.details);
        axios
          .post(
            `${BASE_URL}/get-notes`,
            {
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
            console.log(response.data.data.data);
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error.response.data);
          });
      }
    });
  }

  function getMoreData() {
    setLoadMore(true);
    SecureStorage.getItem('user').then(user => {
      if (user) {
        const userDetails = JSON.parse(user);
        setAppUser(userDetails.details);
        axios
          .post(
            `${BASE_URL}/get-notes`,
            {
              user_id: userDetails.details.id,
              page: pageNumber,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(async function (response) {
            setLoading(false);
            setLoadMore(false);
            setData([...data, ...response.data.data.data]);
            console.log(response.data.data.data);
            console.log(data);
            if (
              response.data.data.last_page > response.data.data.current_page
            ) {
              setPageNumber(
                parseInt(response.data.data.current_page) + parseInt(1),
              );
              setIsLoadMore(true);
            } else {
              setIsLoadMore(false);
            }
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error.response.data);
          });
      }
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

  const Service = ({ item, onPress, style }) => (
    <View style={styles.noteView}>
      <View style={styles.noteHeading}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.dateTime}>
          {Moment(item.created_at).format('D MMM, yyyy')}
        </Text>
        <Icon
          name="trash"
          size={20}
          color="#999"
          style={styles.actionIcon}
          onPress={() => deleteFeedAlert(item.id)}
        />
      </View>
      <View style={styles.noteDetail}>
        <Text style={styles.notesubTitle}>{item.sub_title}</Text>
        <Text style={styles.noteDesc}>{item.description}</Text>
      </View>
    </View>
  );

  const services = ({ item }) => {
    return <Service item={item} style={styles.flatListBox} />;
  };

  const deleteFeedAlert = feed_id =>
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete selected Note ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => deleteFeed(feed_id) },
      ],
      { cancelable: false },
    );

  const deleteFeed = feed_id => {
    axios
      .post(
        `${BASE_URL}/delete-notes`,
        {
          note_id: feed_id,
          user_id: appUser.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        setLoading(false);
        console.log(response);
        getServices();
        setVisible(false);
      })
      .catch(e => {
        setLoading(false);
        setError(e.response.data.msg);
        console.log(e.response.data);
      });
  };

  const onDelete = id => {
    console.log('onload', id);
    //deleteFeedAlert(id);
  };

  return (
    <AuthContainer>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.mainView}>
        <View style={styles.headerBG}>
          <Heading style={styles.titleText}>Home Notes</Heading>
          <Image
            source={require('../../Image/report.png')}
            style={styles.headerImage}
          />
        </View>
        <View style={styles.roudedLayout}>
          <SafeAreaView style={styles.container}>
            <View style={styles.listWrap}>
              {data && (
                <FlatList
                  data={data}
                  numColumns="2"
                  horizontal={false}
                  renderItem={services}
                  keyExtractor={item => 'ses' + item.id}
                  initialNumToRender={10}
                  onEndReachedThreshold={0.1}
                  onEndReached={() => {
                    if (isLoadMore) {
                      getMoreData();
                    }
                  }}
                  // ListFooterComponent={renderFooter}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
              )}
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
      <View style={styles.centeredView}>
        <Modal transparent={true} visible={isVisible} animationType="fade" onRequestClose={() => setIsVisible(false)}>
          <Pressable onPressOut={()=>setIsVisible(false)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                title: '',
                sub_title: '',
                description: '',
              }}
              onSubmit={values => {
                sendIssue(values);
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
                  <TouchableWithoutFeedback>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: 450 }}>
                  <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    viewIsInsideTabBar={false}
                    showsVerticalScrollIndicator={false}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={{
                      backgroundColor: '#FFF',
                      paddingTop: 40,
                      padding: 10,
                      marginHorizontal: 15,
                      borderRadius: 30,
                      borderColor: '#FFF',
                      borderWidth: 2.5,
                      width: 300
                    }}
                    scrollEnabled>
                    <Text style={styles.lableInput}>Add Note</Text>
                    <View style={styles.SectionStyle}>
                      <Input
                        name="title"
                        placeholder="Enter Your Title"
                        style={styles.textInput}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                        keyboardType="default"
                      />
                    </View>
                    {errors.title && (
                      <Text style={styles.errorTextStyle}>{errors.title}</Text>
                    )}
                    <View style={styles.SectionStyle}>
                      <Input
                        name="sub_title"
                        placeholder="Enter Sub Title"
                        style={styles.textInput}
                        onChangeText={handleChange('sub_title')}
                        onBlur={handleBlur('sub_title')}
                        value={values.sub_title}
                        keyboardType="default"
                      />
                    </View>
                    {errors.sub_title && (
                      <Text style={styles.errorTextStyle}>
                        {errors.sub_title}
                      </Text>
                    )}
                    <View style={styles.SectionStyle}>
                      <Input
                        name="description"
                        placeholder="Enter Note"
                        style={styles.textInput}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        keyboardType="default"
                      />
                    </View>
                    {errors.description && (
                      <Text style={styles.errorTextStyle}>
                        {errors.description}
                      </Text>
                    )}
                    <Error error={error} />
                    <FilledButton
                      style={styles.submitButton}
                      title={'Submit'}
                      onPress={handleSubmit}
                    />
                  </KeyboardAwareScrollView>


                </View>
                  </TouchableWithoutFeedback>
              )}
            </Formik>
          </Pressable>
        </Modal>
      </View>
      <EmergencyAlarmModal setLoading={setLoading} />
      <Loading loading={loading} />
      {/* <View style={{ width: '100%', backgroundColor: 'red', alignItems:'flex-end', paddingLeft: 35 }}> */}

      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.openButton}>
        {/* <Text style={styles.textStyle}>Open</Text> */}
        <Icon name={'add'} size={25} />
      </TouchableOpacity>
      {/* </View> */}
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  margininView: {
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
    paddingHorizontal: 15,
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
  flatListBox: {
    // flexDirection: 'row',
  },
  listWrap: {
    flexDirection: 'row',
    width: '100%',
    flex: 1
  },
  noteView: {
    // width: '50%',
    flex: 1,
    marginHorizontal: 10,
    position: 'relative',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#EDB43C',
    backgroundColor: '#FFD379',
    borderRadius: 15,
    overflow: 'hidden',
    color: '#000',
  },
  noteHeading: {
    backgroundColor: '#F9C04A',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8B54B',
  },
  noteTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 11,
    color: '#000',
  },
  actionIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    color: '#000',
  },
  noteDetail: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  notesubTitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  noteDesc: {
    fontSize: 14,
    color: '#000',
    lineHeight: 22,
  },
  input: {
    marginHorizontal: 20,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)',
    color: '#999',
  },
  search: {
    width: '100%',
    padding: 0,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    elevation: 3,
    borderColor: '#999',
    borderWidth: 0,
    borderRadius: 25,
    backgroundColor: '#FFF',
    opacity: 0.9,
    width: 304,
    top: 0,
    zIndex: 1,
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
    marginBottom: 15,
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
  // centeredView: {
  //   // flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 22,
  // },
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

