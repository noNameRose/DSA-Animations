import { useState, useRef} from "react"
import { useOrientation } from "react-use";
import { color } from "./inforCode/color.js";
import { infor } from "../../DSA-infor/dsaInfor.js";
import { RandomKey } from "../LinkedList/inforCode/RandomKey.js";
import { getRandomNumber } from "./Logic/setUpList.jsx";

import Menu from "../Control/Menu.jsx";
import DoublyLinkedList from "./inforCode/DoublyLinkedList.jsx"
import DoublyLinkedListComp from "./DoublyLinkedListComp.jsx";


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
        if (operationName === "insert") {
            const i = action.index;
            newList.insert(action.value, action.index);
            keys.current.add(i);
            const newOperation = {
                list: newList,
                name: operationName,
                index: i,
            };
            setOperation(newOperation);
        }
    }

    return (
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
            {
                ((type === "landscape-primary") || type === "landscape-secondary") ?
                        (<>
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
                        </>) 
                    :   (<div>You are in portrail mode</div>)
            }
        </div>
    )
}
