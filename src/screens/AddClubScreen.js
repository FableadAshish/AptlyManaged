import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {isIos} from '../constants/appStyles';
import {Heading} from '../components/Heading';
import {Formik} from 'formik';
import {Input} from '../components/Input';
import {Success} from '../components/Success';
import {FilledButton} from '../components/FilledButton';
import {Error} from '../components/Error';
import {Loading} from '../components/Loading';
import {Colors} from '../themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
export const AddClub = () => {
  const [photos, setPhoto] = React.useState([]);
  const [height, setHeight] = React.useState(0);
  const [deletedPhotos, setDeletedPhotos] = React.useState([]);
  const handleChoosePhoto = () => {
    const options = {
      includeBase64: true,
      maxWidth: 500,
      maxHeight: 500,
    };
    ImagePicker.openCamera(options).then(response => {
      console.log('images', response);

      console.log(response);
      if (photos.length === 0) {
        setPhoto([response]);
      } else {
        setPhoto([...photos, response]);
      }

      console.log([...photos, response]);
    });

    // ImagePicker.launchCamera(options, (response) => {
    //   if (response.uri) {
    //     console.log(response);
    //     if (photos.length === 0) {
    //       setPhoto([response]);
    //     } else {
    //       setPhoto((arr) => [...arr, response]);
    //     }
    //   }
    //   console.log(photos);
    // });
  };

  const handleChooseGallery = () => {
    const options = {
      includeBase64: true,
      // maxWidth: 500,
      // maxHeight: 500,
      multiple: true,
    };

    ImagePicker.openPicker(options)
      .then(response => {
        // if (response.uri) {
        console.log('response[]', response);
        if (photos.length === 0) {
          setPhoto(response);
        } else {
          setPhoto([...photos, ...response]);
        }
        // }
        // console.log(photos);
      })
      .catch(ex => {
        // alert(ex)
      });

    // ImagePicker.launchImageLibrary(options, (response) => {
    //   if (response.uri) {
    //     console.log(response);
    //     if (photos.length === 0) {
    //       setPhoto([response]);
    //     } else {
    //       setPhoto((arr) => [...arr, response]);
    //     }
    //   }
    //   console.log(photos);
    // });
  };
  return (
    <View style={styles.container}>
      <Heading style={styles.heading}>Add Club</Heading>
      <Text style={styles.titleCaptionStyle}>Proceed with your Details</Text>
      <Formik
        // validationSchema={loginValidationSchema}
        initialValues={{
          old_password: '',
          // otp: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={values => {
          // resetPassword(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <Text style={styles.lableInput}>Name</Text>
            <View style={styles.SectionStyle}>
              <Input
                name="old_password"
                placeholder="Club Name"
                style={styles.textInput}
                onChangeText={handleChange('old_password')}
                onBlur={handleBlur('old_password')}
                value={values.old_password}
                secureTextEntry
              />
            </View>
            {/* {errors.old_password && (
                        // <Text style={styles.errorTextStyle}>
                        //   {errors.old_password}
                        // </Text>
                      )} */}

            <Text style={styles.lableInput}>Sub Title</Text>
            <View style={styles.SectionStyle}>
              <Input
                name="password"
                placeholder="Club Sub Title"
                style={{borderBottomWidth: isIos ? 1 : 0}}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
            </View>
            {/* {errors.password && (
                        <Text style={styles.errorTextStyle}>
                          {errors.password}
                        </Text>
                      )} */}
            <Text style={styles.lableInput}>Description</Text>
            <View style={styles.SectionStyle}>
              <Input
                style={{borderBottomWidth: isIos ? 1 : 0}}
                placeholder={'Description'}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry
              />
            </View>

            <Text style={styles.lableInput}>Club Image</Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="camera"
                style={styles.sendIcon}
                onPress={handleChoosePhoto}
              />
              <Icon
                name="images"
                style={styles.sendIcon}
                onPress={handleChooseGallery}
              />
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorTextStyle}>
                {errors.confirmPassword}
              </Text>
            )}
            {/* <Success error={success} /> */}
            <FilledButton
              title={'Add'}
              onPress={handleSubmit}
              style={styles.loginButton}
            />
            {/* <Error error={error} /> */}
          </>
        )}
      </Formik>
      {/* <TouchableOpacity style={styles.loginButtonStyle}>
                  <Text
                    style={styles.haveAccount}
                    onPress={() => {
                      navigation.navigate('Login');
                    }}>
                    Login
                  </Text>
                </TouchableOpacity> */}
      {/* <Loading loading={loading} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    backgroundColor: '#EDB43C',
  },
  container: {
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: Colors.primarColor,
  },
  headerImage: {
    marginVertical: 30,
    width: 116,
    height: 120,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
  },
  heading: {
    marginLeft: 0,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  titleCaptionStyle: {
    marginBottom: 20,
    color: '#000',
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
  },
  loginWithStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  lableInput: {
    marginTop: 20,
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    color: '#000',
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    borderRadius: 0,
    borderColor: '#000',
    borderBottomWidth: isIos ? 1 : 0,
  },
  forgotTextStyle: {
    marginBottom: 0,
    color: '#000',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 14,
  },
  orWithTextStyle: {
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButton: {
    marginLeft: 0,
    width: '100%',
    backgroundColor: '#000',
    color: '#FFF',
    marginTop:80
  },
  forgotTextStyle: {
    marginBottom: 30,
    color: '#FFF',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 14,
  },
  orwithTextStyle: {
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
  },
  registerTextStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  haveAccount: {
    marginBottom: 40,
    paddingVertical: 14,
    width: '100%',
    backgroundColor: '#000',
    color: '#FFF',
    borderRadius: 26,
    textAlign: 'center',
    fontSize: 16,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sendIcon: {
    fontSize: 28,
    color: 'black',
    marginHorizontal: 10,
    marginTop:10
  },
});
