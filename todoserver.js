const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


// middlewares
app.use(bodyParser.json());


let todos = [];

function findIndex(arr,id){
    for(let i =0;i<arr.length;i++){
        if(arr[i].id === id) return i;
    }
    return -1;
}
function removeAtIndex(arr,index){
    let newArray = [];
    for(let i =0;i<arr.length;i++){
        if(i !== index) newArray.push(arr[i]);
    }
    return newArray;
}

app.get('/todos',(req,res)=>{
    res.send(todos);
})

app.get('/todos/:id',(req,res)=>{
    const todoIndex = findIndex(todos,parseInt(req.params.id));
    if(todoIndex === -1){
        res.status(404).send();
    }else{
        res.send(todos[todoIndex]);
    }
})
app.post('/todos',(req,res)=>{
    const newTodo ={
        id : Math.floor(Math.random()*10000000),
        title : req.body.title,
        description : req.body.description
    };
    todos.push(newTodo);
    res.status(201).send(newTodo);

})
app.put('/todos/:id',(req,res)=>{
    const todoIndex = findIndex(todos,parseInt(req.params.id));
    if(todoIndex === -1){
        res.status(404).send();
    }else{
        todos[todoIndex].title = req.body.title;
        todos[todoIndex].description = req.body.description;
        res.send(todos[todoIndex]);
    }
})
app.delete('/todos/:id',(req,res)=>{
    const todoIndex = findIndex(todos,parseInt(req.params.id));
    if(todoIndex === -1){
        res.status(404).send();
    }else{
        todos = removeAtIndex(todos,todoIndex);
        res.status(200).send();
    }
});

app.use((req,res,next)=>{
    res.status(404).send();
});

app.listen(port,()=>{
    console.log(`server listening at ${port}`)
})
