import { JSXElement } from "solid-js";
import styles from "./styles.module.scss";

interface ScrollWrapperProps {
  children: JSXElement;
}

const ScrollWrapper = (props: ScrollWrapperProps) => {
  return (
    <div class={styles.ScrollWrapper}>
      <div class={styles.ScrollContainer}>{props.children}</div>
    </div>
  );
};

export default ScrollWrapper;
