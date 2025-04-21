import Home from "./Component/Main/Home/Home"
import Products from "./Component/Main/Products/Products"
import Comments from "./Component/Main/Comments/Comments" 
import Users from "./Component/Main/Users/Users"
import Orders from "./Component/Main/Orders/Orders"
import Sales from "./Component/Main/Sales/Sales"

let routes = [
    {path:"/" , element:<Home/>},
    {path:"/cms-react" , element:<Home/>},
    {path:"/Home" , element:<Home/>},
    {path:"/Products" , element:<Products/>},
    {path:"/Comments" , element:<Comments/>},
    {path:"/Users" , element:<Users/>},
    {path:"/Orders" , element:<Orders/>},
    {path:"/Sales" , element:<Sales/>},
]

    

export default routes