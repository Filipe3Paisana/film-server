import fastify from 'fastify';
import mysql from 'mysql2/promise';

const server = fastify();

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'MarcinhoBR',
  password: 'Filipe123'
});

// Enviar um vídeo
server.post("/videos", async (request, reply) => {
    const { title, description, duration } = request.body;
    await connection.execute(
        'INSERT INTO videos (title, description, duration) VALUES (?, ?, ?)',
        [title, description, duration]
    );
    return reply.status(201).send();
});

// Buscar vídeos
server.get("/videos", async (request, reply) => {
    const [videos] = await connection.query('SELECT * FROM videos');
    return reply.send(videos);
});

// Atualizar um vídeo
server.put("/videos/:id", async (request, reply) => {
    const { id } = request.params;
    const { title, description, duration } = request.body;
    await connection.execute(
        'UPDATE videos SET title = ?, description = ?, duration = ? WHERE id = ?',
        [title, description, duration, id]
    );
    return reply.status(204).send();
});

// Deletar um vídeo
server.delete("/videos/:id", async (request, reply) => {
    const { id } = request.params;
    await connection.execute(
        'DELETE FROM videos WHERE id = ?',
        [id]
    );
    return reply.status(204).send();
});

// Somar duração dos vídeos
server.get("/videos/soma_duracao", async (request, reply) => {
    const [[{ totalDuration }]] = await connection.query('SELECT SUM(duration) AS totalDuration FROM videos');
    return reply.send({ totalDuration });
});

server.listen({ port: 5555 }, err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Server listening on port 5555');
});
