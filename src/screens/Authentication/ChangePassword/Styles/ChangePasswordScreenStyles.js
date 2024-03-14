import EStyleSheet from 'react-native-extended-stylesheet';
import {isIos} from '../../../../constants/appStyles';
import {Colors} from '../../../../themes/Colors';

export const styles = EStyleSheet.create({
  mainView: {
    height: '100%',
    backgroundColor: Colors.primarColor,
  },
  container: {
    paddingHorizontal: 20,
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
    // marginTop:150
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
});
