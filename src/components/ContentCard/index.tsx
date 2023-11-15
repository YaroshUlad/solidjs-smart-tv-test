import './styles.scss'
import {Content} from "../../types";
import {Show, Accessor} from "solid-js";

interface ContentProps {
  active: Accessor<boolean>
  content: Content | null
}

function ContentCard({active, content}: ContentProps) {
  return (
    <div class={`content-card ${active() ? 'active' : ''}`}>
      <Show when={!!content}>
        <img src={content?.image} alt={content?.title}/>
      </Show>
    </div>
  );
};

export default ContentCard;