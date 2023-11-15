import './styles.scss'
import {Match, children,JSXElement} from "solid-js";

interface CarouselSlideProps {
  index: number
  children: JSXElement
}

const CarouselSlide = ({index = -1, children: renderChild}: CarouselSlideProps) => {
  const child = children(() => renderChild)
  return (
    <div class={'carousel__item'}>
      <Match when={index == -1}>
        <span>{index + 1}</span>
      </Match>
      {child()}
    </div>
  );
};

export default CarouselSlide;