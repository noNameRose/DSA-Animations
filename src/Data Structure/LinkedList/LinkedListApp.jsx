import { color } from "./Style/color";
import { SinglyLinkedList } from "./inforCode/SinglyListList.jsx";
import { useEffect, useRef, useState } from "react";
import LinkedList from "./LinkedList.jsx";


const initialList = new SinglyLinkedList();
initialList.insert(3, 0);
initialList.insert(100, 0);
initialList.insert(20, 0);
initialList.insert(1, 0);
initialList.insert(4, 0);

console.log(initialList.toString());

export default function LinkedListApp() {
  const [operation, setOperation] = useState({
                                                list: initialList,
                                                operationName: "normal",
  });




  return (<div
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
          </div>);
}




function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 100);
  return randomNumber;
}



