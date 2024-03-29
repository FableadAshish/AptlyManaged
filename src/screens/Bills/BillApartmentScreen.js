import React from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  ScrollView,
  Button,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Pressable
} from 'react-native';
// import {
//   FAB,
//   Modal,
//   Portal,
//   Text as PapaerText,
//   TextInput,
//   Provider,
// } from 'react-native-paper';
import { styles } from './Styles/BillApartmentScreenStyles';
import { Formik, Field } from 'formik';
import { HeaderIconButton } from '../../components/HeaderIconButton';
import { AuthContext } from '../../contexts/AuthContext';
import { HeaderIconsContainer } from '../../components/HeaderIconsContainer';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContainer } from '../../components/AuthContainer';
import { Heading } from '../../components/Heading';
import SecureStorage from 'react-native-secure-storage';
import { Input } from '../../components/Input';
import { Error } from '../../components/Error';
import { UserContext } from '../../contexts/UserContext';
import { BASE_URL } from '../../config';
import { Loading } from '../../components/Loading';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'moment';
import { FilledButton } from '../../components/FilledButton';
import * as yup from 'yup';
import { EmergencyAlarmModal } from '../../components/EmergencyAlarmModal';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Picker from '../../components/popupView/picker';
// import DatePicker from 'react-native-datepicker';
import DatePicker from 'react-native-date-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../../themes/Colors';
import { Images } from '../../themes/Images';

