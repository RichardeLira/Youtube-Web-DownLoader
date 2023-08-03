import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ytdl from 'ytdl-core';
import cors from '@fastify/cors'


const app: FastifyInstance = fastify();

// Cors Settings 
app.register(cors, {
  origin: 'http://localhost:3000',
  exposedHeaders: '*',
});

interface YoutubeDownloadBody {
  link: string;
}

interface ContentDownloadBody {
  link: string;
  Itag: number; 
}

interface dataFormat {
    link: string;
    Format: string;
  }
  
  
app.get('/checkService', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Faz uma solicitação de teste para o serviço ytdl
      await ytdl.getInfo('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      
      // Se a solicitação não lançar nenhum erro, o serviço está funcionando corretamente
      reply.send({ status: 'Ytdl service is up and running' });
    } catch (error) {
      // Se ocorrer algum erro, o serviço pode estar indisponível
      reply.status(500).send({ error: 'Ytdl service is not available' });
    }
  });
  

app.post('/validateURL', (request: FastifyRequest, reply: FastifyReply) => {

    const body: YoutubeDownloadBody = request.body as YoutubeDownloadBody
    const url: string = body.link

    // Verifica se a URL é válida
    if (!ytdl.validateURL(url)) {
        reply.code(400).send({ 'error': 'Invalid YouTube URL' })
        return
    }

    reply.code(200).send({ 'sucess': 'Valid YouTube URL' })
})

app.post('/metaData', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const body: YoutubeDownloadBody = request.body as YoutubeDownloadBody
    const url: string = body.link

    // Get videdo information
    const info = await ytdl.getInfo(url)

    // Extract metadata 
    const metaData = { 
      title: info.videoDetails.title,
      duration: info.videoDetails.lengthSeconds,
      thumbnail: info.videoDetails.thumbnails[0].url
    }

    // Send data
    reply.send(metaData)

  }
  catch (error) {
    return reply.status(500).send({error: 'Ocorreu um erro ao obter as informações do vídeo.' })
  }

})


app.post('/formatsAvailable', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body: YoutubeDownloadBody = request.body as YoutubeDownloadBody;
      const url: string = body.link;
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title
      const formats = info.formats;
      const formattedFormats: {
        audioVideo: dataFormat[];
        onlyVideo: dataFormat[];  
        onlyAudio: dataFormat[];  
      } = {
        audioVideo: [],
        onlyVideo:  [],
        onlyAudio:  [],
      };

       
      
      for(let i = 0; i<formats.length; i++){
        const format = formats[i]
        if(format.audioQuality !== undefined && format.qualityLabel !== null ) {
            formattedFormats.audioVideo.push({link:`${format.url}&title=${encodeURIComponent(title)}`, Format:format.qualityLabel+"."+format.container})
        }
        else if(format.audioQuality !== undefined && format.qualityLabel === null) {
            formattedFormats.onlyAudio.push({link:`${format.url}&title=${encodeURIComponent(title)}`, Format:format.container})
        }
        else {
            formattedFormats.onlyVideo.push({link:`${format.url}&title=${encodeURIComponent(title)}`, Format:format.qualityLabel+"."+format.container})
        }
      }
    
      return reply.send(formattedFormats);
    } catch (error) {
      
      return reply.status(500).send({ error: 'Ocorreu um erro ao obter as informações do vídeo.' });
    }
  });

app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP Server Ok");
});


