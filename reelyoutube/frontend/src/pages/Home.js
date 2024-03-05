import { NavLink } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../components/Navbar";
import Side from "../components/Side";
import thumbnail from '../assets/placeholder.jpg';
import author from '../assets/author.png';
import {Helmet} from "react-helmet";
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import LoadingBar from 'react-top-loading-bar';
import NoInternetPage from "./NoInternetPage";
import LazyImage from "./LazyImage";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import VideoPlayer from "../components/VideoPlayer";
import toyota from '../assets/toyota.png';

export default function Home({ userInfo, subdata }){
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const containerRef = useRef(null);

    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'; // Replace with your CSRF token header name
    axios.defaults.xsrfCookieName = 'csrftoken'; 
    
    const fetchData = () => {
        const apiurl = 'http://localhost:8000/api/videos';

        axios.get(apiurl)
        .then(response => {
            
                
            setTimeout(() => {
                setIsLoading(false);
            });
            setTimeout(() => {
                setVideos(response.data);
            }, 1000);
                     
        })
        .catch(error => {
            console.log('error fetching videos', error);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        fetchData();
        fetch(`http://localhost:8000/api`, {
          method: 'GET',
          credentials: 'include',
        })
        .then(response => {
          if (response.status === 200) {
              return response.json();
          } else {
              throw new Error('Failed to fetch user info');
          }
        })
        .then(data => {
        
        })



        const options = {
            root: null, // Use the viewport as the root
            rootMargin: '0px', // No margin
            threshold: 0.5, // Trigger when 50% of the container is visible
          };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.src = target.getAttribute('data-real-src'); // Replace src with data-real-src
                    observer.unobserve(containerRef.current);
                }
            });
        }, options);

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        const handleOnlineStatusChange = () => {
            setIsOnline(navigator.onLine);
            fetchData();
        };

        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);
      
          // Cleanup the Intersection Observer
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }

            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };

    }, []);

    const videoOptions = () => {
        const videooptions = document.querySelectorAll('.main .main-scroll .inner .video .video-detail .video-options');

        for(let i=0; i<videooptions.length; i++){
            console.log(videoOptions[i]);
        }
    }

    return (
        
        <>
            <Helmet>
                <title>(1) YouTube</title>
            </Helmet>
            
            <LoadingBar
                color="#ff0000" // Customize the color (e.g., red)
                height={1.5}       // Customize the height (4 pixels)
                progress={isLoading ? 30 : 100} // Set progress based on loading state
            />
            <Navbar userInfo={userInfo} />
            <div className="main">
                <Side userInfo={userInfo} />
                <Sidebar userInfo={userInfo} subdata={subdata} />
                <div className="main-scroll" ref={containerRef}>
                    <div className="inner">
                        { isOnline ? (
                            <>
                        {isLoading ? (
                            <></>
                        ):(
                            <>
                                {videos.length < 4 ? (
                                    <>
                                        {videos.map(video => (
                                            <NavLink to={`/watch/${video.id}`} key={video.id} className="something">
                                                <div className="video" key={video.id}>
                                                    <div className="video-img">
                                                        <label>{video.duration}</label>
                                                        <LazyImage src={thumbnail} data-real-src={video.image} alt={video.id} />                                                        
                                                    </div>
                                                    <div className="video-detail">
                                                        <div className="video-left">
                                                            <div className="video-author-img">
                                                                <NavLink to={`/@${video.authorslug}`}>
                                                                    <LazyImage src={author} data-real-src={video.channelimg} alt={video.id} /> 
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                        <div className="video-right">
                                                            <NavLink>
                                                                <h4>{video.title}</h4>
                                                            </NavLink>
                                                            <label>
                                                                <NavLink to={`/@${video.authorslug}`}>{video.author}</NavLink> 
                                                            </label>
                                                            <div>
                                                                <span>{video.views} views &nbsp;</span>
                                                                <span>&bull; {video.published}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        ))}
                                    
                                        <div className="video"></div>
                                        <div className="video"></div>
                                        <div className="video"></div>
                                        <div className="video"></div>
                                    </>
                                ):(
                                    <>
                                        {videos.map(video => (
                                            // <NavLink to={`/watch/${video.id}`} key={video.id} className="something">
                                                <div className="video" key={video.id}>
                                                    <NavLink to={`/watch/${video.id}`} key={video.id}>
                                                        <div className="video-img">
                                                            <label>{video.duration}</label>
                                                            <LazyImage src={thumbnail} data-real-src={video.image} alt={video.id} />
                                                        </div>
                                                    </NavLink>
                                                    <div className="video-detail">
                                                        <div className="video-left">
                                                            <div className="video-author-img">
                                                                <NavLink to={`/@${video.authorslug}`}>
                                                                    <LazyImage src={author} data-real-src={video.channelimg} alt={video.id} /> 
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                        <div className="video-right">
                                                            <NavLink>
                                                                <h4>{video.title}</h4>
                                                            </NavLink>
                                                            <label>
                                                                <NavLink to={`/@${video.authorslug}`}>{video.author}</NavLink> 
                                                            </label>
                                                            <div>
                                                                <span>{video.views} views &nbsp;</span>
                                                                <span>&bull; {video.published}</span>
                                                            </div>
                                                        </div>
                                                        <div className="video-options">
                                                            <button onClick={videoOptions}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            // </NavLink>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                        </>
                        ):(
                            <NoInternetPage />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
