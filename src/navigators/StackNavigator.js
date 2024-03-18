import React from 'react';
import {PollsResultScreen} from '../screens/PollsResultScreen';
import {ConciergeDetailsScreen} from '../screens/ConciergeDetailsScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {AdvertiseScreen} from '../screens/AdvertiseScreen';
import {RealEstateScreen} from '../screens/RealEstate/RealEstateScreen';
import {RealEstateRentScreen} from '../screens/RealEstate/RealEstateRentScreen';
import {RealEstateDetailScreen} from '../screens/RealEstate/RealEstateDetailScreen';
import {AddPropertyScreenWithImage} from '../screens/AddProperty/AddPropertyScreenWithImage';
import {EditAboutApartmentScreen} from '../screens/EditAboutApartmentScreen';
import {EditBillScreen} from '../screens/EditBillScreen';
import {FeedsScreen} from '../screens/FeedsScreen';
import {NotificationScreen} from '../screens/Dashboard/Notifications/NotificationScreen';
import {NoteScreen} from '../screens/NoteScreen';
import {Login, LoginScreen} from '../screens/Authentication/Login/LoginScreen';
import {BillApartmentScreen} from '../screens/Bills/BillApartmentScreen';
import {EditprofileScreen} from '../screens/EditprofileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerNavigator} from './DrawerNavigator';
import {HamburgerMenu} from '../components/HamburgerMenu';
import AddProperty from '../screens/AddProperty';
import UpdateProfiles from '../screens/EditProfiles';
import UpdateInfo from '../screens/AboutForm';
import BillInfo from '../screens/EditForm';
import {FeedsCommentScreen} from '../screens/FeedsCommentScreen';
import {MyPropertyListingScreen} from '../screens/MyPropertyListingScreen';
import {ServiceScreen} from '../screens/ServiceScreen';
import {FacilityScreen} from '../screens/FacilityScreen';
import {IssueScreen} from '../screens/IssueScreen';
import {ParcelsScreen} from '../screens/ParcelsScreen';
import {MessagesScreen} from '../screens/Dashboard/MessageBoard/MessagesScreen';
import {EmergencyMessagesScreen} from '../screens/EmergencyMessagesScreen';
import {VisitorsScreen} from '../screens/VisitorsScreen';
import {ChangePasswordScreen} from '../screens/Authentication/ChangePassword/ChangePasswordScreen';
import {LoyaltyCardScreen} from '../screens/LoyaltyCardScreen';
import {PollsScreen} from '../screens/PollsScreen';
import {AboutApartmentScreen} from '../screens/AboutApartmentScreen';
import {EmergencyNumbersScreen} from '../screens/EmergencyNumbersScreen';
import {ChatScreen} from '../screens/ChatScreen';
import {ChatListingScreen} from '../screens/ChatListingScreen';
import {BillListingScreen} from '../screens/BillListingScreen';
import {PrivacyPolicyScreen} from '../screens/PrivacyPolicyScreen';
import {TermsConditionsScreen} from '../screens/TermsConditionsScreen';
import {NoAccessScreen} from '../screens/NoAccessScreen';
import {MyClubs} from '../screens/MyClubsScreen';
import {ClubsScreen} from '../screens/ClubsScreen';
import {AddClub} from '../screens/AddClubScreen';
import {Colors} from '../themes/Colors';
const Stack = createStackNavigator();

export function StackNavigator({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        headerStyle: {
          backgroundColor: Colors.primarColor,
          shadowOpacity: 0,
          elevation: 0,
        },
        // headerTintColor: 'red',
        // headerTitleAlign: 'left',
        // headerTitleContainerStyle: {backgroundColor: 'red'},
        // header
      }}>
      <Stack.Screen
        name="drawer"
        component={DrawerNavigator}
        options={{
          title: '',
          headerLeft: () => <HamburgerMenu />,
          // headerShown:true,
        }}
      />
      <Stack.Screen
        name="EmergencyNumbers"
        component={EmergencyNumbersScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="AboutApartmentScreen"
        component={AboutApartmentScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Polls"
        component={PollsScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Loyalty Card Stores"
        component={LoyaltyCardScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Visitors"
        component={VisitorsScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="EmergencyMessages"
        component={EmergencyMessagesScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Message Board"
        component={MessagesScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Parcels"
        component={ParcelsScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Issue"
        component={IssueScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Facility"
        component={FacilityScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Service"
        component={ServiceScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="PollsResult"
        component={PollsResultScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="ConciergeDetails"
        component={ConciergeDetailsScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Advertise"
        component={AdvertiseScreen}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="AddProperty"
        component={AddProperty}
        options={{title: ''}}
      />
      <Stack.Screen
        name="OldAddProperty"
        component={AddPropertyScreenWithImage}
        options={{title: ''}}
      />
      <Stack.Screen
        name="RealEstate"
        component={RealEstateScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="RealEstateRent"
        component={RealEstateRentScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Feeds"
        component={FeedsScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="FeedsComment"
        component={FeedsCommentScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{title: ''}}
      />
      <Stack.Screen name="Note" component={NoteScreen} options={{title: ''}} />
      <Stack.Screen
        name="Editprofile"
        component={EditprofileScreen}
        options={{title: 'Editprofile'}}
      />
      <Stack.Screen
        name="RealEstateDetail"
        component={RealEstateDetailScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="BillApartment"
        component={BillApartmentScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="EditAboutApartmentScreen"
        component={EditAboutApartmentScreen}
        options={{title: 'Edit About Apartment'}}
      />
      <Stack.Screen
        name="EditBillScreen"
        component={EditBillScreen}
        options={{title: 'Edit Bill'}}
      />
      <Stack.Screen
        name="MyPropertyListing"
        component={MyPropertyListingScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
      <Stack.Screen name="Chat" component={ChatScreen} options={{title: ''}} />
      <Stack.Screen
        name="ChatListing"
        component={ChatListingScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="UpdateProfiles"
        component={UpdateProfiles}
        options={{title: 'Edit Profile'}}
      />
      <Stack.Screen
        name="UpdateInfo"
        component={UpdateInfo}
        options={{title: 'Edit About Apartment'}}
      />
      <Stack.Screen
        name="BillInfo"
        component={BillInfo}
        options={{title: 'Edit Bill Apartment'}}
      />
      <Stack.Screen
        name="BillListingScreen"
        component={BillListingScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="TermsConditionsScreen"
        component={TermsConditionsScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="NoAccessScreen"
        component={NoAccessScreen}
        options={{title: ''}}
      />
      <Stack.Screen name="MyClubs" component={MyClubs} options={{title: ''}} />
      <Stack.Screen
        name="Clubs"
        component={ClubsScreen}
        options={{title: ''}}
      />
      <Stack.Screen name="AddClub" component={AddClub} options={{title: ''}} />
    </Stack.Navigator>
  );
}
