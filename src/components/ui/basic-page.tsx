import { Outlet } from "react-router-dom"
import Header from "../header"

export const BasicPage = () => {
    return (
        <>
      <Header />
      <Outlet />
    </>
    )
}