// // import React, { useState ,useEffect} from "react";
// // import { Box, Button, HStack,Flex} from "@chakra-ui/react";
// // import { keyframes } from "@emotion/react"
// // // import { LiveAudioVisualizer } from 'react-audio-visualize';
// // import dynamic from 'next/dynamic';

// // const LiveAudioVisualizer = dynamic(
// //   () => import('react-audio-visualize').then(mod => mod.LiveAudioVisualizer),
// //   { ssr: false }
// // );

// // interface SoundwaveProp {
// //     isRecording : Boolean
// //     isPaused : Boolean
// //     mediaRecorder : MediaRecorder | null
// // }

// // const Soundwave : React.FC<SoundwaveProp> = ({isRecording,isPaused,mediaRecorder}) => {

// //   // Chakra UI animation keyframes
// //   const waveAnimation = keyframes`
// //     0%, 100% { height: 20px; }
// //     50% { height: 60px; }
// //   `;




// //   return (
  
// //     <Flex display={isRecording? 'flex' : 'none'} w="100%" h="60px" m={'1rem 0'} justify="space-between" align="center" overflow="hidden">
    
// //     {/* {[...Array(150)].map((_, index) => (
// //       <Box
// //         key={index}
        
// //         flex="1" // Ensures all bars divide the parent width evenly
// //         mx="1px" // Optional: Adjust spacing between bars
// //         bg="black"
// //         animation={`${waveAnimation} 1s infinite`}
// //         css={
// //             isPaused ? 
            
// //             {

// //             }
// //              :
// //             {
// //                 animation: `${waveAnimation} 1s infinite`,
// //                 animationDelay: `${index * 0.1}s`,
// //             }
// //     }
// //       />
// //     ))} */}
  
// //      <div>
// //       {mediaRecorder && (
// //         <LiveAudioVisualizer
// //           mediaRecorder={mediaRecorder}
// //           width={200}
// //           height={75}
// //         />
// //       )}
// //     </div>

    
// //   </Flex>
// //   );
// // };

// // export default Soundwave;


// // import React,{useEffect,useState,useRef}  from "react";
// // import dynamic from "next/dynamic";
// // import { Box, Flex } from "@chakra-ui/react";


// // // Dynamic import for LiveAudioVisualizer
// // const LiveAudioVisualizer = dynamic(
// //   () => import("react-audio-visualize").then((mod) => mod.LiveAudioVisualizer),
// //   { ssr: false }
// // );
// // // import { LiveAudioVisualizer } from 'react-audio-visualize';

// // interface SoundwaveProps {
// //   mediaRecorder: MediaRecorder | null;
// //   isRecording: boolean;
// // }

// // const Soundwave: React.FC<SoundwaveProps> = ({ mediaRecorder, isRecording }) => {
// //      const useMediaRecorderRef = useRef<MediaRecorder | null>(null);

// //     useEffect(()=>{
// //      useMediaRecorderRef.current = mediaRecorder
// //      console.log({useMediaRecorderRef,mediaRecorder})
// //     },[mediaRecorder])
// //   return (
// //     <Box>
  
// //     <Flex display={isRecording ? "flex" : "none"} w="100%" h="75px" justify="center" align="center">
// //       {mediaRecorder && (
// //         <LiveAudioVisualizer mediaRecorder={mediaRecorder} width={200} height={75} />
// //       )}
// //     </Flex>
// //     </Box>
// //   );
// // };

// // export default Soundwave;


// import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { Box, Flex } from "@chakra-ui/react";
// // import { useAudioRecorder } from 'react-audio-voice-recorder';

// // Dynamic import for LiveAudioVisualizer
// const LiveAudioVisualizer = dynamic(
//   () => import("react-audio-visualize").then((mod) => mod.LiveAudioVisualizer),
//   { ssr: false }
// );


// interface SoundwaveProps {
//   mediaRecorder: MediaRecorder | null;
//   isRecording: boolean;
// }

// const Soundwave: React.FC<SoundwaveProps> = ({ mediaRecorder, isRecording }) => {
//   const [updatedMediaRecorder, setUpdatedMediaRecorder] = useState<MediaRecorder | null>(null);
//   const [useAudioRecorder,setUseAudioRecorder] = useState<any>()
  
 
// //   const recorder = AudioVoiceRecorder();

//   useEffect(() => {
//     // When mediaRecorder prop changes, update the state
//     setUpdatedMediaRecorder(mediaRecorder);
  
//   }, [mediaRecorder]);


//   return (
//     <Box>
//       <Flex
//         display={isRecording && updatedMediaRecorder ? "flex" : "none"}
//         w="100%"
//         h="75px"
//         justify="center"
//         align="center"
//         bg="gray.200" // Add background to check visibility
//         border="1px solid red" // Border for visibility
//       >
//         {/* Only render LiveAudioVisualizer when mediaRecorder is set */}
//         {updatedMediaRecorder ? (
//           <Box>
//             <Box bg="blue.200" p="4" mb="2">Testing</Box> {/* Testing text container */}
//             <LiveAudioVisualizer
//               mediaRecorder={updatedMediaRecorder}
//             //   mediaRecorder={recorder.mediaRecorder}
//               width={200}
//               height={75}
//             />
//           </Box>
//         ) : (
//           <Box>Media Recorder is not set</Box> // Fallback message
//         )}
//       </Flex>
//     </Box>
//   );
// };

// export default Soundwave;

import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";
// Define the keyframes for the pulsing effect
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

interface SoundwaveProp {
    isRecording : boolean
    isPaused : boolean
}

const Soundwave : React.FC<SoundwaveProp>  = ({isPaused,isRecording}) => {
  return (
    <Box
      display={isRecording ? 'block' : 'none' }
      width="100px"
      height="100px"
      borderRadius="50%"
      backgroundColor="red"
      animation={isPaused ? '' : `${pulseAnimation} 2s infinite`}
      mx={'auto'}
    />
  );
};

export default Soundwave;
