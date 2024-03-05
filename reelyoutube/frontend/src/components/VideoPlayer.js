import React, { useEffect, useRef, useState } from 'react';
import '../../src/player.css';
import '../../src/player.js';
import captionfile from '../assets/subtitles.vtt';

function VideoPlayer({ url }) {
  const VideoElement = useRef(null);
  const container = document.querySelector('.video-contain');
  const [currentCaption, setCurrentCaption] = useState('');
  const [likedvideos, setLikedVideos] = useState([]);

  const togglePlay = () => {
    const videoElem = VideoElement.current;
    videoElem.paused ? videoElem.play() : videoElem.pause();
  }

  const PlayFunc = () => {
    container.classList.remove('paused');
  }

  const PauseFunc = () => {
    container.classList.add('paused');
  }

  const toggleTheaterMode = () => {
    container.classList.toggle('theater');
    const mainScroll = document.querySelector('.main-scroll');
    mainScroll.classList.toggle('theater');
  }

  const toggleFullScreenMode = () => {
    if (document.fullscreenElement == null) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  const toggleMiniPlayerMode = () => {
    const container = document.querySelector('.video-contain');
    const videoElem = VideoElement.current;
    if (container.classList.contains('mini-player')) {
      document.exitPictureInPicture();
    } else {
      videoElem.requestPictureInPicture();
    }
  }

  const toggleMute = () => {
    const videoElem = VideoElement.current;
    videoElem.muted = !videoElem.muted;
  }

  const sliderFunc = () => {
    const volumeSlider = document.querySelector('.volume-slider');
    const container = document.querySelector('.video-contain');
    const videoElem = VideoElement.current;

    volumeSlider.value = videoElem.volume;
    let volumeLevel;

    if (videoElem.muted || videoElem.volume === 0) {
      volumeSlider.value = 0;
      volumeLevel = "muted";
    } else if (videoElem.volume >= 0.5) {
      volumeLevel = 'high';
    } else {
      volumeLevel = 'low';
    }

    container.dataset.volumeLevel = volumeLevel;
  }

  const volumeSliderFunc = (e) => {
    const videoElem = VideoElement.current;
    videoElem.volume = e.target.value;
    videoElem.muted = e.target.value === 0;
  }

  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  })

  const formatDuration = (time) => {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    } else {
      return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
    }
  }

  const skip = (duration) => {
    const videoElem = VideoElement.current;
    videoElem.currentTime += duration;
  }


  const captionFunc = () => {
    const videoElem = VideoElement.current;
    const captions = videoElem.textTracks[0];
    if (captions.mode === 'showing') {
        captions.mode = 'hidden';
        container.classList.remove('captions');
        localStorage.setItem('captionsMode', 'hidden');
    } else {
        captions.mode = 'showing';
        container.classList.add('captions');
        localStorage.setItem('captionsMode', 'showing');
    }
  }


  const loadFunc = () => {
    const container = document.querySelector('.video-contain');
    const videoElem = VideoElement.current;
    const captions = videoElem.textTracks[0];

    // Check if captionsMode is stored in localStorage
    const storedCaptionsMode = localStorage.getItem('captionsMode');

    if (storedCaptionsMode === 'showing') {
        captions.mode = 'showing';
        container.classList.add('captions'); // Add 'captions' class to container
    } else {
        captions.mode = 'hidden';
        container.classList.remove('captions'); // Remove 'captions' class from container
    }

    const storedProgress = localStorage.getItem('videoDuration');
    if (storedProgress !== null) {
      const progress = parseFloat(storedProgress);
      const videoElem = VideoElement.current;

      videoElem.addEventListener('loadedmetadata', () => {
        const clampedProgress = Math.min(1, Math.max(0, progress));
        const currentTime = clampedProgress * videoElem.duration;
        videoElem.currentTime = currentTime;
      });
    }
  }
  



  useEffect(() => {
    const container = document.querySelector('.video-contain');
    const volumeSlider = document.querySelector('.volume-slider');
    const totalTime = document.querySelector('.total-time');
    const currentTimeElem = document.querySelector('.current-time');
    const speedBtn = document.querySelector('.speed-btn');
    const timelineContainer = document.querySelector('.timeline-container');
    const videoElem = VideoElement.current;
    const captionsBtn = document.querySelector('.captions-btn');
    let isDragging = false;

    container.classList.remove('paused');

    loadFunc();
    

    const handleMouseDown = (e) => {
      isDragging = true;
      handleMouseMove(e);
    }

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const boundingRect = timelineContainer.getBoundingClientRect();
      const offsetX = e.clientX - boundingRect.left;
      const width = boundingRect.width;
      const percent = Math.min(1, Math.max(0, offsetX / width));
      const seekTime = percent * videoElem.duration;
      videoElem.currentTime = seekTime;
    }

    const handleMouseUp = () => {
      isDragging = false;
    };

    if (!videoElem.paused) {
      container.classList.remove('paused');
    }

    speedBtn.addEventListener('click', function () {
      let newPlaybackRate = videoElem.playbackRate + 0.25
      if (newPlaybackRate > 2) newPlaybackRate = 0.25
      videoElem.playbackRate = newPlaybackRate
      speedBtn.textContent = `${newPlaybackRate}x`;
    });

    videoElem.addEventListener('loadeddata', () => {
      totalTime.textContent = formatDuration(videoElem.duration);
    })

    videoElem.addEventListener('ended', function(){
      setCurrentCaption('');
    })

    videoElem.addEventListener('timeupdate', () => {
      currentTimeElem.textContent = formatDuration(videoElem.currentTime);
      const percent = videoElem.currentTime / videoElem.duration;
      localStorage.setItem('videoDuration', percent.toString());
      
      timelineContainer.style.setProperty("--progress-position", percent);

      // const tracks = videoElem.textTracks;
      // if(tracks) {
      //   for (let i = 0; i < tracks.length; i++){
      //     const track = tracks[i];
      //     if (track.kind === 'captions') {
      //       track.mode = 'showing'; // Enable captions track
      //       if (track.mode === 'showing' && track.activeCues && track.activeCues.length > 0) {
      //         setCurrentCaption(track.activeCues[0].text);
      //         break;
      //       }
      //     }
      //   }
      // }
    })

    const skip = (duration) => {
      videoElem.currentTime += duration;
    }

    const handleKeyDown = (e) => {
      const tagName = e.target.tagName.toLowerCase();
      if (tagName === 'input') return; // Ignore key events when an input is focused

      switch (e.key.toLowerCase()) {
        case " ":
          videoElem.paused ? videoElem.play() : videoElem.pause();
          break;
        case 'arrowleft':
          videoElem.currentTime -= 5 // Skip backward 5 seconds
          break;
        case 'arrowright':
          videoElem.currentTime += 5
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    timelineContainer.addEventListener('click', handleMouseMove)
    timelineContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    videoElem.addEventListener('enterpictureinpicture', () => {
      document.querySelector('.video-contain').classList.add('mini-player');
    })
    videoElem.addEventListener('leavepictureinpicture', () => {
      document.querySelector('.video-contain').classList.remove('mini-player');
    })

    document.addEventListener('fullscreenchange', () => {
      document.querySelector('.video-contain').classList.toggle('full-screen', document.fullscreenElement)
    })



    

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      timelineContainer.removeEventListener('click', handleMouseMove);
      timelineContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

    }
  }, [])

  return (
    <div className="video-contain paused" data-volume-level="high">
      <img className="thumbnail-img" />
      <div className="video-controls-container">
        {/* <div className='caption-con'>
          {currentCaption}
        </div> */}
        <div className="timeline-container">
          <div className="timeline">
            <div className="thumb-indicator"></div>
          </div>
        </div>
        <div className="controls">
          <button className="play-pause-btn" id='play-pause-btn' onClick={togglePlay}>
            <svg className="play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg className="pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          <div className="volume-container">
            <button className="mute-btn" onClick={toggleMute}>
              <svg className="volume-high-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
              </svg>
              <svg className="volume-low-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9H5Z" />
              </svg>
              <svg className="volume-muted-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
              </svg>
            </button>
            <input onInput={volumeSliderFunc} className="volume-slider" type="range" min="0" max="1" step="any" value="1" />
          </div>
          <div className="duration-container">
            <div className="current-time">0:00</div>
            /
            <div className="total-time">0:01</div>
          </div>
          <button className="captions-btn" onClick={captionFunc}>
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
            </svg>
          </button>
          <button className="speed-btn wide-btn">
            1x
          </button>
          <button className="mini-player-btn" onClick={toggleMiniPlayerMode}>
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
            </svg>
          </button>
          <button className="theater-btn" onClick={toggleTheaterMode}>
            <svg className="tall" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/>
            </svg>
            <svg className="wide" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"/>
            </svg>
          </button>
          <button className="full-screen-btn" onClick={toggleFullScreenMode}>
            <svg className="open" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
            <svg className="close" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>
          </button>
        </div>
      </div>
      <video onVolumeChange={sliderFunc} src={url} ref={VideoElement} onPlay={PlayFunc} onPause={PauseFunc} onClick={togglePlay} autoPlay loop muted>
        <track kind="captions" mode="disabled" srcLang="en" src={captionfile} />
      </video>
    </div>
  );
}

export default VideoPlayer;
