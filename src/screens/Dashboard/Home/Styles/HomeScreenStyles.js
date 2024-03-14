import EStyleSheet from 'react-native-extended-stylesheet';
import {Colors} from '../../../../themes/Colors';

export const styles = EStyleSheet.create({
  mainView: {
    backgroundColor: Colors.primarColor,
    // color: '#333',
  },
  container: {
    backgroundColor: Colors.primarColor,
  },
  headerWrap: {
    paddingVertical: 50,
    backgroundColor: Colors.primarColor,
  },
  greetText: {
    color: '#333',
    paddingHorizontal: 15,
    fontSize: 18,
  },
  nameText: {
    marginVertical: 0,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  roudedLayout: {
    height: '100%',
    marginTop: -36,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
  },
  iconTime: {
    fontSize: 16,
  },
  iconText: {
    fontWeight: 'bold',
    color: '#333',
  },
  conciergeText: {
    color: '#333',
    marginTop: 5,
  },
  infoIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 30,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  alertInfo: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#D8D8D8',
    padding: 20,
    paddingBottom: 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  leftView: {
    width: '25%',
  },
  rightView: {
    width: '75%',
  },
  paymentText: {
    marginBottom: 10,
    color: '#000',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'right',
  },
  payAmountText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'right',
  },
  seeDetail: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#EDB43C',
    paddingHorizontal: 15,
    marginTop: -10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  seeDetailText: {
    color: '#FFF',
    fontSize: 14,
    paddingVertical: 15,
    textTransform: 'uppercase',
  },
  seeDetailIconText: {
    height: 50,
    textAlign: 'right',
  },
  titleTextWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#EDB43C',
    paddingHorizontal: 15,
  },
  titleText: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 17,
    fontWeight: '500',
    color: '#FFF',
  },
  viewallText: {
    width: 26,
  },

  visitorsList: {
    // position: 'relative',
    marginBottom: 20,
    // backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    color: '#000',
    fontSize: 18,
    flex: 1,
    padding: 15,
    borderRadius: 10,
  },
  flatNumbr: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFF',
    backgroundColor: '#333',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  timeText: {
    // position: 'absolute',
    flex: 1,
    fontSize: 12,
    // fontWeight: '100',
    color: '#888',
    alignItems: 'flex-end',
  },
  visitorName: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  visitInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visitorOcc: {
    marginBottom: 10,
    // marginTop: 5,
    fontSize: 14,
    fontWeight: '300',
    color: '#333',
  },
  dateTime: {
    marginTop: 12,
    // width: '75%',
    fontSize: 14,
    fontWeight: '300',
    color: '#888',
  },
  msgBoardWrap: {
    // backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    marginRight: 15,
    width: 250,
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  msgTitle: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
    // textTransform: 'capitalize',
  },
  infoText: {
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: '400',
  },
  detailText: {
    marginBottom: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    textAlign: 'right',
    color: '#D1AE6C',
  },
  item: {
    backgroundColor: '#04141A',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  discoverWrap: {
    marginBottom: 10,
  },
  discoverTitleWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#EDB43C',
    paddingHorizontal: 15,
  },
  liveChat: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  liveChatImage: {
    width: 100,
    height: 100,
  },
  iconSee: {
    fontSize: 26,
    color: '#000',
  },
  iconSize: {
    fontSize: 16,
  },
  SectionStyle: {
    // flexDirection: 'row',
    height: 200,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  yesButtonStyle: {
    backgroundColor: 'green',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#BA9551',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  noButtonStyle: {
    backgroundColor: 'red',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#BA9551',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFF',
    paddingVertical: 14,
    fontSize: 16,
  },
  titleTextStyle: {
    color: '#000',
    fontSize: 25,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    fontWeight: '700',
  },
  helpImage: {
    position: 'absolute',
    bottom: 90,
    height: 60,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countMessage: {
    position: 'absolute',
    top: 35,
    left: 35,
  },
});
