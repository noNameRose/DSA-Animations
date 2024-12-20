import LinkedList from "./LinkedList.jsx";
import Sll from "./inforCode/LinkedList.jsx";
import { useState, useRef, useEffect } from "react";
import { RandomKey } from "./inforCode/RandomKey.js";
import Menu from "../Control/Menu.jsx";
import { infor } from "../../DSA-infor/dsaInfor.js";
import { useOrientation } from "react-use";

let randomKeys = new RandomKey(20);
const initialList = new Sll();

for (let i = 0; i  < 5; i++)
    initialList.insert(getRandomNumber(), 0);

export default function LinkedListApp() {
  const [list, setList] = useState(initialList);
  const [operation, setOperation] = useState({});
  const isDel = useRef(true);
  const keys = useRef(randomKeys);
  const backGroundChnage = true;
  const {type} = useOrientation();

  useEffect(() => {
    document.body.style.backgroundColor = "#032536";
    return () => {
      document.body.style.backgroundColor = "";
    }
  }, [backGroundChnage]);

  function handleCleanUpTravel() {
    setOperation({type: "clean"});
  }

  /**
   * This function handle the case when user click start button 
   * 
   * @param {*} operations 
   * @param {*} action 
   * @returns 
   */
  function handleStart(operations, action) {
    // The index where the action happen.
    // It could be remove at or insert at i
    let i = action.index
    // If this is insertion
    if (operations === "insert(i)") {
      // 
      let newOprations = {
        ...operation,
        type: "insert",
        index: i,
      };
      let newList = list.clone();
      newList.insert(action.value, i);
      keys.current.add(i);
      setList(newList);
      setOperation(newOprations);
    }
    else if (operations == "remove(i)") {
      let newList = list.clone();
      try {
        newList.remove(action.index);
      }
      catch (error) {
        return;
      }
      let newOperations = {
        ...operation,
        type: "remove",
        index: action.index,
        onDelete: () => {
          keys.current.remove(action.index);
          setList(newList);
          setOperation({type: "normal"});
          isDel.current = true;
        }
      };
      setOperation(newOperations);
    }
    else if (operations == "search") {
      let newList = list.clone();
      let i = newList.search(action.value);
      let newOperations = {
        type: "search",
        index: i,
      };
      setOperation(newOperations);
    }
  }
  return (
    <div className="
                    lg:text-lgFont
                    md:text-mdFont
                  ">
      {(type === "landscape-primary") || (type === "landscape-secondary") ? 
                  (<>
                      <LinkedList initialList={list} 
                                  operation={operation} 
                                  onClean={handleCleanUpTravel}
                                  controlDel={isDel}
                                  keys={keys.current}
                                  />
                      <Menu onStart = {handleStart}
                            isAnimating={false}
                            color={infor.LinkedList.menu.color}
                            methods={infor.LinkedList.menu.method}
                            // plainTextColor="white"
                            // methodButColor="#477186"
                            // methodTextColor="white"
                            // startButColor="#477186"
                            // startButText="white"
                      />
                    </>) : (<div>You are in portrait mode</div>)
                    }
    </div>
  );
}

function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 100);
  return randomNumber;
}



