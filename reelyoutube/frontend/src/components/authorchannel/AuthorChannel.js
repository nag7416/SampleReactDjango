
import { useEffect, useState } from 'react';
import logo from '../../assets/author.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function AuthorChannel({ userInfo, authorslug, onDataReceived }){
    const [authorInfo, setAuthorInfo] = useState([]);
    const [subscribed, setSubScribed] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const isHomePage = location.pathname === `/@${authorslug}`;
    const isVideoPage = location.pathname === `/@${authorslug}/videos`;
    const isAboutPage = location.pathname === `/@${authorslug}/about`;

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
        fetch(`http://localhost:8000/api/${authorslug}`, {
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
            setAuthorInfo(data.author_data[0]);
            setSubScribed(data.author_data[0].user_liked);
            onDataReceived(data);
        })
    }, [authorslug])

    return (
        <>
                <div className="channelinner">
                    <div className="banner-visible-area" style={{backgroundImage: `url(${authorInfo.channelbanner})`}}>
                        
                    </div>
                    <div className="channel-container">
                        <div className="channel-header">
                            <div className="channel-header-container">
                                <div className="channel-img">
                                    <img alt='s' src={authorInfo.channelimg ? authorInfo.channelimg : logo} />
                                </div>
                                <div className="inner-header-container">
                                    <div className="meta">
                                        <div className="channel-name">
                                            <div className="channel-name-inner">
                                                <h4>{authorInfo.channelname}</h4>
                                            </div>
                                        </div>
                                        <div className="channel-info">
                                            <span>@{authorInfo.channelslug}</span>
                                            <span>{authorInfo.subscribers} subscribers</span>
                                            <span>{authorInfo.videoslength} videos</span>
                                        </div>
                                        <div className="channel-tagline">
                                            <div className="channel-tagline-render">
                                                <NavLink to={`/@${authorslug}/about`}>
                                                    <div className="wrapper">
                                                        <div className="content">
                                                            {authorInfo.description}
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
                                                <NavLink to={`/@${authorslug}/about`}>
                                                    youtube.com
                                                </NavLink>
                                                and more
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        
                                        {authorInfo.user === userInfo.username ? (
                                            <div className="subscribe-button">
                                                <button>Manage videos</button>
                                            </div>
                                        ):(
                                            <>
                                                {subscribed ? (
                                                    <>
                                                        <div className="subscribed-button">
                                                            <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z"></path></svg>
                                                            <button>Subscribed</button>
                                                        </div>
                                                        <div className="subscribed-button">
                                                            <button>Join</button>
                                                        </div>
                                                    </>
                                                ):(
                                                    <div className="subscribe-button">
                                                        <button>Subscribe</button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sticky-buttons sticky">
                            <div className="links">
                                <ul>
                                    <li>
                                        <NavLink to={`/@${authorslug}`}>
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
                                        <NavLink to={`/@${authorslug}/videos`}>
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
                                        <NavLink to='/'>
                                            <button>
                                                Channels
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/'>
                                            <button>
                                                Playlists
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/'>
                                            <button>
                                                community
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`/@${authorslug}/about`}>
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
        </>
    )
}
