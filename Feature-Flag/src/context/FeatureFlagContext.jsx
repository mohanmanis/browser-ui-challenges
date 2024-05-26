import React from 'react';
import { useContext, useState, useEffect, createContext } from 'react';

const FeatureFlagContext = createContext({});

export const useFeatureFlags = () => useContext(FeatureFlagContext);

export const FeatureFlagProvider = ({ children }) => {
  const [flags, setFlags] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch('/api/feature/flags')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setFlags(data);
    //     setLoading(false);
    //   });

    setFlags({ newFeature: true });
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <FeatureFlagContext.Provider value={flags}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
