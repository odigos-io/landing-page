import React, { useEffect, useRef } from 'react';

const SoundComponent = () => {
  const audioRef = useRef(null);

  useEffect(() => {}, [audioRef]);

  return (
    <div>
      <audio ref={audioRef} src="./drone.mp3"></audio>
    </div>
  );
};

export default SoundComponent;
