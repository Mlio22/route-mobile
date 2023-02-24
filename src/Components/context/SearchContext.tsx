import React from 'react';

type SearchInfoType = {
  searchQuery?: string;
  selectedPlaceId?: string;
};

type SearchContextType = {
  searchInfo: SearchInfoType;
  updateInfo: (newInfo: SearchInfoType) => void;
};

type props = {
  children: React.ReactNode;
};

const searchInfoDefaultValue: SearchInfoType = {
  searchQuery: '',
  selectedPlaceId: '',
};

const contextDefaultValue: SearchContextType = {
  searchInfo: searchInfoDefaultValue,
  updateInfo: (_: any) => {},
};

const SearchContext: React.Context<SearchContextType> =
  React.createContext(contextDefaultValue);

const SearchContextProvider = (props: props) => {
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

export type {SearchInfoType, SearchContextType};
export {SearchContext, SearchContextProvider, searchInfoDefaultValue};
