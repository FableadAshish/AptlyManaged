import React from 'react';
import {ParcelsScreen} from '../screens/ParcelsScreen';
import {ServiceScreen} from '../screens/ServiceScreen';
import {FacilityScreen} from '../screens/FacilityScreen';
import {IssueScreen} from '../screens/IssueScreen';
import {PollsScreen} from '../screens/PollsScreen';
import {MessagesScreen} from '../screens/Dashboard/MessageBoard/MessagesScreen';
import {VisitorsScreen} from '../screens/VisitorsScreen';
import {LoyaltyCardScreen} from '../screens/LoyaltyCardScreen';
import {EmergencyNumbersScreen} from '../screens/EmergencyNumbersScreen';
import {EmergencyMessagesScreen} from '../screens/EmergencyMessagesScreen';
import {Dimensions} from 'react-native';
import {TabsStackNavigator} from './TabsStackNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent';
import {ConciergeDetailsScreen} from '../screens/ConciergeDetailsScreen';
import {AboutApartmentScreen} from '../screens/AboutApartmentScreen';
import {ChangePasswordScreen} from '../screens/Authentication/ChangePassword/ChangePasswordScreen';
import {Colors} from '../themes/Colors';

const Drawer = createDrawerNavigator();

console.log('Drawer', Drawer);

// const defaultGetStateForAction = Drawer.router.getStateForAction;

// Drawer.router.getStateForAction = (action, state) => {
//   console.log('createDrawerNavigator', action, state)
//     if(state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerClose') {
//         StatusBar.setHidden(false);
//     }

//     if(state && action.type === 'Navigation/NAVIGATE' && action.routeName === 'DrawerOpen') {
//         StatusBar.setHidden(true);
//     }

//     return defaultGetStateForAction(action, state);
// };
const width = Dimensions.get('screen').width;
export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      captureGestures={true}
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          width: width,
        },
        headerShown: true,
        title: '',
        headerStyle: {backgroundColor: 'red'},
        // screenOptions={{}}
      }}
      // screenOptions={{ drawerLabel: null }}
      // drawerStyle={{width: width, height: '100%'}}
      // eslint-disable-next-line prettier/prettier
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={TabsStackNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
