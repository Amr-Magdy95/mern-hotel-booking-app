import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import { Navigate, Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>
        <p>HomePage</p>
      </Layout>} />

      <Route path="/register" element={
        <Layout>
          <Register />
        </Layout>
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App