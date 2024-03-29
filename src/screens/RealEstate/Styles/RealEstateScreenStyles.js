import EStyleSheet from 'react-native-extended-stylesheet';
import {spacing} from '../../../constants/appStyles';

const styles = EStyleSheet.create({
  mainBody: {
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  titleText: {
    position: 'absolute',
    top: 50,
    left: 0,
    color: '#000',
    fontSize: 22,
    textAlign: 'left',
  },
  headerBG: {
    position: 'relative',
    height: 180,
    width: '100%',
  },
  filtersWrap: {
    marginVertical: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconImage: {
    marginHorizontal: 5,
    height: spacing(20),
    width: spacing(26),
  },
  iconImageSort: {
    marginHorizontal: 5,
    height: 20,
    width: 20,
  },
  filters: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#555',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  listTitleText: {
    color: '#FFF',
    fontSize: 30,
    textAlign: 'left',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  listingWrap: {
    marginHorizontal: 15,
    marginBottom: 50,
    display: 'flex',
    flexDirection: 'row',
    // overflow: 'scroll',
  },
  listItem: {
    width: 200,
    marginRight: 20,
  },
  listingImage: {
    width: 200,
    borderRadius: 15,
    height: 200,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 3,
  },
  listingInfo: {
    marginBottom: 5,
    fontSize: 12,
    color: '#444',
  },
  listingDetail: {
    fontSize: 12,
    color: '#444',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: '700',
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    marginTop: 2,
    marginRight: 5,
  },
  titleCaptionStyle: {
    marginBottom: 20,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 35,
    marginRight: 35,
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: '#BA9551',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#BA9551',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  FlateSelect: {
    color: '#FFF',
    height: 50,
    marginLeft: 35,
    marginRight: 35,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 0,
    borderBottomColor: '#FFF',
    borderColor: '#FFF',
  },
  buttonTextStyle: {
    color: '#FFF',
    paddingVertical: 14,
    fontSize: 16,
  },
  lableInput: {
    color: '#BA9551',
    fontSize: 14,
    marginLeft: 35,
    marginRight: 35,
  },
  inputStyle: {
    flex: 1,
    color: '#FFF',
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 0,
    borderColor: '#FFF',
  },
  forgotTextStyle: {
    marginLeft: 35,
    marginRight: 35,
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
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    marginLeft: 35,
    color: 'red',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterLabel: {
    height: 20,
    width: 20,
    backgroundColor: 'grey',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
  },
});

export default styles;
