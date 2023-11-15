import {Show, JSXElement,Accessor, children,createSignal,createEffect, onCleanup} from "solid-js";
import './styles.scss'

interface CarouselProps {
  title?: string
  active?: Accessor<boolean>
  duration?: number
  direction?: 'row' | 'column'
  children: JSXElement
  onSlideChange: (currentSlide: number) => void
}

const Carousel = ({title = '', active, direction = 'row', duration = 500, children:renderChild, onSlideChange}: CarouselProps) => {
  const child = children(() => renderChild)

  // console.log(title, active)
  let innerEl: HTMLDivElement | null = null

  const [currentSlide, setCurrentSlide] = createSignal(0)
  const [ended, setEnded] = createSignal(false)
  const [started, setStarted] = createSignal(true)
  const [transform, setTransform] = createSignal('')

  const [intervalRef, setIntervalRef] = createSignal<ReturnType<typeof setInterval >| null>(null)

  const stopTrack = () => {
    if (intervalRef()) {
      clearInterval(intervalRef()!);
      setIntervalRef(null)
    }
  };

  const startTrack = (timeout: number) => {
    if (intervalRef()) return;
    const intervalId = setInterval(() => {
      if (!innerEl) return;

      if (started()) {
        setCurrentSlide(slide => slide +1)

        if (currentSlide() === innerEl.children.length) {
          setEnded(true)
          setStarted(false)
        }
      }

      if (ended()) {
        setCurrentSlide(slide => slide-1)

        if (currentSlide() <= 0) {
          setEnded(false)
          setStarted(true)
        }
      }

      const slide = innerEl.children[currentSlide()] as HTMLDivElement;

      if (direction === 'row') {
        setTransform(`translateX(-${(currentSlide()) * (slide.offsetWidth + 20)}px)`)
      } else if (direction === 'column') {
        setTransform(`translateY(-${(currentSlide()) * slide.offsetHeight}px)`)
      }

      // dispatch('change-slide', { currentSlide });
      onSlideChange(currentSlide())
    }, timeout);

    setIntervalRef(intervalId)
  };

  createEffect(() => {
    if (active?.()) {
      startTrack(duration)
    } else {
      stopTrack()
    }
  })

  onCleanup(() => {
    stopTrack()
  })
  return (
    <div class={`carousel ${direction === 'row' ? 'row' : ''}`}>
      <Show when={!!title}>
        <h3 class='carousel__title'>{title}</h3>
      </Show>
      <div ref={(el) => innerEl = el} class={'carousel__inner'} style={{transform: transform(), ['flex-direction']: direction}}>
        {child()}
      </div>
    </div>
  );
};

export default Carousel;