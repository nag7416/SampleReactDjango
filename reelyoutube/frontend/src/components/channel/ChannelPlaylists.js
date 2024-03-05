import { useState, useEffect } from "react";
import thumbnail from '../../assets/placeholder.jpg'
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar";
import Side from "../Side";
import Sidebar from "../Sidebar";
import LoadingBar from "react-top-loading-bar";
import Channel from "./Channel";
import { NavLink } from "react-router-dom";
import LazyImage from "../../pages/LazyImage";

function ChannelPlaylists({ userInfo, subdata }){
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const { channelslug } = useParams();

    const channelslu = channelslug.replace('@', '');


    useEffect(() => {
        fetch(`http://localhost:8000/api/user_channel_json/${channelslu}`, {
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
            setVideos(data.videos);
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });
    }, []);


    return (
        <>
            <LoadingBar
                color="#ff0000" // Customize the color (e.g., red)
                height={1.5}       // Customize the height (4 pixels)
                progress={isLoading ? 30 : 100} // Set progress based on loading state
            />


                <div className="channelvideoscon">
                    <h4>Playlists (0)</h4>
                </div>
        </>
    )
}
export default ChannelPlaylists;