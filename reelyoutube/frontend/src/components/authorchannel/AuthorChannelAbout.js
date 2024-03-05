import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Side from "../Side";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import AuthorChannel from "./AuthorChannel";
import { NavLink } from "react-router-dom";
// import thumbnail from '../../assets/thumbnail.webp';
import { Helmet } from "react-helmet";

function AuthorChannelAbout({ userInfo, subdata }){
    const [authorInfo, setAuthorInfo] = useState([]);
    const [videos, setVideos] = useState([]);
    const { authorslug } = useParams();
    const authorslu = authorslug.replace('@', '');

    const onDataReceivedFromChild = (data) => {
        setAuthorInfo(data.author_data[0]);
        setVideos(data.videos_data);
    }

    useEffect(() => {

    }, [authorslu, videos])

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
                            <div className="channelvideoscon-inner">
                                <div className="description">
                                    <div className="desc-left">
                                        <div className="descript">
                                            <label>Description</label>
                                            <p>{authorInfo.description}</p>
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
                                        <span>Joined {authorInfo.joined}</span>
                                        <div className="line"></div>
                                        <span>{authorInfo.totalviews} views</span>
                                        <div className="line"></div>
                                        <button>
                                            <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AuthorChannelAbout;