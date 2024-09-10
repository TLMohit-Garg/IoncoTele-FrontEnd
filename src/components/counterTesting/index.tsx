import React from 'react'
import type { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/counterSlice/index'

function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()
  return (
    <>
    <div>Counter</div>
    <div>
    <button
      aria-label="Increment value"
      onClick={() => dispatch(increment())}
    >
      Increment
    </button>
    <span>{count}</span>
    <button
      aria-label="Decrement value"
      onClick={() => dispatch(decrement())}
    >
      Decrement
    </button>
  </div>
  </>

  )
}

export default Counter