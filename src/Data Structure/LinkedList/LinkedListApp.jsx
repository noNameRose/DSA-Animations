import LinkedList from "./LinkedList.jsx";
import Sll from "./inforCode/LinkedList.jsx";
import Menu from "./Menu.jsx";
import { useState, useRef, useEffect } from "react";
import { RandomKey } from "./inforCode/RandomKey.js";

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

  useEffect(() => {
    document.body.style.backgroundColor = "#032536";
    return () => {
      document.body.style.backgroundColor = "";
    }
  }, [backGroundChnage]);

  function handleCleanUpTravel() {
    setOperation({type: "clean"});
  }

  function handleStart(operations, action) {
    let i = action.index
    if (operations === "insert(i)") {
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
      <LinkedList initialList={list} 
                  operation={operation} 
                  onClean={handleCleanUpTravel}
                  controlDel={isDel}
                  keys={keys.current}
                  />
      <Menu onStart = {handleStart}/>
    </div>
  );
}

function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 100);
  return randomNumber;
}



