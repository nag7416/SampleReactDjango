import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Side from "../Side";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import AuthorChannel from "./AuthorChannel";
import { NavLink } from "react-router-dom";
import thumbnail from '../../assets/placeholder.jpg';
import { Helmet } from "react-helmet";

function AuthorChannelHome({ userInfo, subdata }){
    const [authorInfo, setAuthorInfo] = useState([]);
    const [videos, setVideos] = useState([]);
    const [delayedLoading, setDelayedLoading] = useState(false);
    
    const { authorslug } = useParams();

    const authorslu = authorslug.replace('@', '');
    

    const onDataReceivedFromChild = (data) => {
        setAuthorInfo(data.author_data[0]);
        setVideos(data.videos_data);
        setTimeout(() => {
            setDelayedLoading(true);
        }, 1000);
    }


    useEffect(() => {

    }, [authorslu])

    return (
        <>
            <Helmet>
                {authorInfo ? (
                    <title>{authorInfo.channelname ? `${authorInfo.channelname} - YouTube` : 'YouTube'}</title>
                ):(
                    <title>YouTube</title>
                )}
            </Helmet>
            <Navbar userInfo={userInfo} />
            <div className="main">
                <Side />
                <Sidebar userInfo={userInfo} subdata={subdata} />
                <div className="main-scroll">
                    <div className="channellayer">
                        <AuthorChannel userInfo={userInfo} authorslug={authorslu} onDataReceived={onDataReceivedFromChild} />
                        <div className="channelvideoscon">
                            <h4>Videos ({authorInfo.videoslength})</h4>
                            <div className="channelvideoscon-inner">
                                {videos.length <= 4 ? (
                                    <>
                                        {videos.map((video) => (
                                            <div className="channelvid" key={video.id}>
                                                <div className="channelvid-img">
                                                    <label>{video.duration}</label>
                                                    <NavLink to='/'>
                                                        <img alt='s' src={delayedLoading ? video.image : thumbnail} />
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
                                                        <img alt='s' src={delayedLoading ? video.image : thumbnail} />
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
                    </div>
                </div>
            </div>
        </>
    )
}
export default AuthorChannelHome;