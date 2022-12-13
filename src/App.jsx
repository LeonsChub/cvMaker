import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import IntroPage from "./assets/pages/IntroPage/Intro"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
