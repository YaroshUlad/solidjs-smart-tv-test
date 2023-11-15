import './styles.scss'
import {Content} from "../../types";
import {Show, Accessor} from "solid-js";

interface ContentInfo {
  content:Accessor< Content> | null
}

const ContentInfo = ({content}: ContentInfo) => {
  return (
    <>
      <Show when={!!content}>
        <div class={'content-info'}>
          <h3 class='content-info__title'>{content?.().title}</h3>
          <h3 class='content-info__description'>{content?.().description}</h3>
        </div>
      </Show>
    </>
  );
};

export default ContentInfo;