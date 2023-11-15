const frameCount = function _fc(timeStart: number) {
  const now = performance.now();
  const duration = now - timeStart;

  if (duration < 1000) {
    _fc.counter++;
  } else {
    _fc.fps = _fc.counter;
    _fc.counter = 0;
    timeStart = now;
    console.log(_fc.fps);
  }
  requestAnimationFrame(() => frameCount(timeStart));
};

frameCount.counter = 0;
frameCount.fps = 0;

export const runFrameCount = () => frameCount(performance.now());
