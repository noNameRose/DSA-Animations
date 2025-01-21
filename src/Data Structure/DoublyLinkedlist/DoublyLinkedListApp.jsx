import { useState, useRef, useEffect} from "react"
import { useOrientation } from "react-use";
import { color } from "./inforCode/color.js";
import { infor } from "../../DSA-infor/dsaInfor.js";
import { RandomKey } from "../LinkedList/inforCode/RandomKey.js";
import { getRandomNumber } from "./Logic/setUpList.jsx";

import Menu from "../Control/Menu.jsx";
import DoublyLinkedList from "./inforCode/DoublyLinkedList.jsx"
import DoublyLinkedListComp from "./DoublyLinkedListComp.jsx";
import TooSmall from "../ScreenSizeToSmall/TooSmall.jsx";


const randomKeys = new RandomKey(20);
const lst = new DoublyLinkedList;

for (let i = 0; i < 5; i++)
    lst.insert(getRandomNumber(), 0);


export default function DoublyLinkedListApp() {
    const {type} = useOrientation();
    const keys = useRef(randomKeys);
    const [operation, setOperation] = useState({
                                                    list:lst,
                                                    name: "normal"
                                                });

    const backGroundChnage = true;                                          

    useEffect(() => {
        document.body.style.backgroundColor = "#304852";
        return () => {
        document.body.style.backgroundColor = "";
        }
    }, [backGroundChnage])

    function handleEndAnimation() {
        let newList = operation.list.clone();
        setOperation(
            {
                list: newList,
                name: "normal"
            }
        );
    }


    function handleStart(operationName, action) {
        const newList = operation.list.clone();
        let newOperation;
        if (operationName === "insert") {
            const i = action.index;
            newList.insert(action.value, action.index);
            keys.current.add(i);
            newOperation = {
                list: newList,
                name: operationName,
                index: i,
            };
        }
        if (operationName === "remove") {
            const i = action.index;
            if (i < 0 || i >= newList.size)
                return;
            newOperation = {
                list: newList,
                name: operationName,
                index: i,
                onRemove: () => {
                    const listAfterRemove = newList.clone();
                    listAfterRemove.remove(i);
                    setOperation( {
                        list: listAfterRemove,
                        name: "normal",
                    })
                }
            }
        }
        if(operationName === "search") {
            const key = action.value;
            const i = newList.search(key);
            newOperation = {
                list: newList,
                name: operationName,
                foundIndex: i,
                onSearch: () => {
                    const cloneList = newList.clone();
                    setOperation({
                        list: cloneList,
                        name: "normal",
                    })
                },
            };   
        }
        setOperation(newOperation);
    }

    return (
        <>
        <TooSmall color={"#304852"} textColor={"white"}/>
        <div className="w-screen
                        h-screen
                        relative
                        lg:text-[0.6rem]
                        md:text-[0.4rem]
                        sm:text-[0.3rem]
                        "
             style={
                {
                    backgroundColor: color["main-background"]
                }
             }
        >
                            <DoublyLinkedListComp
                                operation={operation}
                                cleanAnime={handleEndAnimation}
                                keys={keys.current.keys}
                            />
                            <Menu
                                onStart={handleStart}
                                isAnimating={operation.name !== "normal"}
                                color={infor.DoublyLinkedList.menu.color}
                                methods={infor.DoublyLinkedList.menu.method}
                            />
        </div>
        </>
    )
}
