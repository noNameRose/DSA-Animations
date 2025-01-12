import Menu from "../Control/Menu"
import { useOrientation } from "react-use"
import BinarySearchTreeComp from "./BinarySearchTreeComp.jsx"
import BinarySearchTree from "./inofrCode/BinarySearchTree.jsx"
import { useState, useEffect } from "react"
import { infor } from "../../DSA-infor/dsaInfor.js";

const bst = new BinarySearchTree();
bst.insert(70);
bst.insert(50);
// bst.insert(90);
// bst.insert(40);
// bst.insert(60);
// bst.insert(80);
bst.insert(95);
// bst.insert(20);
// bst.insert(45);
// bst.insert(55);
bst.insert(65);
// bst.insert(75);
// bst.insert(85);
// bst.insert(93);
// bst.insert(97);
// bst.insert(10);
// bst.insert(25);
// bst.insert(43);
bst.insert(47);
// bst.insert(51);
bst.insert(57);
// bst.insert(62);
// bst.insert(68);
// bst.insert(73);
// bst.insert(78);
// bst.insert(82);
// bst.insert(88);
// bst.insert(92);
bst.insert(94);
// bst.insert(96);
bst.insert(98);




export default function BinarySearchTreeApp() {
  const {type} = useOrientation();
  const [operation, setOperation] = useState({
                                              tree: bst,
                                                name: "normal",
                                            });
  const backGroundChnage = true;                                          

  useEffect(() => {
    document.body.style.backgroundColor = "#35635b";
    return () => {
      document.body.style.backgroundColor = "";
    }
  }, [backGroundChnage]);

  function handleAnimation() {
      let newTree = operation.tree.clone();
      setOperation(
                    {  tree: newTree
                      ,name: "normal"
                    });
  }
  
  function handleStart(operationName, action) {
    let newTree = operation.tree.clone();
    if (operationName === "insert") {
      const {visiteds, isLeft} = newTree.insert(action.value);
      let newOperation = {
        tree: newTree,
        name: operationName,
        newValue: action.value,
        visitedNodes: visiteds,
        isLeftChild: isLeft,
      }
      setOperation(newOperation);
    }
    else if (operationName === "search") {
      setOperation(
        {
          tree: newTree, 
          name: operationName,
          searchTarget: action.value
      });
    }
    else if (  operationName === "inorder" 
            || operationName === "postorder"
            || operationName === "preorder"
          ) {
        setOperation(
          {
            tree: newTree, 
            name: operationName,
        });
    }
  }


  return (
    <div className="w-screen 
                    h-screen
                    bg-[#35635b]
                    relative
                    lg:text-[0.6rem]
                    md:text-[0.35rem]
                    sm:text-[0.2rem]
                    "
    >
      {(   (type === "landscape-primary") 
        || (type === "landscape-secondary")) ? 
              (<>
                <BinarySearchTreeComp 
                 operation={operation}
                 onAnimate={handleAnimation}
                />
                <Menu
                    onStart={handleStart}
                    isAnimating={operation.name !== "normal"}
                    color={infor.BinarySearchTree.menu.color}
                    methods={infor.BinarySearchTree.menu.method}
                />
              </>) : (<div>You are in portrait mode</div>)
      }
      
    </div>
  )
}
