import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  WelcomePage: undefined;
  PreferencesVehicleFirst:undefined;
  Home: undefined; 
  SearchLocation: undefined;
  LocationDetails: {
    selectedPlaceId: string;
  };
  History: undefined;
  SettingsGeneral: undefined;
  ManualLocation: undefined;
  PreferencesSettingsFirst: undefined;

  // coretan
  MapScreen: undefined;
};


export type PreferencesVehicleFirstprops = NativeStackScreenProps<RootStackParamList, 'PreferencesVehicleFirst'>;
export type WelcomePageProps = NativeStackScreenProps<RootStackParamList, 'WelcomePage'>;
export type SearchLocationProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchLocation'
>;
export type HomeStackProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type LocationDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'LocationDetails'
>;
export type Historyprops = NativeStackScreenProps<RootStackParamList, 'History'>;
export type SettingsGeneralprops = NativeStackScreenProps<RootStackParamList, 'SettingsGeneral'>;
export type ManualLocationprops = NativeStackScreenProps<RootStackParamList, 'ManualLocation'>;
export type PreferencesSettingsFirstprops = NativeStackScreenProps<RootStackParamList, 'PreferencesSettingsFirst'>;

// coretan 
export type MapScreenprops = NativeStackScreenProps<RootStackParamList, 'MapScreen'>;

