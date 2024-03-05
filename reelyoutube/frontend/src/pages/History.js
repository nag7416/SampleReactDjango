import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Side from "../components/Side";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import thumbnail from '../assets/placeholder.jpg';
import LoadingBar from "react-top-loading-bar";
import LazyImage from "./LazyImage";

function History({ userInfo, subdata }){
    const [historyvideos, setHistoryVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            setHistoryVideos(data.history);
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
            console.error('Error fetching user info:', error);
        });

    }, [])
    return (
        <>
            <Helmet>
                <title>History - YouTube</title>
            </Helmet>

            <LoadingBar color="#ff0000" height={1.5} progress={isLoading ? 30 : 100} />

            <Navbar userInfo={userInfo} />
            <div className="main">
                <Side />
                <Sidebar userInfo={userInfo} subdata={subdata} />
                <div className="main-scroll">
                    <div className="inners" style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h2 style={{padding: '20px', maxWidth: '1284px', width: '95%'}}>Watch history</h2>
                        <div className="explorecon">
                            {historyvideos.map((hvideo) => (
                                <div className="explores" key={hvideo.id}>
                                    <NavLink to={`/watch/${hvideo.id}`}>
                                        <div className="explore">
                                            <div className="leftimg">
                                                <LazyImage alt={hvideo.id} src={thumbnail} data-real-src={hvideo.image} />
                                                <span>
                                                    <p>{hvideo.duration}</p>
                                                </span>
                                            </div> 
                                            <div className="rightdetail">
                                                <h3>{hvideo.title}</h3>
                                                <div className="author">                                    
                                                    <label onClick={() => {'/'}}>{hvideo.author}</label>                                    
                                                    <span> &bull; <label style={{margin: '0 5px'}}>{hvideo.views} views</label> &bull; <label style={{margin: '0 5px'}}>{hvideo.published}</label></span>
                                                </div>
                                                <p>{hvideo.description}</p>                
                                            </div> 
                                        </div>  
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default History;