export function BillApartmentScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const { token } = React.useContext(UserContext);
  const [data, setData] = React.useState();
  const [record, setRecored] = React.useState();
  const [appUser, setAppUser] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [loadMore, setLoadMore] = React.useState(false);
  const [isLoadMore, setIsLoadMore] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const showPicker = () => setVisible(true);
  const [isDateModel, setIsDateModel] = React.useState(false);
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
    bill_category: yup.string().required('Bill Category is Required'),
    title: yup.string().required('Title is Required'),
    // payment_date: yup.string().required('Bill Payment Date is Required'),
    //bill_amount: yup.string().required('Bill Amount is Required'),
    bill_amount: yup
      .string()
      .required('Bill Amount is Required')
      .matches(/^\d+(\.\d{1,2})?$/, 'Must be only digits'),
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getFacilities();
  }, []);
  React.useEffect(function () {
    getFacilities();
  }, []);

  const [date, setDate] = React.useState(new Date());

  function sendIssue(issue) {
    console.log(date);
    console.log(issue);
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/add-bill`,
        {
          company_id: appUser.company_id,
          unit_id: appUser.unit_id,
          user_id: appUser.id,
          bill_category: issue.bill_category,
          title: issue.title,
          payment_date: date,
          bill_amount: issue.bill_amount,
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
        getFacilities();
        getFacilities();
        setVisible(false);
      })
      .catch(function (e) {
        setLoading(false);
        setError(e.response.data.msg);
        setLoading(false);
        console.log(e.response.data);
      });
  }

  function getFacilities() {
    setRefreshing(false);
    setLoading(true);
    SecureStorage.getItem('user').then(user => {
      if (user) {
        const userDetails = JSON.parse(user);
        console.log(userDetails.details.company_id);
        setAppUser(userDetails.details);
        axios
          .post(
            `${BASE_URL}/about-apartments`,
            {
              company_id: userDetails.details.company_id,
              unit_id: userDetails.details.unit_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(function (response) {
            setLoading(false);
            console.log(response.data.data);
            setData(response.data.data);
            if (
              response.data.data.last_page > response.data.data.current_page
            ) {
              setPageNumber(
                parseInt(response.data.data.current_page) + parseInt(1),
              );
              setIsLoadMore(true);
            }
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error.response.data);
          });
        axios
          .post(
            `${BASE_URL}/git-records`,
            {
              company_id: userDetails.details.company_id,
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
            console.log('GtRecords', response.data.data);
            setRecored(response.data.data);
            if (
              response.data.data.last_page > response.data.data.current_page
            ) {
              setPageNumber(
                parseInt(response.data.data.current_page) + parseInt(1),
              );
              setIsLoadMore(true);
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

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loadMore ? (
          <ActivityIndicator color="#FFF" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  return (
    <AuthContainer>
      <ScrollView>
        <SafeAreaView style={styles.mainView}>
          {/* <Icon
            name="arrow-back"
            size={30}
            style={{
              // position: 'absolute',
              // top: 35,
              color: 'black',
              // zIndex: 1000,
              // left: 20,
              paddingTop: 20,
              backgroundColor: Colors.primarColor,
              paddingLeft: 20,
            }}
            onPress={() => navigation.goBack()}
          /> */}
          <View style={styles.headerBG}>
            <Heading style={styles.titleText}>Bills & Accounts</Heading>
            <Image source={Images.Apartment} style={styles.headerImage} />
          </View>
          <View style={styles.roudedLayout}>
            <View style={styles.container}>
              <View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('BillInfo', { data });
                  }}>
                  <Text style={styles.buttonTextStyle}>
                    <Icon name="pencil" style={{ fontSize: 30 }} />
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.listWrap}>
                <View style={[styles.item]}>
                  <View style={styles.topSection}>
                    <View style={[styles.topInfoWrap, styles.borderRight]}>
                      <Text style={styles.infoLbl}>Building Name</Text>
                      {data && data.image !== '' && data.image !== null && (
                        <Text style={styles.infoAns}>{data.image}</Text>
                      )}
                    </View>
                    <View style={[styles.topInfoWrap, styles.borderRight]}>
                      <Text style={styles.infoLbl}>Apartment Number</Text>
                      {data && data.owner !== '' && data.owner !== null && (
                        <Text style={styles.infoAns}>{data.owner}</Text>
                      )}
                    </View>
                    <View style={[styles.topInfoWrap, styles.borderRight]}>
                      <Text style={styles.infoLbl}>Payments</Text>
                      <TouchableOpacity
                        style={{ color: '#EDB43C' }}
                        activeOpacity={0.8}
                        onPress={() => {
                          navigation.navigate('BillListingScreen');
                        }}>
                        <Text style={{ textAlign: 'center' }}>
                          <Icon
                            name="list-circle-outline"
                            style={{ fontSize: 46, color: '#EDB43C' }}
                          />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.middleSection}>
                    <View style={[styles.parkingInfo, styles.aminityInfo]}>
                      <View style={styles.aminityLeft}>
                        <View style={styles.aminityIcon}>
                          <Image
                            source={Images.Parking}
                            style={styles.parkingImg}
                          />
                        </View>
                      </View>
                      <View style={styles.aminityRight}>
                        <Text
                          style={[styles.aminityTitle, styles.parkingTitle]}>
                          This Months Expenditure
                        </Text>
                        {record &&
                          record.sumCount !== '' &&
                          record.sumCount !== null && (
                            <Text style={styles.aminityArea}>
                              £{record.sumCount}
                            </Text>
                          )}
                        {/* <Text style={styles.aminityDetail}>2 Wheeler, 4 Wheeler</Text> */}
                      </View>
                    </View>
                    <View style={[styles.securityInfo, styles.aminityInfo]}>
                      <View style={styles.aminityLeft}>
                        <View style={styles.aminityIcon}>
                          <Image
                            source={Images.Security}
                            style={styles.SecurityImg}
                          />
                        </View>
                      </View>
                      <View style={styles.aminityRight}>
                        <Text
                          style={[styles.aminityTitle, styles.securityTitle]}>
                          Yearly Expenditure
                        </Text>
                        {record &&
                          record.yearCount !== '' &&
                          record.yearCount !== null && (
                            <Text style={styles.aminityArea}>
                              £{record.yearCount}
                            </Text>
                          )}
                        {/* <Text style={styles.aminityDetail}>16 working concieges</Text> */}
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('BillListingScreen')}>
                      <View style={[styles.fitnessInfo, styles.aminityInfo]}>
                        <View style={styles.aminityLeft}>
                          <View style={styles.aminityIcon}>
                            <Image
                              source={Images.Fitness}
                              style={styles.parkingImg}
                            />
                          </View>
                        </View>
                        <View style={styles.aminityRight}>
                          <Text
                            style={[styles.aminityTitle, styles.fitnessTitle]}>
                            View All Payment History
                          </Text>
                          <Text style={styles.aminityArea}>Records</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={[styles.item]}>
                  <Text style={styles.buildingInfoTitle}>
                    My Service Providers
                  </Text>
                  <View style={styles.buildingInfoWrap}>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Home Insurance</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data &&
                        data.home_insurance !== '' &&
                        data.home_insurance !== null && (
                          <Text style={styles.appInfoDesc}>
                            {' '}
                            {data.home_insurance}{' '}
                          </Text>
                        )}
                    </View>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>
                        Electricity Provider
                      </Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data &&
                        data.electricity_provider !== '' &&
                        data.electricity_provider !== null && (
                          <Text style={styles.appInfoDesc}>
                            {data.electricity_provider}
                          </Text>
                        )}
                    </View>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Gas Provider</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data &&
                        data.gas_provider !== '' &&
                        data.gas_provider !== null && (
                          <Text style={styles.appInfoDesc}>
                            {data.gas_provider}
                          </Text>
                        )}
                    </View>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Water</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data && data.water !== '' && data.water !== null && (
                        <Text style={styles.appInfoDesc}>{data.water}</Text>
                      )}
                    </View>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Telephone</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data &&
                        data.telephone !== '' &&
                        data.telephone !== null && (
                          <Text style={styles.appInfoDesc}>
                            {data.telephone}
                          </Text>
                        )}
                    </View>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Broadband</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data &&
                        data.broadband !== '' &&
                        data.broadband !== null && (
                          <Text style={styles.appInfoDesc}>
                            {data.broadband}
                          </Text>
                        )}
                    </View>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Mobile</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data && data.mobile !== '' && data.mobile !== null && (
                        <Text style={styles.appInfoDesc}>{data.mobile}</Text>
                      )}
                    </View>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Council Tax</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data &&
                        data.council_tax !== '' &&
                        data.council_tax !== null && (
                          <Text style={styles.appInfoDesc}>
                            {data.council_tax}
                          </Text>
                        )}
                    </View>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Tv License</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data &&
                        data.tv_license !== '' &&
                        data.tv_license !== null && (
                          <Text style={styles.appInfoDesc}>
                            {data.tv_license}
                          </Text>
                        )}
                    </View>
                    {/* <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Car Expenses</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data && data.car_expenses !== '' && data.car_expenses !== null && (
                        <Text style={styles.appInfoDesc}>£ {data.car_expenses}</Text>
                      )}
                    </View>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Service Charge</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data && data.service_charge !== '' && data.service_charge !== null && (
                        <Text style={styles.appInfoDesc}>£ {data.service_charge}</Text>
                      )}
                    </View>
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Ground Rent</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data && data.ground_rent !== '' && data.ground_rent !== null && (
                        <Text style={styles.appInfoDesc}>£ {data.ground_rent}</Text>
                      )}
                    </View>

                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Parking Fees</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data && data.parking_fees !== '' && data.parking_fees !== null && (
                        <Text style={styles.appInfoDesc}>£ {data.parking_fees}</Text>
                      )}
                    </View>

                     */}
                    <View style={styles.aprtmentInfoWrap}>
                      <Text style={styles.appInfoTitle}>Gym</Text>
                      {data == null && (
                        <Text style={styles.appInfoDesc}> N/A </Text>
                      )}
                      {data && data.gym !== '' && data.gym !== null && (
                        <Text style={styles.appInfoDesc}>{data.gym}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <EmergencyAlarmModal setLoading={setLoading} />
          <Loading loading={loading} />
        </SafeAreaView>
      </ScrollView>
      <View style={styles.centeredView}>
        <Modal transparent={true} visible={isVisible} animationType="fade">
          <Pressable onPressOut={()=>setIsVisible(false)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                bill_category: '',
                title: '',
                payment_date: '',
                bill_amount: '',
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

                <View style={{
                  backgroundColor: '#FFF',
                  paddingTop: 40,
                  padding: 10,
                  marginHorizontal: 15,
                  borderRadius: 30,
                  borderColor: '#FFF',
                  borderWidth: 2.5,
                  width: 300
                }}>
                    <KeyboardAwareScrollView
                      keyboardShouldPersistTaps="handled"
                      showsVerticalScrollIndicator={false}>
                      <Text style={styles.lableInput}>Add Bill Form</Text>
                      <View style={styles.dropdownContainer}>
                        <Picker
                          style={{ color: '#000' }}
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
                          selectedValue={values.bill_category}
                          onValueChange={handleChange('bill_category')}
                          placeholder={'Bill Category'}
                          data={[
                            { label: 'Home Insurance', value: 'Home Insurance' },
                            {
                              label: 'Electricity Provider',
                              value: 'Electricity Provider',
                            },
                            { label: 'Gas Provider', value: 'Gas Provider' },
                            { label: 'Water', value: 'Water' },
                            { label: 'Telephone', value: 'Telephone' },
                            { label: 'Broadband', value: 'Broadband' },
                            { label: 'Council Tax', value: 'Council Tax' },
                            { label: 'TV License', value: 'TV License' },
                            { label: 'Car Expenses', value: 'Car Expenses' },
                            { label: 'Service Charge', value: 'Service Charge' },
                            { label: 'Ground Rent', value: 'Ground Rent' },
                            { label: 'Parking Fees', value: 'Parking Fees' },
                            { label: 'Gym', value: 'Gym' },
                          ]}
                        />
                      </View>
                      {errors.bill_category && (
                        <Text style={styles.errorTextStyle}>
                          {errors.bill_category}
                        </Text>
                      )}
                      <View style={styles.inputContainer}>
                        <Input
                          name="title"
                          placeholder="Title"
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
                      <View style={styles.inputContainer}>
                        <View style={styles.inputContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              setIsDateModel(true);
                            }}>
                            <View
                              style={[
                                styles.inputContainer,
                                {
                                  flexDirection: 'row',
                                  borderBottomWidth: 1,
                                  borderBottomColor: '#000',
                                  paddingVertical: 5,
                                },
                              ]}>
                              <Text>{Moment(date).format('MM/DD/YYYY')}</Text>
                              <View style={{ position: 'absolute', right: 10 }}>
                                <Icon name="calendar-outline" size={24} />
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                        {/* <DatePicker
                      style={styles.datePickerStyle}
                      date={date} // Initial date from state
                      mode="date" // The enum of date, datetime and time
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      // minDate="01-01-2016"
                      // maxDate="01-01-2019"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          //display: 'none',
                          position: 'absolute',
                          left: 'auto',
                          right: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 0,

                          paddingRight: 30,
                          paddingLeft:5,
                          borderTopWidth: 0,
                          borderLeftWidth: 0,
                          borderRightWidth: 0,
                          borderBottomWidth: 1,
                          borderColor: '#000',
                          width: '100%',
                          alignItems: 'flex-start',
                          color: '#333',
                        },
                      }}
                      onDateChange={(date) => {
                        setDate(date);
                      }}
                    /> */}
                      </View>
                      {errors.payment_date && (
                        <Text style={styles.errorTextStyle}>
                          {errors.payment_date}
                        </Text>
                      )}
                      <View style={styles.inputContainer}>
                        <Input
                          name="bill_amount"
                          placeholder="Bill Amount"
                          style={styles.textInput}
                          onChangeText={handleChange('bill_amount')}
                          onBlur={handleBlur('bill_amount')}
                          value={values.bill_amount}
                          keyboardType="default"
                        />
                      </View>
                      {errors.bill_amount && (
                        <Text style={styles.errorTextStyle}>
                          {errors.bill_amount}
                        </Text>
                      )}
                      <Error error={error} />
                      <FilledButton
                        style={styles.submitButton}
                        title={'Add Bill'}
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

      <Modal
        visible={isDateModel}
        onDismiss={() => {
          setIsDateModel(false);
        }}
        contentContainerStyle={{
          backgroundColor: '#fff',
          paddingTop: 20,
          borderRadius: 15,
          marginHorizontal: 25,
        }}>
        <View
          style={{
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
          }}>
          <TouchableOpacity
            style={{ height: '100%', width: '100%' }}
            onPress={() => {
              setIsDateModel(false);
            }}>
            <Icon name="close" size={18} />
          </TouchableOpacity>
        </View>
        <DatePicker
          date={date}
          mode="date"
          onDateChange={date => {
            setDate(date);
          }}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FilledButton
            style={[
              {
                height: 40,
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            title={'Confirm'}
            onPress={() => setIsDateModel(false)}
          />
        </View>
      </Modal>

      {/* <FAB
        style={styles.fab}
        icon="plus"
        theme={{colors: {accent: 'white'}}}
        onPress={showModal}
      /> */}
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.openButton}>
        {/* <Text style={styles.textStyle}>Open</Text> */}
        <Icon name={'add'} size={25} />
      </TouchableOpacity>
    </AuthContainer>
  );
}

