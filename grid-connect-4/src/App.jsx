import GridUsingCssGrid from "./grid-using-css-grid/Grid";
import GridUsingCssFlex from "./grid-using-css-flex/Grid";
import "./App.css";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <h1>Using CSS Grid</h1>
        <GridUsingCssGrid rows={5} cols={5} />
      </div>
      <div>
        <h1>Using CSS Flex</h1>
        <GridUsingCssFlex rows={5} cols={5} />
      </div>
    </div>
  );
}

export default App;
