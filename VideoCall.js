import { useEffect, useRef } from 'react';
import { ZegoExpressEngine } from 'zego-express-engine';

const VideoCall = () => {
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  useEffect(() => {
    const initZego = async () => {
      const zg = new ZegoExpressEngine('your_app_id', 'your_server');
      
      // Set up event listeners and other configurations here
      
      // Initialize Zego
      await zg.initialize();

      // Set up video views
      zg.startPreview(localVideoRef.current);
      zg.startPlayingStream('remoteStreamID', remoteVideoRef.current);
      
      // Join the room
      await zg.loginRoom('your_room_id', 'user_id');
      await zg.startPublishingStream('your_stream_id');
      await zg.startPublishingStream('remoteStreamID');
    };

    initZego();
  }, []);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default VideoCall;
