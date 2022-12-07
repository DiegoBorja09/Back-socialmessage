const express = require("express")
require("dotenv").config()
const cors = require("cors")



port= process.env.PORT || 4000



// Routes:
const indexRouter = require('./routes/index')


const app = express()


app.use(cors({
    origin:["http://localhost:4200"],
}))
app.use(express.json())

// Usando rutas:
app.use('/', indexRouter)


app.get("/",(req,res)=>{
    return res.json({
        name:"BackEnd v1"
    })
})

app.listen(port,()=>{
    console.log("Listening: http://localhost:"+port)
})
