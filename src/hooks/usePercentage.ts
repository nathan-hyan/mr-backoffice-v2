import { useState } from 'react';

/* eslint-disable @typescript-eslint/no-use-before-define */

function usePercentage() {
    let timeToResolve = Math.ceil(Math.random() * 1000);
    let doTimeout: NodeJS.Timeout;
    const [currentPercentage, setCurrentPercentage] = useState(0);

    const clearCurrentTimeout = () => {
        clearTimeout(doTimeout);
    };

    const getPercentage = (contentLength: number, currentIndex: number) => {
        const percentageDivider = Math.floor(100 / contentLength);
        const currentValue = percentageDivider * (currentIndex + 1);
        const nextValue = percentageDivider * (currentIndex + 2);

        if (currentIndex === 0) {
            checkPercentage(0, nextValue);
            return;
        }

        if (contentLength <= currentIndex + 1) {
            setCurrentPercentage(100);
            return;
        }

        checkPercentage(currentValue, nextValue);
    };

    const checkPercentage = (initialValue: number, nextValue: number) => {
        let percentageValue = initialValue;

        doTimeout = setTimeout(() => {
            if (initialValue < nextValue) {
                updatePercentage(percentageValue, nextValue);
            } else {
                percentageValue = nextValue;
            }
        }, timeToResolve);

        setCurrentPercentage(percentageValue);
        return percentageValue;
    };

    const updatePercentage = (currentValue: number, nextValue: number) => {
        timeToResolve = Math.ceil(Math.random() * 1000);
        const updatedValue = currentValue + Math.ceil(Math.random() * 3);

        if (updatedValue >= 100) {
            checkPercentage(100, nextValue);
            return;
        }
        if (updatedValue >= nextValue) {
            return;
        }

        console.log(`${currentValue}% in ${timeToResolve}ms`);
        checkPercentage(updatedValue, nextValue);
    };

    return { getPercentage, clearCurrentTimeout, currentPercentage };
}

export default usePercentage;
