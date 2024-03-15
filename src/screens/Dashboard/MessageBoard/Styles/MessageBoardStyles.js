import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  mainView: {
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 15,
  },
  headerImage: {
    position: 'absolute',
    right: 30,
    top: 40,
    width: 95,
    height: 90,
  },
  roudedLayout: {
    marginTop: -36,
    paddingHorizontal: 15,
    paddingVertical: 20,
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
    top: 0,
    left: 0,
    color: '#000',
    fontSize: 22,
    textAlign: 'left',
  },
  listWrap: {
    marginTop: 20,
  },
  flatListBox: {
    backgroundColor: '#FEFEFE',
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    borderRadius: 5,
  },
  leftView: {
    width: '75%',
  },
  rightView: {
    width: '25%',
  },
  statusOpen: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'green',
    borderRadius: 5,
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
    paddingTop: 3,
    paddingBottom: 3,
    color: '#FFF',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  provider: {
    marginTop: 10,
  },
  contact: {
    marginTop: 5,
  },
  iconSize: {
    fontSize: 16,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
