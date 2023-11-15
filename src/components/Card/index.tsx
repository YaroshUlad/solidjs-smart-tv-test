import { Show } from "solid-js";
import styles from "./styles.module.scss";
import { Content } from "./../../types";
import image from "./../../assets/image.jpg";

interface CardProps {
  index: number;
  active?: boolean;
  content?: Content;
}

const Card = (props: CardProps) => {
  return (
    <div class={styles.Card}>
      <div class={`${styles.Card__Content} ${props.active && styles.Active}`}>
        <Show when={props.content}>
          <img src={props.content?.image} />
        </Show>
        <Show when={!props.content}>
          <img src={image} />
        </Show>
      </div>
      <div class={styles.Card__Title}>{`Card ${props.index}`}</div>
    </div>
  );
};

export default Card;
