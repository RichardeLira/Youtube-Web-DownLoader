import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ytdl from 'ytdl-core';
import cors from '@fastify/cors'


const app: FastifyInstance = fastify();

// Cors Settings 
app.register(cors, {
  origin: 'http://127.0.0.1:5500',
});

interface YoutubeDownloadBody {
  link: string;
}

interface ContentDownloadBody {
  link: string;
  Itag: number; 
}

interface dataFormat {
    Itag: number;
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
            formattedFormats.audioVideo.push({Itag:format.itag, Format:format.qualityLabel+"."+format.container})
        }
        else if(format.audioQuality !== undefined && format.qualityLabel === null) {
            formattedFormats.onlyAudio.push({Itag:format.itag, Format:format.container})
        }
        else {
            formattedFormats.onlyVideo.push({Itag:format.itag, Format:format.qualityLabel+"."+format.container})
        }
      }
    
      return reply.send(formattedFormats);
    } catch (error) {
      
      return reply.status(500).send({ error: 'Ocorreu um erro ao obter as informações do vídeo.' });
    }
  });

app.post('/ytDownload', async (request: FastifyRequest, reply: FastifyReply) => {
    const body: ContentDownloadBody = request.body as ContentDownloadBody;

    if (!body || !body.link) {
        reply.code(400).send({ 'error': 'Invalid request body' });
        return;
    }
    
    const url: string = body.link
    const Itag: number = body.Itag
    const info = await ytdl.getInfo(url)
    const videoTitle = info.videoDetails.title;
   
    const videoReadableStream = ytdl(url, { filter: format => format.itag === Itag });

    const formats = info.formats 
    const desiredFormat = formats.find((format) => format.itag === Itag);
    const videoContainer = desiredFormat?.container;
    // Define o cabeçalho de resposta antes de enviar os dados do vídeo
    reply.header('Content-Type', `video/${videoContainer}`); // Ajuste o tipo de conteúdo de acordo com o formato de vídeo real
    reply.header('Content-Disposition', `attachment; filename="${videoTitle}.${videoContainer}"`); // Ajuste o nome do arquivo de acordo com o título do vídeo
    
    // Envia o vídeo para o cliente usando o streaming do Fastify
    return videoReadableStream
});

app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP Server Ok");
});


