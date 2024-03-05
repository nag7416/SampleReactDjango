import { useState, useEffect } from "react";
import thumbnail from '../../assets/placeholder.jpg'
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar";
import Side from "../Side";
import Sidebar from "../Sidebar";
import LoadingBar from "react-top-loading-bar";
import Channel from "./Channel";
import LazyImage from "../../pages/LazyImage";

function ChannelVideos({ userInfo, subdata }){
    const [videos, setVideos] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [delayedLoading, setDelayedLoading] = useState(false);
    
    const { channelslug } = useParams();

    const channelslu = channelslug.replace('@', '');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/user_channel_json/${channelslu}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }
                const data = await response.json();
                setVideos(data.videos);
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setisLoading(false);
            }
        };

        fetchData();
    }, [channelslu]);


    return (
        <>

{isLoading && (
                <LoadingBar
                    color="#ff0000"
                    height={1.5}
                    progress={30} // You can adjust this value as needed
                />
            )}


            <div className="channelvideoscon">
                    <h4>Videos ({videos.length})</h4>
                    <div className="channelvideoscon-inner">
                        {videos.length <= 4 ? (
                        <>
                                {videos.map((video) => (
                                    <div className="channelvid" key={video.id}>
                                        <div className="channelvid-img">
                                            <label>{video.duration}</label>
                                            <NavLink to='/'>
                                                <LazyImage src={thumbnail} data-real-src={video.image} alt={video.id} />
                                                {/* <img alt='s' src={delayedLoading ? video.image : thumbnail} /> */}
                                            </NavLink>
                                        </div>
                                        <div className="channelvid-detail">
                                            <div className="meta">
                                                <h3>{video.title}</h3>
                                                <div className="metablock">
                                                    <span>{video.views} views</span>&bull;
                                                    <span>{video.published}</span>
                                                </div>
                                            </div>
                                            <div className="menu">
                                                <button>
                                                    <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="channelvid"></div>
                                <div className="channelvid"></div>
                                <div className="channelvid"></div>
                                <div className="channelvid"></div>
                                <div className="channelvid"></div>
                                <div className="channelvid"></div>
                            </>
                        ):(
                            <>
                                {videos.map((video) => (
                                    <div className="channelvid" key={video.id}>
                                        <div className="channelvid-img">
                                            <label>{video.duration}</label>
                                            <NavLink to='/'>
                                                <LazyImage src={thumbnail} data-real-src={video.image} alt={video.id} />
                                            </NavLink>
                                        </div>
                                        <div className="channelvid-detail">
                                            <div className="meta">
                                                <h3>{video.title}</h3>
                                                <div className="metablock">
                                                    <span>{video.views} views</span>&bull;
                                                    <span>{video.published}</span>
                                                </div>
                                            </div>
                                            <div className="menu">
                                                <button>
                                                    <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                                
                    </div>
                </div>    


        </>
    )
}
export default ChannelVideos;