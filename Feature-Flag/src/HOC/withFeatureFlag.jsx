import { useFeatureFlags } from '../context/FeatureFlagContext';

const withFeatureFlag = (Component, feature) => (props) => {
  const flags = useFeatureFlags();

  if (!flags[feature]) {
    return null;
  }

  return <Component {...props} />;
};

export default withFeatureFlag;
