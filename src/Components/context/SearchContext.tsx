import React from 'react';
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
  clearSearch: () => {},
};

export const SearchContext: React.Context<SearchContextType> =
  React.createContext(contextDefaultValue);

export const SearchContextProvider = (props: any) => {
  const [searchInfo, updateSearchInfo] = React.useState<SearchInfoType>(
    searchInfoDefaultValue,
  );

  const clearSearch = () => {
    updateInfo({
      searchQuery: '',
    });
  };

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
    clearSearch,
  };

  const {children} = props;

  return (
    <SearchContext.Provider value={searchContextObj}>
      {children}
    </SearchContext.Provider>
  );
};
