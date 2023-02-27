import React from 'react';
import {
  ChildrenProp,
  SearchContextType,
  SearchInfoType,
} from '../../types/Home';

const searchInfoDefaultValue: SearchInfoType = {
  searchQuery: '',
  selectedPlaceId: '',
};

const contextDefaultValue: SearchContextType = {
  searchInfo: searchInfoDefaultValue,
  updateInfo: (_: any) => {},
};

export const SearchContext: React.Context<SearchContextType> =
  React.createContext(contextDefaultValue);

export const SearchContextProvider = (props: ChildrenProp) => {
  const [searchInfo, updateSearchInfo] = React.useState<SearchInfoType>(
    searchInfoDefaultValue,
  );

  const updateInfo = (newInfo: SearchInfoType) => {
    newInfo = {
      ...searchInfo,
      ...newInfo,
    };

    updateSearchInfo(newInfo);
  };

  const searchContextObj: SearchContextType = {
    searchInfo,
    updateInfo,
  };

  const {children} = props;

  return (
    <SearchContext.Provider value={searchContextObj}>
      {children}
    </SearchContext.Provider>
  );
};
