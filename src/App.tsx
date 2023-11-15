import { createSignal, createEffect,  onMount, For } from 'solid-js';
// import { createStore } from 'solid-js/store'
import './App.scss'
import ContentInfo from "./components/ContentInfo";
import {generateContents} from "./helpers";
import {runFrameCount} from "./helpers/fps.helper.ts";
import Carousel from "./components/Carousel";
import CarouselSlide from "./components/CarouselSlide";
import ContentCard from "./components/ContentCard";

function App() {
  const [currentRowSlide, setCurrentRowSlide] = createSignal(0)
  const [currentColumnSlide, setCurrentColumnSlide] = createSignal(0)
  const [rows] = createSignal(generateContents())

  const content = () => {
   return rows()[currentRowSlide()].contents[currentColumnSlide()]
  }

  // const fofor = () => {
  //   return {
  //     rows: rows(),
  //     currentRowSlide: currentRowSlide(),
  //     currentColumnSlide: currentColumnSlide()
  //   }
  // }

  onMount(() => {
    runFrameCount()
  })
  const handleChangeRowSlide = (slideIndex: number) => {
    // console.log('handleChangeRowSlide', slideIndex)
    setCurrentRowSlide(slideIndex)
  };

  const handleChangeColumnSlide = (slideIndex: number) => {
    // console.log(slideIndex)
    setCurrentColumnSlide(slideIndex)
  };

  createEffect(() => {
    // console.log(currentRowSlide() + ' ___ ' + currentColumnSlide())
  })

  return (
    <div class='wrapper' style={{'background-image': `url(${content().image})`}}>
      <div class='wrapper__top'>
        <ContentInfo content={content}/>
      </div>

      <div class='wrapper__bottom'>
        <Carousel  onSlideChange={handleChangeRowSlide}
                   direction={'column'}
                   duration={7000}
                   active={() => true}
        >
          <For each={rows()} >
            {(row, rowIndex) => {

              const [active, setActive] = createSignal(rowIndex() === currentRowSlide())

              createEffect(() => {
                // console.log(rowIndex() + ' +++ ' + currentRowSlide())
                setActive(rowIndex() === currentRowSlide())
              })
              return <CarouselSlide index={rowIndex()}>
                <Carousel
                  title={`Title ${rowIndex()}`}
                  duration={row.duration}
                  active={active}
                  direction='row'
                  onSlideChange={handleChangeColumnSlide}
                  // on:change-slide={handleChangeColumnSlide}
                >
                  <For each={row.contents}>
                    {(rowContent, columnIndex) => {
                      const [active, setActive] = createSignal(rowIndex() === currentRowSlide() && columnIndex() === currentRowSlide())

                      createEffect(() => {
                        // console.log(rowIndex() + ' +++ ' + currentRowSlide())
                        setActive(rowIndex() === currentRowSlide() && columnIndex() === currentRowSlide())
                      })
                      return <CarouselSlide index={columnIndex()}>
                        <ContentCard
                          content={rowContent}
                          active={active}
                        />
                      </CarouselSlide>
                    }}
                  </For>
                </Carousel>
              </CarouselSlide>
            }}
          </For>
        </Carousel>
      </div>
    </div>
  )
}

export default App
