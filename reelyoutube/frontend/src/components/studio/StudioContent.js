import { Helmet } from 'react-helmet';
import StudioNav from './studioComps/StudioNav';
import StudioSidebar from './studioComps/StudioSidebar';
import { useEffect, useState } from 'react';
import usePagination from '@mui/material/usePagination/usePagination';
import { NavLink, useParams } from 'react-router-dom';
import placeholder from '../../assets/placeholder.jpg';
import LazyImage from '../../pages/LazyImage.js';

export default function StudioContent({userInfo}){
    const [requestUserInfo, setrequestUserInfo] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { channelslug } = useParams();
    const channelslu = channelslug.replace('@', '');
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/user_channel_json/${channelslu}`, {
                    method: 'GET',
                    credentials: 'include',
                });
        
                if (response.status === 200) {
                    const data = await response.json();
                    setIsLoading(false);
                    setrequestUserInfo(data);
                    setVideos(data.admin_videos);
                } else {
                    throw new Error('Failed to fetch user info');
                }
            } catch (error) {
                setIsLoading(true);
                console.error('Error fetching user info:', error);
            }
        };
        
        fetchUserInfo();  
        
              
    }, [channelslu])
    return (
        <>
            <Helmet>
                <title>Channel Content - YouTube</title>
            </Helmet>
            <StudioNav userInfo={userInfo} />
            <div className='main'>
                <StudioSidebar userInfo={userInfo} />
                <div className="studioscroll">
                    <div className="inner">
                        <div className="line">
                            <h5>Channel Content</h5>
                            <div class="head">
                                <div class="video">Video</div>
                                <div class="visibility">Visibility</div>
                                <div class="restrictions">Restrictions</div>
                                <div class="date">Date</div>
                                <div class="views">Views</div>
                                <div class="comments">Comments</div>
                                <div class="likes">Likes</div>
                            </div>
                            <div className='heads'>
                                {isLoading ? (
                                    <label style={{marginLeft: '10px', marginTop: '5px'}}>Loading...</label>
                                ):(
                                    <>
                                        {videos.map(video => (
                                            <div className='inners' key={video.id}>
                                                <div className='video'>
                                                    <NavLink to={`/watch/${video.id}`}>
                                                        <button>
                                                            <div className='video-img'>
                                                                <a href='#'>
                                                                    <LazyImage src={placeholder} data-real-src={video.image} />
                                                                </a>
                                                            </div>
                                                            <div className='video-detail'>
                                                                <h3>{video.title}</h3>
                                                                {video.description ? (
                                                                    <p dangerouslySetInnerHTML={{ '__html': video.description}}></p>
                                                                ):(
                                                                    <p>Add description</p>
                                                                )}
                                                                
                                                            </div>
                                                        </button>
                                                    </NavLink>
                                                </div>
                                                <div className='visibility'>
                                                    {video.visibility == 'Public' ? (
                                                        <svg style={{width: '20px', height: '20px', marginRight: '5px'}} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g class="style-scope tp-yt-iron-icon"><path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M3,12c0-0.7,0.09-1.37,0.24-2.02 L8,14.71v0.79c0,1.76,1.31,3.22,3,3.46v1.98C6.51,20.44,3,16.62,3,12z M11.5,18C10.12,18,9,16.88,9,15.5v-1.21l-5.43-5.4 C4.84,5.46,8.13,3,12,3c1.05,0,2.06,0.19,3,0.53V5c0,0.55-0.45,1-1,1h-3v2c0,0.55-0.45,1-1,1H8v3h6c0.55,0,1,0.45,1,1v4h2 c0.55,0,1,0.45,1,1v0.69C16.41,20.12,14.31,21,12,21v-3H11.5z M18.97,17.69C18.82,16.73,18,16,17,16h-1v-3c0-1.1-0.9-2-2-2H9v-1h1 c1.1,0,2-0.9,2-2V7h2c1.1,0,2-0.9,2-2V3.95c2.96,1.48,5,4.53,5,8.05C21,14.16,20.24,16.14,18.97,17.69z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                                    ):(
                                                        <svg style={{width: '20px', height: '20px', marginRight: '5px'}} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g class="style-scope tp-yt-iron-icon"><path d="M17,8V6.63C17,4.08,14.76,2,12,2S7,4.08,7,6.63V8H4v14h16V8H17z M8,6.63c0-2.02,1.79-3.66,4-3.66s4,1.64,4,3.66V8H8V6.63z M19,21H5V9h14V21z M12,12c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S13.66,12,12,12z M12,17c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2 s2,0.9,2,2C14,16.1,13.1,17,12,17z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                                    )}
                                                    {video.visibility}
                                                </div>
                                                <div className='restrictions'>
                                                    None
                                                </div>
                                                <div className='date'>
                                                    <label>{video.published}</label>
                                                    <span>Published</span>
                                                </div>
                                                <div className='views'>
                                                    {video.views}
                                                </div>
                                                <div className='comments'>
                                                    {video.comments}
                                                </div>
                                                <div className='likes'>
                                                    <span>{video.likes} likes</span>
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