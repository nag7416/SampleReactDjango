import { useEffect, useState } from 'react';
import logo from '../../assets/author.png';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Side from '../Side';
import Sidebar from '../Sidebar';
import thumbnail from '../../assets/placeholder.jpg';
import ChannelHome from './ChannelHome';
import { Helmet } from 'react-helmet';
import ChannelVideos from './ChannelVideos';
import ChannelPlaylists from './ChannelPlaylists';
import ChannelChannels from './ChannelChannels';
import ChannelAbout from './ChannelAbout';

export default function Channel({ subdata, userInfo }){
    const [requestUserInfo, setrequestUserInfo] = useState([]);
    const [videos, setVideos] = useState([]);
    const [delayedLoading, setDelayedLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { channelslug } = useParams();

    const channelslu = channelslug.replace('@', '');

    const isHomePage = location.pathname === `/c/@${channelslu}`;
    const isVideoPage = location.pathname === `/c/@${channelslu}/videos`;
    const isChannelPage = location.pathname === `/c/@${channelslu}/channels`;
    const isPlaylistPage = location.pathname === `/c/@${channelslu}/playlists`;
    const isAboutPage = location.pathname === `/c/@${channelslu}/about`;

    const mousewheel = () => {
        var container = document.querySelector('.sticky-buttons .links');
        if(container){
            container.addEventListener('wheel', function(e){
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            })
        }
    }
    mousewheel();

    useEffect(() => {
        fetch(`http://localhost:8000/api/user_channel_json/${channelslu}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                navigate('/');
                throw new Error('Failed to fetch user info');
            }
        })
        .then(data => {
            setrequestUserInfo(data);
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });
    }, [channelslu, navigate])

    return (
        <>
            
            <Helmet>
                {requestUserInfo ? (
                    <title>{requestUserInfo.name ? `${requestUserInfo.name} - YouTube` : 'YouTube'}</title>
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
                        <div className="channelinner">
                            <div className="banner-visible-area" style={{backgroundImage: `url(${requestUserInfo.banner})`}}>
                                
                            </div>
                            <div className="channel-container">
                                <div className="channel-header">
                                    <div className="channel-header-container">
                                        <div className="channel-img">
                                            <img alt='s' src={requestUserInfo.image ? requestUserInfo.image : logo} />
                                        </div>
                                        <div className="inner-header-container">
                                            <div className="meta">
                                                <div className="channel-name">
                                                    <div className="channel-name-inner">
                                                        <h4>{requestUserInfo.name ? requestUserInfo.name : 'Loading...'}</h4>
                                                    </div>
                                                </div>
                                                <div className="channel-info">
                                                    <span>@{requestUserInfo.slug ? requestUserInfo.slug : 'Loading...'}</span>
                                                    <span>{requestUserInfo.subscribers ? requestUserInfo.subscribers : "0"} subscribers</span>
                                                    <span>{requestUserInfo.videoslength ? requestUserInfo.videoslength : "0"} videos</span>
                                                </div>
                                                <div className="channel-tagline">
                                                    <div className="channel-tagline-render">
                                                        <NavLink to={`/c/@${channelslu}/about`}>
                                                            <div className="wrapper">
                                                                <div className="content">
                                                                    {requestUserInfo.description ? requestUserInfo.description : "Loading..."}
                                                                </div>
                                                                <div className="more-item">
                                                                    <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path></svg>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                                <div className="channel-header-links">
                                                    <div className="channel-header-links-inner">
                                                        <NavLink to={`/c/@${channelslu}/about`}>
                                                            youtube.com
                                                        </NavLink>
                                                        and more
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="buttons">
                                                <div className="subscribe-button">
                                                    <button>Manage videos</button>
                                                </div>
                                                {/* <div className="subscribe-button">
                                                    <button>Subscribe</button>
                                                </div> */}
                                                {/* <div className="subscribed-button">
                                                    <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z"></path></svg>
                                                    <button>Subscribed</button>
                                                </div>
                                                <div className="subscribed-button">
                                                    <button>Join</button>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sticky-buttons sticky">
                                    <div className="links">
                                        <ul>
                                            <li>
                                                <NavLink to={`/c/@${channelslu}`}>
                                                    {isHomePage ? (
                                                        <button className="home active">
                                                            Home
                                                        </button>
                                                    ):(
                                                        <button className="home">
                                                            Home
                                                        </button>
                                                    )}
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={`/c/@${channelslu}/videos`}>
                                                    {isVideoPage ? (
                                                        <button className='active'>
                                                            Videos
                                                        </button>
                                                    ):(
                                                        <button>
                                                            Videos
                                                        </button>
                                                    )}
                                                    
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/'>
                                                    <button>
                                                        Live
                                                    </button>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={`/c/@${channelslu}/channels`}>
                                                    {isChannelPage ? (
                                                        <button className='active'>
                                                            Channels
                                                        </button>
                                                    ):(
                                                        <button>
                                                            Channels
                                                        </button>
                                                    )}
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={`/c/@${channelslu}/playlists`}>
                                                    {isPlaylistPage ? (
                                                        <button className='active'>
                                                            Playlists
                                                        </button>
                                                    ):(
                                                        <button>
                                                            Playlists
                                                        </button>
                                                    )}
                                                </NavLink>
                                            </li>
                                            {requestUserInfo.subscribers >= 1000 ? (
                                                <li>
                                                    <NavLink to='/'>
                                                        <button>
                                                            community
                                                        </button>
                                                    </NavLink>
                                                </li>
                                            ):(
                                                <></>
                                            )}
                                            
                                            <li>
                                                <NavLink to={`/c/@${channelslu}/about`}>
                                                    {isAboutPage ? (
                                                        <button className="about active">
                                                            about
                                                        </button>
                                                    ):(
                                                        <button className="about">
                                                            about
                                                        </button>
                                                    )}
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isHomePage ? (
                            <ChannelHome />
                        ):(
                            <></>
                        )}
                        {isVideoPage ? (
                            <ChannelVideos />
                        ):(
                            <></>
                        )}
                        {isChannelPage ? (
                            <ChannelChannels />
                        ):(
                            <></>
                        )}
                        {isPlaylistPage ? (
                            <ChannelPlaylists />
                        ):(
                            <></>
                        )}
                        {isAboutPage ? (
                            <ChannelAbout />
                        ):(
                            <></>
                        )}
                        
                    </div>
                </div>
            </div>
        </>
    )
}
