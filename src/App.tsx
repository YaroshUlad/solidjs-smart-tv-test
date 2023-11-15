import "./App.scss";
import Card from "./components/Card";

function App() {
  return (
    <div
      class="wrapper"
      // style={{ "background-image": `url(${content().image})` }}
    >
      <div class="wrapper__top"></div>

      <div class="wrapper__bottom">
        <div
          style={{ display: "flex", "flex-direction": "column", gap: "60px" }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <Card />
            <Card />
            <Card />
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
