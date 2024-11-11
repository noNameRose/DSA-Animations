import { useEffect, useState } from "react"
import StackComponent from "./StackComponent.jsx";
import Menu from "./Control/Menu.jsx"
import { useOrientation } from "react-use";
import { Stack } from "./InforCode/Stack.jsx";

const st = new Stack(15);
const trashStack = new Stack(15);
st.push("a");
st.push("b");
st.push("c");
st.push("d");
st.push("e");


export default function StackApp() {
    const [operation, setOperation] = useState({stk: st,
                                                trashStk: trashStack,
                                                name: "normal",
                                                });
    const {type} = useOrientation();

    function handlePop() {
        let newStack = operation.stk.clone();
        newStack.pop();
        setOperation({...operation,
                    stk: newStack,
                    name: "normal",
        });
    }

    function handlePush() {
        let newStack = operation.stk.clone();
        setOperation({...operation,
                        stk: newStack,
                        name: "normal",
        })
    }

    function handleStart(operationName, action) {
        let newStack = operation.stk.clone();
        let newTraskStk = operation.trashStk.clone();
        if (operationName === "push") {
            newStack.push(action.value);
            let newOperation = {
                stk: newStack,
                trashStk: newTraskStk,
                name: operationName,
            };
            setOperation(newOperation);
        }
        else if (operationName === "pop") {
            let top = newStack.peek();
            newTraskStk.push(top.data);
            let newOperation = {
                stk: newStack,
                trashStk: newTraskStk,
                name: operationName,
            };
            setOperation(newOperation);
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = "#774936";
        return () => {
            document.body.style.backgroundColor = "";
        }
    });
    return (
        <>
            {(type === 'landscape-primary') || (type === "landscap-secondary") ? (<>
                                                <StackComponent 
                                                                operation={operation} 
                                                                onPop={handlePop}
                                                                onPush={handlePush}
                                                                />
                                                <Menu onStart={handleStart} isAnimating={operation.name !== "normal"}/>
                                            </>
                                            ) : (<div>You are in portrait mode</div>)
                                            }
        </>
    )
}
