import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import IntroPage from "./assets/pages/IntroPage/Intro"
import BuildPage from "./assets/pages/BuildPage/Build"
import { useState, useEffect } from "react"
function App() {
  const [superForm, setSuperForm] = useState([])

  function setSuperFormAt(formInfo, index) {
    const temp = superForm;
    temp[index] = formInfo;

    setSuperForm([...temp])
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={<IntroPage
              setSuperFormAt={setSuperFormAt}
              superForm={superForm} />} />
          <Route path="buildPage" element={<BuildPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
