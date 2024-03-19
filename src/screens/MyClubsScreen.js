import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Heading} from '../components/Heading';
import {Colors} from '../themes/Colors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export const MyClubs = () => {
  const navigation = useNavigation();
  return (
    <View style={{height: '100%', width: '100%'}}>
        <View style={styles.headerContent}>
          {/* <Icon
            name="arrow-back"
            size={30}
            style={{
              // position: 'absolute',
              // top: 35,
              color: 'black',
              // zIndex: 1000,
              // left: 20,
              paddingTop: 50,
              backgroundColor: Colors.primarColor,
              paddingLeft: 20,
            }}
            onPress={() => navigation.goBack()}
          /> */}
          <Icon
            name="add-outline"
            size={30}
            style={{
              // position: 'absolute',
              // top: 35,
              color: 'black',
              // zIndex: 1000,
              // left: 20,
              paddingTop: 50,
              backgroundColor: Colors.primarColor,
              paddingLeft: 20,
            }}
            onPress={() => navigation.navigate('AddClub')}
          />
        </View>
      <View>
        <ImageBackground
          source={require('../../Image/plain-background.png')}
          style={styles.headerBG}>
          <Heading style={styles.titleText}>My Clubs</Heading>
        </ImageBackground>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red',
          // height:'a%'
          marginTop: 150,
          flex: 2,
        }}>
        <Text>Click on All (bottom right) to join a new club</Text>
      </View>

      <View
        style={{
          marginBottom: 10,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          paddingHorizontal: 15,
          paddingBottom: 15,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Clubs')}
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.primarColor,
            width: 50,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBG: {
    position: 'absolute',
    height: 185,
    width: '100%',
    flex: 1,
    top: 0,
    // marginBottom: 50
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: Colors.primarColor
  },
  backicon: {
    fontSize: 30,
  },
  titleText: {
    color: '#000',
    fontSize: 22,
    textAlign: 'left',
    top: 50,
    left: 10,
  },
  addIcon: {
    fontSize: 30,
    // marginLeft: 300,
    // fontWeight: '900',
  },
});
