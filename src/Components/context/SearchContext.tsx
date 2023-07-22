import React from 'react';
import {ChildrenProp} from '../../types/Home';
import {
  SearchContextType,
  SearchInfoType,
} from '../../types/components/context/SearchContext';

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

export const SearchContextProvider = (props: any) => {
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
