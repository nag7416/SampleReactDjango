import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Side from "../components/Side";
import Sidebar from "../components/Sidebar";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import NoInternetPage from "./NoInternetPage";
import thumbnail from '../assets/placeholder.jpg';
import author from '../assets/author.png';
import LazyImage from "./LazyImage";

function Subscriptions({ userInfo, subdata }){
    const [subVideos, setSubVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const containerRef = useRef(null);


    useEffect(() => {
        const fetchData = () => {
            const apiurl = 'http://localhost:8000/api/sub_videos';

            fetch(apiurl, {
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
                setIsLoading(false);
                // document.title = `(${data.length}) Subscriptions - YouTube`;
                setSubVideos(data);
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error fetching user info:', error);
            });
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

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }

            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };





    }, [subVideos.length])

    return (
        <>
            <Helmet>
                <title>Subscriptions - YouTube</title>
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
                    { isOnline ? (
                        <>
                            <h2 style={{padding: '20px 20px 0px 20px'}}>Latest</h2>
                            <div className="inner">
                                {isLoading ? (
                                    <label>Loading...</label>
                                ):(
                                    <>
                                            {subVideos.length <= 4 ? (
                                                <>
                                                    {subVideos.map(video => (
                                                        <div className="video" key={video.id}>
                                                            <div className="video-img">
                                                                <LazyImage alt={video.id} src={thumbnail} data-real-src={video.image} />
                                                                
                                                                <label>{video.duration}</label>
                                                            </div>
                                                            <div className="video-detail">
                                                                <div className="video-left">
                                                                    <div className="video-author-img">
                                                                        <NavLink to='/'>
                                                                            <LazyImage alt={video.id} src={author} data-real-src={video.authorimg} />
                                                                        </NavLink>
                                                                    </div>
                                                                </div>
                                                                <div className="video-right">
                                                                    <h4>
                                                                        <NavLink to='/'>
                                                                            {video.title}
                                                                        </NavLink>
                                                                    </h4>
                                                                    <label>
                                                                        <NavLink to='/'>
                                                                            {video.author}
                                                                        </NavLink>
                                                                    </label>
                                                                    <div>
                                                                        <span>{video.views} views </span>
                                                                        <span>&bull; {video.published}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="video"></div>
                                                    <div className="video"></div>
                                                    <div className="video"></div>
                                                    <div className="video"></div>
                                                    <div className="video"></div>
                                                    <div className="video"></div>
                                                </>
                                            ):(
                                                <>
                                                    {subVideos.map(video => (
                                                        <div className="video" key={video.id}>
                                                            <div className="video-img">
                                                                <LazyImage alt={video.id} src={thumbnail} data-real-src={video.image} />
                                                                <label>{video.duration}</label>
                                                            </div>
                                                            <div className="video-detail">
                                                                <div className="video-left">
                                                                    <div className="video-author-img">
                                                                        <NavLink to='/'>
                                                                            <LazyImage alt={video.id} src={author} data-real-src={video.authorimg} />
                                                                        </NavLink>
                                                                    </div>
                                                                </div>
                                                                <div className="video-right">
                                                                    <h4>
                                                                        <NavLink to='/'>
                                                                            {video.title}
                                                                        </NavLink>
                                                                    </h4>
                                                                    <label>
                                                                        <NavLink to='/'>
                                                                            {video.author}
                                                                        </NavLink>
                                                                    </label>
                                                                    <div>
                                                                        <span>{video.views} views </span>
                                                                        <span>&bull; {video.published}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </>
                                    )}
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
export default Subscriptions;