import Navigation from "./Components/Navigation.jsx"
import MainPage from "./Components/MainPage.jsx"
import DataStructureSection from "./Components/DataStructureSection.jsx"
import { Route, Routes } from "react-router-dom"
import LinkedListApp from "./Data Structure/LinkedList/LinkedListApp.jsx"
import StackApp from "./Data Structure/Stack/StackApp.jsx"
import BinarySearchTreeApp from "./Data Structure/BinarySearchTree/BinarySearchTreeApp.jsx"

export default function App() {
  return (
          <>
            <Routes>
              <Route path="/" element={<>
                                        <Navigation/>
                                        <MainPage/>
                                        
                                        <DataStructureSection/> 
                                       </>}
              />
              <Route path="/LinkedList" element={<LinkedListApp/>}/>
              <Route path="/Stack" element={<StackApp/>}/>
              <Route path="/BinarySearchTree" element={<BinarySearchTreeApp/>}/>
            </Routes>
          </>
        );
}
