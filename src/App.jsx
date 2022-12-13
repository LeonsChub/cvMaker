import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import IntroPage from "./assets/pages/IntroPage/Intro"
import BuildPage from "./assets/pages/BuildPage/Build"
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="buildPage" element={<BuildPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
