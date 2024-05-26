import withFeatureFlag from "./HOC/withFeatureFlag.jsx";
import FeatureComponent from "./components/FeatureComponent.jsx";
import { FeatureFlagProvider } from "./context/FeatureFlagContext.jsx";
import "./App.css";

const FeatureComponentWithFlag = withFeatureFlag(
  FeatureComponent,
  "newFeature"
);


function App() {
  return (
    <FeatureFlagProvider>
      <div>
        <h1>Featute Flag Component: </h1>
        <FeatureComponentWithFlag />
      </div>
    </FeatureFlagProvider>
  );
}

export default App;
