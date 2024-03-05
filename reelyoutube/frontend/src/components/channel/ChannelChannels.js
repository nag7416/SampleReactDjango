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
import author from '../../assets/author.png';

export default function ChannelChannels({ userInfo, subdata }){
    const [videos, setVideos] = useState([]);
    const [requestuserinfo, setRequestUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [delayedLoading, setDelayedLoading] = useState(false);
    const [subs, setSubs] = useState([]);
    
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
                setSubs(data.subscriber_data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setIsLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <LoadingBar color="#ff0000" height={1.5} progress={isLoading ? 30 : 100} />



            <div className="channelvideoscon">
                <h4>Subscriptions</h4>
                <div className="channelvideoscon-inner">
                    {subs ? (
                    <>
                        {subs.length <= 4 ? (
                        <>
                            {subs.map((sub) => (
                                <div className="channelvid" key={sub.id}>
                                    <div className="channelvidimg">
                                        <NavLink to='/'>
                                            <img src={sub.image ? sub.image : author} />
                                        </NavLink>
                                    </div>
                                    <div className="channelviddetail">
                                        <label>{sub.name}</label>
                                        <span>{sub.subs} subscribers</span>
                                        <button className="subscribed">Subscribed</button>
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
                    {subs.map((sub) => (
                        <div className="channelvid" key={sub.id}>
                            <div className="channelvidimg">
                                <NavLink to='/'>
                                    <img src={sub.image ? sub.image : author}  />
                                </NavLink>
                            </div>
                            <div className="channelviddetail">
                                <label>{sub.name}</label>
                                <span>{sub.subs} subscribers</span>
                                <button className="subscribed">Subscribed</button>
                            </div>
                        </div>
                    ))}
                    </>
                    )}
                                        
                    </>
                    ):(
                        <label>No Subscriptions</label>
                    )}
                </div>
            </div>
        </>
    )
}