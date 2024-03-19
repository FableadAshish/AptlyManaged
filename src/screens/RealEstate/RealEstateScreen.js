import React from 'react';
import axios from 'axios';

import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Text,
  ImageBackground,
  SectionList,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {Heading} from '../../components/Heading';
import {AuthContext} from '../../contexts/AuthContext';
import {ThemeContext} from '../../contexts/ThemeContext';
import {Input} from '../../components/Input';
import {FilledButton} from '../../components/FilledButton';
import {UserContext} from '../../contexts/UserContext';
import SecureStorage from 'react-native-secure-storage';
import {Error} from '../../components/Error';
import {Success} from '../../components/Success';
import {AuthContainer} from '../../components/AuthContainer';
import {Loading} from '../../components/Loading';
import {BASE_URL} from '../../config';
import Moment from 'moment';
import {EmergencyAlarmModal} from '../../components/EmergencyAlarmModal';
import {Formik} from 'formik';
import * as yup from 'yup';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import {spacing} from '../../constants/appStyles';
import PropertyFilters from '../../components/PropertyFilters';
import Picker from '../../components/popupView/picker';
import {defaultPropertyImage} from '../MyPropertyListingScreen';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Colors} from '../../themes/Colors';
import {Images} from '../../themes/Images';
import {styles} from './Styles/RealEstateScreenStyles';

