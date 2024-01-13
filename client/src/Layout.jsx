import { Outlet } from "react-router"
import { Header } from "./Header"

export const Layout = () => {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
        <Header/>
        <Outlet/>
    </div>
  )
}
