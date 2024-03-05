import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Side from "../components/Side";
import {Helmet} from "react-helmet";
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Sidebar from "../components/Sidebar";
import LoadingBar from 'react-top-loading-bar';
import thumbnail from '../assets/placeholder.jpg';
import NoInternetPage from "./NoInternetPage";
import LazyImage from "./LazyImage";

function Explore({ userInfo, subdata }){

    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const containerRef = useRef(null);

    useEffect(() => {

        const fetchData = () => {
            const apiurl = 'http://localhost:8000/api/explore';

            axios.get(apiurl)
            .then(response => {
                setIsLoading(false);
                setVideos(response.data.video_list);
            })
            .catch(error => {
                console.log('error fetching videos', error);
                setIsLoading(false);
            })
        } 
        fetchData();
        
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

    }, [videos.length])

    return (
        <>
            
            <Helmet>
                <title>Explore - YouTube</title>
            </Helmet>
            <LoadingBar
                    color="#ff0000" // Customize the color (e.g., red)
                    height={1.5}       // Customize the height (4 pixels)
                    progress={isLoading ? 30 : 100} // Set progress based on loading state
                />
            <Navbar userInfo={userInfo} />
            <div className="main">
                <Side />
                <Sidebar userInfo={userInfo} subdata={subdata} />
                <div className="main-scroll" ref={containerRef}>

                    {isOnline ? (
                        <>
                            <div className="inners" style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <h2 style={{padding: '20px', maxWidth: '1284px', width: '95%'}}>Trending</h2>

                                
                                        <div className="explorecon">
                                            {isLoading ? (
                                                <label>Loading...</label>
                                            ):(
                                                <>
                                                    {videos.map(video => (
                                                        <div className="explores" key={video.id}>
                                                            <NavLink to='/'>
                                                                <div className="explore">
                                                                    <div className="leftimg">
                                                                        <LazyImage src={thumbnail} data-real-src={video.image} alt={video.id} />
                                                                        <span>
                                                                            <p>{video.duration}</p>
                                                                        </span>
                                                                    </div>
                                                                    <div className="rightdetail">
                                                                        <h3>{video.title}</h3>
                                                                        <div className="author">                                    
                                                                            <label onClick={() => {'/'}}>{video.author}</label>                                    
                                                                            <span> &bull; <label style={{margin: '0 5px'}}>{video.views} views</label> &bull; <label style={{margin: '0 5px'}}>{video.published}</label></span>
                                                                        </div>
                                                                        <p>{video.description}</p>                
                                                                    </div>
                                                                </div>
                                                            </NavLink>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    
                            </div>
                        </>
                    ):(
                        <div className="inner">
                            <NoInternetPage />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Explore;