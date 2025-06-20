import { useCallback } from "react";

const MyComponent = ({count, secondCount}: {count: number, secondCount: number}) => {

  const myFunction = useCallback(() => {
    console.log(count);
  }, []);

  return (
    <>
      My Component count {count}
      <button onClick={myFunction}>
        execute
      </button>
    </>
  )
}

export default MyComponent