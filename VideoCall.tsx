import { useEffect, useRef } from 'react';
import { ZegoExpressEngine } from 'zego-express-engine';

const VideoCall: React.FC = () => {
  // Create refs for local and remote video elements
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Function to initialize Zego
    const initZego = async () => {
      // Create a new instance of ZegoExpressEngine with your Zego credentials
      const zg = new ZegoExpressEngine('your_app_id', 'your_server');
      
      // Set up event listeners and other configurations here
      
      // Initialize Zego
      await zg.initialize();

      // Set up video views
      // Start previewing the local video feed on the local video element
      if (localVideoRef.current) {
        zg.startPreview(localVideoRef.current);
      }

      // Start playing the remote video stream on the remote video element
      if (remoteVideoRef.current) {
        zg.startPlayingStream('remoteStreamID', remoteVideoRef.current);
      }
      
      // Join the room with the specified room ID and user ID
      await zg.loginRoom('your_room_id', 'user_id');

      // Start publishing the local video stream
      await zg.startPublishingStream('your_stream_id');

      // Start publishing a remote video stream (assumed to have the ID 'remoteStreamID')
      await zg.startPublishingStream('remoteStreamID');
    };

    // Call the initialization function when the component mounts
    initZego();
  }, []);

  // Render the local and remote video elements within a div
  return (
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

// Export the VideoCall component as the default export of the module
export default VideoCall;