axios.interceptors.response.use(
  function (response) {
    // console.log('interceptor response', response);
    response.config.meta.responseTime =
      new Date().getTime() - response.config.meta.requestTimestamp;
    return response;
  },
  function (error) {
    // console.log('interceptor response error', error);
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  function (request) {
    console.log('interceptor request', request);
    request.meta = request.meta || {};
    request.meta.requestTimestamp = new Date().getTime();
    return request;
  },
  function (error) {
    console.log('interceptor request error', error);
    return Promise.reject(error);
  },
);

export function RealEstateScreen({navigation, route}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const {token} = React.useContext(UserContext);
  const [data, setData] = React.useState({});
  const [appUser, setAppUser] = React.useState();
  const [loadMore, setLoadMore] = React.useState(false);
  const [isLoadMore, setIsLoadMore] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({});
  const [sort, setSort] = React.useState('recent');
  const [mounted, setMounted] = React.useState(false);

  const {params = {}} = route;
  console.log('RealEstateScreen params', params);
  const [propertyType, setPropertyType] = React.useState(params.property_type);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getServices(filters);
  }, []);
  React.useEffect(function () {
    setMounted(true);
    getServices(filters);
  }, []);

  React.useEffect(
    function () {
      if (mounted) {
        getServices(filters);
      }
    },
    [sort],
  );

  React.useEffect(() => {
    if (params.refetch) {
      getServices(filters);
    }
  }, [params]);

  function getServices(filter) {
    setRefreshing(false);
    setLoading(true);
    console.log('getServices filters', filter);
    const isFilter =
      (filter && Object.keys(filter).length) || sort !== 'recent';

    const filterData = new FormData();

    if (isFilter) {
      if (Object.keys(filter).length) {
        Object.keys(filter).map(f => {
          filterData.append(f, filter[f]);
        });
      }
      filterData.append('sortBy', sort);
    }

    const defaultData = new FormData();
    if (propertyType) {
      filterData.append('property_type', propertyType);
      defaultData.append('property_type', propertyType);
    }
    let url = isFilter ? 'filters' : 'get-realEstate';
    setData({});
    SecureStorage.getItem('user').then(user => {
      if (user) {
        const userDetails = JSON.parse(user);
        setAppUser(userDetails.details);
        const data = isFilter ? filterData : defaultData;
        axios
          .post(`${BASE_URL}/${url}`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            setLoading(false);
            let data = response.data;
            console.log(data.data);
            setData(data.data || {});
            if (data.last_page > data.current_page) {
              setPageNumber(parseInt(data.current_page) + parseInt(1));
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
          <ActivityIndicator color="#FFF" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  const onChangeFilter = (value, name) => {
    setFilters(value);
    setShowFilters(false);
    getServices(value);
  };

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const Service = ({item, onPress, style, navigation}) => {
    const image = item.image
      ? item.image
      : item.images[0]
      ? item.images[0]
      : defaultPropertyImage;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RealEstateDetail', {selectedFeed: item})
        }
        style={styles.listItem}>
        <Image
          // resizeMode="contain"
          style={styles.listingImage}
          source={{
            uri: image,
          }}
        />

        <Text style={styles.listingTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.listingInfo}>
          {item.description}
        </Text>
        <View style={styles.listingDetail}>
          <Text style={styles.price}>£{formatNumber(item.price)}</Text>
          <View style={styles.time}>
            <Icon name="time-outline" size={16} style={styles.timeIcon} />
            <Text>{Moment(item.created_at).fromNow()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const getMoreData = () => {};

  const services = ({item}) => {
    return (
      <Service navigation={navigation} item={item} style={styles.flatListBox} />
    );
  };
  const filterLength = filters ? Object.keys(filters).length : 0;
  const dataKeys = Object.keys(data);
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.mainView}>
      <SafeAreaView
        style={styles.container}
        keyboardShouldPersistTaps="handled">
        <View>
          <KeyboardAvoidingView enabled>
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
            <ImageBackground
              source={Images.EstateDetail}
              style={styles.headerBG}>
              <Heading style={styles.titleText}>Real Estate</Heading>
            </ImageBackground>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.filtersWrap}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => setShowFilters(true)}>
            <Image
              source={Images.Filter}
              style={styles.iconImage}
            />
            <Text style={styles.filters}>Filters</Text>
            {filterLength ? (
              <View style={styles.filterLabel}>
                <Text style={{color: 'white'}}>{filterLength}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            // onPress={() => alert('Shorting')}
          >
            <Image source={Images.Sort} style={styles.iconImageSort} />
            <Text style={styles.filters}>Sorting</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={sort}
            onValueChange={text => {
              setSort(text);
            }}
            placeholder={'Most Recent (Default)'}
            data={[
              {label: 'Most Recent (Default)', value: 'recent'},
              {label: 'Price (Low to High)', value: 'priceLow'},
              {label: 'Price (High to Low)', value: 'priceHigh'},
            ]}
          />
        </View>

        {!loading && !dataKeys.length ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: spacing(50),
              paddingHorizontal: spacing(15),
            }}>
            <Text style={{fontSize: 15, textAlign: 'center'}}>
              Sorry, no results found - try a different search filter
            </Text>
          </View>
        ) : null}
        {dataKeys.length
          ? dataKeys.map(key => (
              <>
                <Heading style={styles.listTitleText}>
                  {data[key].buildingName}
                </Heading>
                <View style={styles.listingWrap}>
                  <FlatList
                    horizontal={true}
                    data={data[key].items || []}
                    renderItem={services}
                    keyExtractor={item => 'ses' + item.id}
                    initialNumToRender={10}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                      if (isLoadMore) {
                        getMoreData();
                      }
                    }}
                    ListFooterComponent={renderFooter}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                  />
                </View>
              </>
            ))
          : null}
        {/* {dataKeys.length && <Heading style={styles.listTitleText}>Company Name</Heading>} */}
        {data && (
          <View style={styles.listingWrap}>
            <FlatList
              horizontal={true}
              data={data}
              renderItem={services}
              keyExtractor={item => 'ses' + item.id}
              initialNumToRender={10}
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                if (isLoadMore) {
                  getMoreData();
                }
              }}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        )}

        <EmergencyAlarmModal setLoading={setLoading} />
        <Loading loading={loading} />
      </SafeAreaView>
      <PropertyFilters
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onChange={onChangeFilter}
      />
    </ScrollView>
  );
}

