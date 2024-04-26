import {randomUUID} from "node:crypto"

export class DatabaseMemory{
    #videos = new Map()

    list(){
        return Array.from (this.#videos.entries()).map((videoArray) =>{
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id,
                ...data
            }
        }
)
    }

    soma_duracao (){
            var array_videos = Array.from (this.#videos.entries()).map((videoArray) =>{
                const id = videoArray[0]
                const data = videoArray[1]
    
                return {
                    id,
                    ...data
                }
            }
            )
            var soma = 0
            for(var v of  array_videos){
                soma+= v.duration
            }
            return soma
    }

    create(video){
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }

    update(id, video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.delete(id)
    }

}