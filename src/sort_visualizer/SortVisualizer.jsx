import React, { useEffect, useState } from "react";
import getMergeSortAnimations from "../sorting_alog/MergeSort"
import getQuickSortAnimations from "../sorting_alog/QuickSort"
import './SortVisualizer.css';
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
const PIVOT_COLOR ='green';

const SortVisualizer = () => {
  const [array, setArray] = useState([]);
  function mergeSort() {
    const animations = getMergeSortAnimations(array);
    // console.log(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  function quickSort() {
    const animations = getQuickSortAnimations(array);
    console.log("Quick Sort");
    console.log(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx,pivotIndex,barTwoIdx] = animations[i];
        // console.log(pivotIndex+" "+barOneIdx+" "+barTwoIdx);
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const pivotStyle =  arrayBars[pivotIndex].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          pivotStyle.backgroundColor = PIVOT_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx,barTwoIdx,newHeight1,newHeight2] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          // const pivotStyle = arrayBars[pivotIdx].style;
          barOneStyle.height = `${newHeight2}px`;
          barTwoStyle.height = `${newHeight1}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  function heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  const bubbleSort = () => {

    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  function testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }
  const resetArray = () => {
    const arr1 = []
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      arr1.push(randomIntFromInterval(20, 700));
    }
    // console.log("This is RestArray");
    console.log(arr1);
    setArray(arr1);
  }
  useEffect(() => {
    // console.log("This is UseEffect");
    resetArray();
  }, []);

  return (
    <>
      <div className="array-container">
        {
          array.map((val, id) => {
            return (
              <>
                <div className="array-bar" key={id} style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${val}px`,
                }}>
                </div>
              </>
            )
          })
        }
        <p></p>
        <button onClick={() => resetArray()}>Generate New Array</button>
        <button onClick={() => mergeSort()}>Merge Sort</button>
        <button onClick={() => quickSort()}>Quick Sort</button>
        <button onClick={() => heapSort()}>Heap Sort</button>
        <button onClick={() => bubbleSort()}>Bubble Sort</button>
        <button onClick={() => testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
      </div>
    </>
  );
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
export default SortVisualizer;