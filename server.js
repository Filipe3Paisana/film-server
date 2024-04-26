/*
import {createServer} from 'node:http'

const server = createServer( (request, response) =>{
    //console.log("oi")
    response.write("Bem vindo!")
    return response.end()
})

server.listen(5555)
*/


//PUT localhost:5555/videos
//POST localhost:5555/videos
//DELETE localhost:5555/videos/2

import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'
const server = fastify()
const database = new DatabaseMemory()

//enviar um video
server.post("/videos", (request, reply) =>{
    const {title, description , duration} = request.body
    database.create(
        {
            title,
            description,
            duration
        }
    )
    console.log(database.list())
    return reply.status(201).send()
})

//buscar videos
server.get("/videos", (request, reply) => {
    const videos = database.list()
    return videos
})

//atualizar um video
server.put("/videos/:id", (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body

    database.update(videoId, {
        title,
        description,
        duration
    })
    return reply.status(204).send()
})

//deletar um videos
server.delete("/videos/:id", (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

//somar duracao dos videos
server.get("/videos/soma_duracao", (request, reply) => {
    const soma = database.soma_duracao()
    return soma
})

server.listen({
    port:5555
})