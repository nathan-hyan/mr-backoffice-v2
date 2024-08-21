import { useState } from 'react';

/* eslint-disable @typescript-eslint/no-use-before-define */

function usePercentage() {
  // timeToResolve will constantly be changed
  // in the functions to get a new random value
  // and make the progress be more convincing

  let timeToResolve = Math.ceil(Math.random() * 1000);

  const [currentPercentage, setCurrentPercentage] = useState(0);

  // We use timeouts for the updating of
  // the percentage value
  let doTimeout: NodeJS.Timeout;

  // Global clearCurrentTimeout for
  // it to be called when a new file is uploading.

  const clearCurrentTimeout = () => {
    clearTimeout(doTimeout);
  };

  const getPercentage = (contentLength: number, currentIndex: number) => {
    const percentageDivider = Math.floor(100 / contentLength);
    const currentValue = percentageDivider * (currentIndex + 1);
    const nextValue = percentageDivider * (currentIndex + 2);

    // Lets start with the counter on absolute 0

    if (currentIndex === 0) {
      checkPercentage(0, nextValue);
      return;
    }

    // Sometimes the calculations makes the percentage
    // go more than 100%, So this is a safety net

    if (contentLength <= currentIndex + 1) {
      setCurrentPercentage(100);
      return;
    }

    checkPercentage(currentValue, nextValue);
  };

  const checkPercentage = (initialValue: number, nextValue: number) => {
    let percentageValue = initialValue;

    // Assign this timeout to the "global" variable
    // so it can be cleaned up later when needed

    doTimeout = setTimeout(() => {
      if (initialValue < nextValue) {
        // If initialValue (let's say 20%) is
        // less than the nextValue (in this example, 50%)
        // continue increasing the number until
        // condition is false

        updatePercentage(percentageValue, nextValue);
      } else {
        // In that case, just wait with
        // the nextValue until the function
        // gets called with a newValue
        percentageValue = nextValue;
      }
    }, timeToResolve);

    // Update state so the app re-renders

    setCurrentPercentage(percentageValue);
    return percentageValue;
  };

  const updatePercentage = (currentValue: number, nextValue: number) => {
    // Set a new random value so the loading
    // seems more convincing

    timeToResolve = Math.ceil(Math.random() * 1000);

    // Lets add a random small value to the
    // current percentage to fake progress
    // this, of course, can cause the value to
    // go up 100%, so lets hardcode a limit there

    const updatedValue = currentValue + Math.ceil(Math.random() * 3);

    if (updatedValue >= 100) {
      checkPercentage(100, nextValue);
      return;
    }
    if (updatedValue >= nextValue) {
      return;
    }

    // If none of the previous conditions are
    // true, repeat the process!
    checkPercentage(updatedValue, nextValue);
  };

  return { getPercentage, clearCurrentTimeout, currentPercentage };
}

export default usePercentage;
