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
export const ClubsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{height: '100%'}}>
      <View>
        <Icon
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
        />
        <ImageBackground
          source={require('../../Image/plain-background.png')}
          style={styles.headerBG}>
          <Heading style={styles.titleText}>My Clubs</Heading>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBG: {
    // position: 'absolute',
    height: 185,
    // width: '100%',
    flex: 1,
    top: 0,
  },
  backicon: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontSize: 30,
  },
  titleText: {
    position: 'absolute',
    top: 100,
    left: 10,
    color: '#000',
    fontSize: 22,
    textAlign: 'left',
  },
});
