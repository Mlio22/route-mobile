import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  SearchLocation: undefined;
  LocationDetails: {
    selectedPlaceId: string;
  };
};

export type SearchLocationProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchLocation'
>;
export type HomeStackProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type LocationDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'LocationDetails'
>;
