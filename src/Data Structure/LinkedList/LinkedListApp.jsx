import { color } from "./Style/color";
import { SinglyLinkedList } from "./inforCode/SinglyListList.jsx";
import { useEffect, useRef, useState } from "react";
import {infor} from "../../DSA-infor/dsaInfor.js";
import LinkedList from "./LinkedList.jsx";
import Menu from "../Control/Menu.jsx";
import TooSmall from "../ScreenSizeToSmall/TooSmall.jsx";


const initialList = new SinglyLinkedList();

// initialList.insert(100, 0);
// initialList.insert(20, 0);
// initialList.insert(1, 0);
// initialList.insert(4, 0);

for (let i = 0; i < 6; i++)
  initialList.insert(getRandomNumber(), 0);



export default function LinkedListApp() {
  const [operation, setOperation] = useState({
                                                list: initialList,
                                                name: "normal",
  });


  function handleStart(operationName, action) {
      const newList = operation.list.clone();
      const {value, index} = action;
      let newOperation;
      if (operationName === "insert") {
        const nodes = newList.insert(value, index);
        newOperation = {
                  list: newList,
                  name: "insert",
                  i: index,
                  visitedNodes: nodes,
                  cleanAnime: () => {
                    setOperation({
                            list: newList.clone(),
                            name: "normal",
                    });
                  }
        }
      }
      else if (operationName === "remove") {
          if (operation.list.size === 0)
            return;
          const {found, visitedNodes: nodes} = newList.search(value);
          newOperation = {
            list: newList,
            name: "remove",
            isSuccess: found,
            visitedNodes: nodes,
            cleanAnime: () =>  {
                const listAfterRemove = newList.clone();
                if (found)
                  listAfterRemove.remove(value);
                setOperation({
                    list: listAfterRemove,
                    name: "normal",
                });
            }
          }   
      }
      else if (operationName === "search") {
        const {found, visitedNodes: nodes} = newList.search(value);
        if (operation.list.size === 0)
            return;
        newOperation = {
                list: newList,
                name: "search",
                isSuccess: found,
                visitedNodes: nodes,
                cleanAnime: () => {
                  const cloneList = newList.clone();
                  setOperation({
                    list: cloneList,
                    name: "normal",
                  });
                }
        }
      }
      setOperation(newOperation);
  }

  useEffect(() => {
      document.body.style.backgroundColor = "#032536"

      return () => {
        document.body.style.backgroundColor = "";
      }
  });




  return (
    <>  
          <TooSmall color={"#032536"} textColor={"white"}/>
          <div
              className="w-screen
                        h-screen
                        relative
                        lg:text-[0.6rem]
                        md:text-[0.4rem]
                        sm:text-[0.3rem]
                        "
              style={
                {
                  backgroundColor: color["main-bg"]
                }
              } 
          >
                <LinkedList
                            operation={operation}
                />
                <Menu
                       onStart={handleStart}
                       isAnimating={operation.name !== "normal"}
                       color={infor.LinkedList.menu.color}
                       methods={infor.LinkedList.menu.method}
                />
                
          </div>
          </>
          );
}




function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 100);
  return randomNumber;
}



