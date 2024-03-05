import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import LazyImage from "../pages/LazyImage";
import thumbnail from '../assets/placeholder.jpg';


export default function WatchLaterVideosComponent({ userInfo, index, parameter, videoId }){
    const [likedvideos, setLikedVideos] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/library_videos_json`, {
                method: 'GET',
                credentials: 'include',
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch liked videos');
                }
            })
            .then(data => {
                setLikedVideos(data.watchlater);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }, [])

    return (
        <>
            <div className="likedvideosouter">
                <div className="likedvideosheader">
                    <h4>Watch Later videos</h4>
                    <div className="likedrow">
                        <label>Private</label>
                        <span>{userInfo.username}</span>
                        <span> - {index} / {likedvideos.length}</span>
                    </div>
                    
                </div>
                <div className="videoscontain">
                    {likedvideos.map((item, index) => (
                        <NavLink to={`/watch/${item.id}?list=${parameter}&index=${index+1}`} key={index}>
                            <div className="likevideo">
                                {videoId == item.id ? (
                                    <div className="likevideoinner active">
                                        <div className="likevideocount">
                                            {videoId == item.id ? (
                                                <img width="10" height="10" src="https://img.icons8.com/ios-glyphs/30/play--v1.png" alt="play--v1"/>
                                            ):(
                                                <label>{index+1}</label>
                                            )}
                                            
                                        </div>
                                        <div className="likevideoleft">
                                            <label>{item.duration}</label>
                                            <LazyImage src={thumbnail} data-real-src={item.image} alt={index} />
                                        </div>
                                        <div className="likevideoright">
                                            <h4>{item.title}</h4>
                                            <span>{item.author}</span>
                                        </div>
                                    </div>
                                ):(
                                    <div className="likevideoinner">
                                        <div className="likevideocount">
                                            <label>{index+1}</label>
                                        </div>
                                        <div className="likevideoleft">
                                            <label>{item.duration}</label>
                                            <LazyImage src={thumbnail} data-real-src={item.image} alt={index} />
                                        </div>
                                        <div className="likevideoright">
                                            <h4>{item.title}</h4>
                                            <span>{item.author}</span>
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    )
}