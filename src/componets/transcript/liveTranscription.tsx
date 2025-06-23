import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { WaveFile } from 'wavefile';
import { convertFloat32ToInt16 } from "@/libs/utilities";
import { mergeBuffers } from "@/libs/utilities";
// export default function LiveTranscription : React.FC<>  () {

interface LiveTranscriptionProps {
    stream : MediaStream | null
}

const LiveTranscription : React.FC<LiveTranscriptionProps> = ({stream}) => {
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream,setMediaStream] = useState<MediaStream | null>(null)


  let socket: WebSocket | null = null;


 

  useEffect(()=>{
    if(!stream) return
   

    socket = new WebSocket('ws://localhost:5000');
    console.log({socket1:socket})

    socket.onmessage = (event : MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.text) {
        setTranscription((prev) => `${prev} ${data.text}`);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // startRecording((audioData:any) => {
    //   socket?.send(audioData);
    // })
     
    
    startTranscribing(stream,socket)

    return () => {
      if (socket) socket.close();
    };

  },[stream,socket])

  

  const startTranscribing = async (stream:MediaStream,socket:WebSocket) => {
    setIsRecording(true);
    console.log(stream)
    console.log({socket2:socket})
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });


    mediaRecorder.ondataavailable = async (event) => {
      console.log('Audio chunk size:', event.data.size);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(event.data);
      }

    };

    mediaRecorder.start(100); // Send audio chunks every 250ms

    mediaRecorder.onstop = () => {
      setIsRecording(false);
      socket?.close();
    };

    

  };



  // const  startRecording = async function (onAudioCallback :any) {
  //   if (!stream) return
  //   console.log('recording')
  //   let audioBufferQueue = new Int16Array(0)

  //   const audioContext = new AudioContext({
  //     sampleRate: 16_000,
  //     latencyHint: 'balanced'
  //   });

  //   let source = audioContext.createMediaStreamSource(stream);

  //   // await audioContext.audioWorklet.addModule('audio-processor.ts');
  //   async function loadAudioProcessor() {
  //     await import('./audio-proccessor');
  //     await audioContext.audioWorklet.addModule('audio-processor');
  //   }
    
  //   loadAudioProcessor()

  //   const  audioWorkletNode = new AudioWorkletNode(audioContext, 'audio-processor');

  //   source.connect(audioWorkletNode);
  //   audioWorkletNode.connect(audioContext.destination);
  //   audioWorkletNode.port.onmessage = (event) => {
  //     const currentBuffer = new Int16Array(event.data.audio_data);
  //       audioBufferQueue = mergeBuffers(
  //       audioBufferQueue,
  //       currentBuffer
  //     );

  //     const bufferDuration =
  //       (audioBufferQueue.length / audioContext.sampleRate) * 1000;

  //     // wait until we have 100ms of audio data
  //     if (bufferDuration >= 100) {
  //       const totalSamples = Math.floor(audioContext.sampleRate * 0.1);

  //       const finalBuffer = new Uint8Array(
  //         audioBufferQueue.subarray(0, totalSamples).buffer
  //       );

  //       audioBufferQueue = audioBufferQueue.subarray(totalSamples)
  //       if (onAudioCallback) onAudioCallback(finalBuffer);
  //     }
  //   }
  // }

  
  return (
    <Box bg="red" p={4} color="white">
      <Button  colorScheme="teal" isDisabled={isRecording}>
        {isRecording ? 'Recording...' : 'Start Transcription'}
      </Button>

      <Box mt={4}>
        <Text fontWeight="bold">Transcription Output:</Text>
        <Box mt={2} p={2} bg="gray.700" borderRadius="md" maxHeight="300px" overflowY="auto">
          {transcription || 'No transcription yet'}
        </Box>
      </Box>
    </Box>
  );
}

export default  LiveTranscription
