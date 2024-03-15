import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  mainView: {
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 15,
  },
  titleText: {
    position: 'absolute',
    top: 80,
    left: 0,
    color: '#000',
    fontSize: 22,
    textAlign: 'left',
  },
  headerBG: {
    position: 'relative',
    height: 185,
    width: '100%',
    marginBottom: 30,
  },
  listWrap: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#888',
    alignItems: 'center',
  },
  leftView: {
    flex: 1,
  },
  DelIconSize: {
    color: '#D00404',
    fontSize: 20,
  },
  dateText: {
    fontSize: 30,
    color: '#555',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#888',
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
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  provider: {
    marginTop: 5,
    marginBottom: 5,
    color: '#666',
  },
  contact: {
    fontSize: 14,
    color: '#666',
  },
  iconSize: {
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backicon: {
    position: 'absolute',
    top: 15,
    left: 20,
    fontSize: 30,
  },
});