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

function ChannelAbout({ userInfo, subdata }){
    const [isLoading, setIsLoading] = useState(true);   
    const [requestuserinfo, setRequestUserInfo] = useState([]);

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
            setRequestUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });
    }, []);


    return (
        <>

            <LoadingBar color="#ff0000" height={1.5} progress={isLoading ? 30 : 100} />

            <div className="channelvideoscon">
                <div className="channelvideoscon-inner">
                    <div className="description">
                        <div className="desc-left">
                            <div className="descript">
                                <label>Description</label>
                                <p>{requestuserinfo.description ? requestuserinfo.description : "No Bio"}</p>
                            </div>
                            <div className="descdetails">
                                <label>Details</label>
                                <div>
                                    <span>For business enquiries: <a href="#">hew@gmail.com</a></span>
                                    <span>Location: <label>India</label></span>
                                </div>
                            </div>
                            <div className="descdetails">
                                <label>Links</label>
                                <div>
                                    <span>Facebook: <label>hew@gmail.com</label></span>
                                    <span>Twitter: <label>India</label></span>
                                </div>
                            </div>
                        </div>
                        <div className="desc-right">
                            <label>Stats</label>
                            <div className="line"></div>
                            <span>Joined {requestuserinfo.joined}</span>
                            <div className="line"></div>
                            <span>{requestuserinfo.total_views ? requestuserinfo.total_views : "0"} views</span>
                            <div className="line"></div>
                            <button>
                                <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChannelAbout;