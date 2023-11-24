import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Button, Image} from 'react-native';
import {
  accountTabIcons,
  homeTabIcons,
  notificationTabIcons,
  programTabIcon,
} from '../../Assets';
import HomeStackNavigation from '../StackNavigation/HomeStackNavigation';
import ProgramStackNavigation from '../StackNavigation/ProgramStackNavigation';
import Notification from '../../Screens/Notification/Notification';
import MyAccountStackNavigation from '../StackNavigation/MyAccountStackNavigation';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#FFC700',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1F043B',
          // height: 55,
        },
        tabBarLabelStyle: {
          fontWeight: '700',
          fontFamily: 'Aeonik',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor, size, focused}) => (
            <Image
              source={homeTabIcons}
              tintColor={focused ? '#FFC700' : '#BDB3C7'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Program"
        component={ProgramStackNavigation}
        options={{
          tabBarLabel: 'Program',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={programTabIcon}
              tintColor={focused ? '#FFC700' : '#BDB3C7'}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={notificationTabIcons}
              tintColor={focused ? '#FFC700' : '#BDB3C7'}
              size={size}
            />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Account"
        component={MyAccountStackNavigation}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              source={accountTabIcons}
              tintColor={focused ? '#FFC700' : '#BDB3C7'}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
