import {
  JSXElement,
  Show,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";
import styles from "./styles.module.scss";

interface ScrollWrapperProps {
  title: string;
  children: JSXElement;
  direction: "row" | "column";
  duration: number;
  onSlideChange: (index: number) => void;
}

const ScrollWrapper = (props: ScrollWrapperProps) => {
  let active = true;
  let scrollingRef: HTMLDivElement;
  let intervalRef: ReturnType<typeof setInterval> | null = null;

  const [currentSlide, setCurrentSlide] = createSignal(1);
  const [ended, setEnded] = createSignal(false);
  const [started, setStarted] = createSignal(true);
  const [transform, setTransform] = createSignal("");

  const stopTrack = () => {
    if (intervalRef) {
      clearInterval(intervalRef);
      intervalRef = null;
    }
  };
  setInterval(() => {
    if (!scrollingRef) return;

    if (started()) {
      setCurrentSlide((slide) => slide + 1);

      if (currentSlide() === scrollingRef.children.length) {
        setEnded(true);
        setStarted(false);
      }
    }

    if (ended()) {
      setCurrentSlide((slide) => slide - 1);

      if (currentSlide() <= 0) {
        setEnded(false);
        setStarted(true);
      }
    }

    const slide = scrollingRef.children[currentSlide()] as HTMLDivElement;

    if (props.direction === "row" && slide) {
      setTransform(`translateX(-${currentSlide() * slide.offsetWidth + 40}px)`);
    } else if (props.direction === "column" && slide) {
      // setTransform(`translateY(-${currentSlide() * slide.offsetHeight}px)`);
    }

    props.onSlideChange(currentSlide());
  }, 500);

  const startTrack = (timeout: number) => {
    if (intervalRef) return;
    intervalRef = setInterval(() => {
      if (!scrollingRef) return;

      if (started()) {
        setCurrentSlide((slide) => slide + 1);

        if (currentSlide() === scrollingRef.children.length) {
          setEnded(true);
          setStarted(false);
        }
      }

      if (ended()) {
        setCurrentSlide((slide) => slide - 1);

        if (currentSlide() <= 0) {
          setEnded(false);
          setStarted(true);
        }
      }

      const slide = scrollingRef.children[currentSlide()] as HTMLDivElement;
      console.log(slide);

      if (props.direction === "row") {
        setTransform(
          `translateX(-${currentSlide() * slide.offsetWidth + 40}px)`
        );
      } else if (props.direction === "column") {
        setTransform(`translateY(-${currentSlide() * slide.offsetHeight}px)`);
      }

      props.onSlideChange(currentSlide());
    }, timeout);
  };

  createEffect(() => {
    // const slide = scrollingRef?.children[currentSlide()] as HTMLDivElement;
    // console.log(slide?.offsetWidth);
    // setTransform(`translateX(-${currentSlide() * slide.offsetWidth + 40}px)`);
  });

  onMount(() => {
    // if (active) {
    // startTrack(props.duration);
    // } else {
    // stopTrack();
    // }
  });
  return (
    <div class={styles.ScrollWrapper}>
      <Show when={!!props.title}>
        <h3 class={styles.Title}>{props.title}</h3>
      </Show>
      <div
        ref={(ref) => {
          scrollingRef = ref;
        }}
        style={{
          display: "flex",
          transform: transform(),
          ["flex-direction"]: props.direction,
        }}
        class={styles.ScrollContainer}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ScrollWrapper;
