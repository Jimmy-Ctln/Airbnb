import { Outlet } from "react-router"
import { Header } from "./Header"

export const Layout = () => {
  return (
    <div className="p-4 flex flex-col min-h-screen">
        <Header/>
        <Outlet/>
    </div>
  )
}
