import Layout from "./layouts/Layout"
import { Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>
        <p>HomePage</p>
      </Layout>} />
    </Routes>
  )
}

export default App