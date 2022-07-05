import Express from "express";

const router_var = Express.Router();

router_var.get('/', (req, res) => {                  //      localhost:3000/ => redirects here 
    res.send("working bro");
})

router_var.get('/', );
export default router_var;