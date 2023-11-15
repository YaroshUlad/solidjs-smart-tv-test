import { For } from "solid-js";
import "./App.scss";
import Card from "./components/Card";
import ScrollWrapper from "./components/ScrollWrapper";

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
          <ScrollWrapper
            direction="row"
            title="firstRow"
            duration={600}
            onSlideChange={() => {}}
          >
            <For each={Array(25).fill("2")}>
              {(el, index) => {
                return <Card active={index() === 1} index={index()} />;
              }}
            </For>
          </ScrollWrapper>
        </div>
      </div>
    </div>
  );
}

export default App;
