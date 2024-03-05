import { useEffect } from 'react';
import author from '../../../assets/author.png';
import { NavLink } from 'react-router-dom';

export default function StudioNav({ userInfo }){

    const toggleSideBar = () => {
        var studioside = document.querySelector('.main .studioside');
        var studioscroll = document.querySelector('.main .studioscroll');

        studioside.classList.toggle('active');
        studioscroll.classList.toggle('active');
    }

    const updateClass = () => {
        var studioside = document.querySelector('.main .studioside');
        var studioscroll = document.querySelector('.main .studioscroll');
        const windowWidth = window.innerWidth;


        if (windowWidth < 900) {
            studioside.classList.add('active');
            studioscroll.classList.add('active');
        }
        if (windowWidth > 900) {
            studioside.classList.remove('active');
            studioscroll.classList.remove('active');
        }
    }

    useEffect(() => {
        updateClass();
    })
    

    return (
        <>
            <div className="nav navbar">
                <div className="inner">
                    <div className="left">
                        <div className="menu">
                            <button id="menu" onClick={toggleSideBar}>
                                <svg style={{width: '24px'}} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope tp-yt-iron-icon"><g className="style-scope tp-yt-iron-icon"><path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z" className="style-scope tp-yt-iron-icon"></path></g></svg>
                            </button>
                        </div>
                        <div className="logo">
                            <NavLink to={`/studio/${userInfo.channelslug}`}>
                                <img alt="s" src="https://www.gstatic.com/youtube/img/creator/yt_studio_logo.svg" />
                            </NavLink>
                        </div>
                    </div>
                    <div className="center">
                        <div className="searchlayer">
                            <form action="#">
                                <input type="search" placeholder="Search across your channel" />
                            </form>
                        </div>
                    </div>
                    <div className="right">
                        <div className="links">
                            <div className="box help">
                                <button>
                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope tp-yt-iron-icon"><g className="style-scope tp-yt-iron-icon"><path d="M15.36,9.96c0,1.09-0.67,1.67-1.31,2.24c-0.53,0.47-1.03,0.9-1.16,1.6L12.85,14h-1.75l0.03-0.28 c0.14-1.17,0.8-1.76,1.47-2.27c0.52-0.4,1.01-0.77,1.01-1.49c0-0.51-0.23-0.97-0.63-1.29c-0.4-0.31-0.92-0.42-1.42-0.29 c-0.59,0.15-1.05,0.67-1.19,1.34L10.32,10H8.57l0.06-0.42c0.2-1.4,1.15-2.53,2.42-2.87c1.05-0.29,2.14-0.08,2.98,0.57 C14.88,7.92,15.36,8.9,15.36,9.96z M12,18c0.55,0,1-0.45,1-1s-0.45-1-1-1s-1,0.45-1,1S11.45,18,12,18z M12,3c-4.96,0-9,4.04-9,9 s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z" className="style-scope tp-yt-iron-icon"></path></g></svg>
                                </button>
                            </div>
                            <div className="box create">
                                <button>
                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope tp-yt-iron-icon"><g className="style-scope tp-yt-iron-icon"><path d="M14,13h-3v3H9v-3H6v-2h3V8h2v3h3V13z M17,6H3v12h14v-6.39l4,1.83V8.56l-4,1.83V6 M18,5v3.83L22,7v8l-4-1.83V19H2V5H18L18,5 z" className="style-scope tp-yt-iron-icon"></path></g></svg>
                                    <div className="createlabel">Create</div>
                                </button>
                            </div>
                            <div className="box img">
                                <button>
                                    <img alt="s" src={userInfo.channelimage ? userInfo.channelimage : author} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}