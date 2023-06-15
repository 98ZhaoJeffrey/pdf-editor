'use client'
import React, { createContext, useState } from 'react';

type ViewPreferenceContextType = {
  gridView: boolean;
  toggleView: () => void;
};

export const ViewPreferenceContext = createContext<ViewPreferenceContextType>({
    gridView: true,
    toggleView: () => {},
  });

export function ViewPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [gridView, setGridView] = useState<boolean>(true);

  const toggleView = () => {
    setGridView(prev => !prev);
  };

  const contextValue: ViewPreferenceContextType = {
    gridView,
    toggleView,
  };

  return (
    <ViewPreferenceContext.Provider value={contextValue}>
      {children}
    </ViewPreferenceContext.Provider>
  );
}