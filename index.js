const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;


let eventos = [];
let countIndex = 1;


app.post('/CriarEvento',(req,res)=>{

    const {nome,data,local} =req.body;

    const novoEvento = {id: countIndex ++ , nome,data,local};

    eventos.push(novoEvento);

    res.status(201).json(novoEvento);
})

app.get('/MostrarEventos',(req,res)=>{

    res.json(eventos);
})

app.put('/AtualizarEvento/:id',(req,res)=>{
    const idEvento = parseInt(req.params.id);
    const {nome,data,local} = req.body;

    const evento = eventos.find(e=>e.id === idEvento);

    if(evento){
    if(nome != null && nome != evento.nome){
        evento.nome = nome;
    }  

    if(data != null && data != evento.data){
        evento.data = data;
    }

    if(local != null && local != evento.local){
        evento.local = local;
    } 
    res.json(evento);    
    }else{
        res.status(404).json({message:"evento não encontrado"});
    }
})

app.delete('/DeletarEvento/:id',(req,res)=>{
    const idEvento = parseInt(req.params.id);

    const evento = eventos.find(e=>e.id === idEvento);

    if(evento){
        const index = eventos.indexOf(evento);
        eventos.splice(index,1);
        
        res.json({message:"Evento removido com sucesso",evento})
    }else{
        res.status(404).json({message:"Evento não encontrado"})
    }
})


app.listen(port,()=>{
    console.log("Servidor rodando na porta:" + port);
    
})