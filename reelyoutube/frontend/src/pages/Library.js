import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Side from "../components/Side";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import LoadingBar from 'react-top-loading-bar';
import NoInternetPage from "./NoInternetPage";
import { NavLink } from "react-router-dom";
import thumbnail from '../assets/placeholder.jpg';
import LazyImage from "./LazyImage";


function Library({ userInfo, subdata }){
    const [isLoading, setIsLoading] = useState(true);
    const [historyvideos, setHistoryVideos] = useState([]);
    const [likedvideos, setLikedVideos] = useState([]);
    const [watchlater, setWatchLater] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {

        const fetchHistory = () => {

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
                setWatchLater(data.watchlater);
                setLikedVideos(data.liked);
                setPlaylists(data.playlists);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.error('Error fetching user info:', error);
            });
        }
        fetchHistory();


        



        const handleOnlineStatusChange = () => {
            setIsOnline(navigator.onLine);
            fetchHistory();
        };
        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);
        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
        





    }, [])


    return (
        <>
            <Helmet>
                <title>Library - YouTube</title>
            </Helmet>

            <LoadingBar
                color="#ff0000" // Customize the color (e.g., red)
                height={1.5}       // Customize the height (4 pixels)
                progress={isLoading ? 30 : 100} // Set progress based on loading state
            />

            <Navbar userInfo={userInfo} />
            <div className="main">
                <Side />
                <Sidebar userInfo={userInfo} subdata={subdata} />
                <div className="main-scroll" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {isOnline ? (
                        <>
                            {/* <h2 style={{padding: '20px 20px 0px 20px'}}>Library</h2> */}
                            <div className="inner" style={{maxWidth: '1100px', width: '95%'}}>
                                {isLoading ? (
                                    <label>Loading...</label>
                                ):(
                                    <>
                                        <div className="subcon">
                                            <div className="heading" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <label style={{width: 'auto', marginBottom: '15px'}}>
                                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z" className="style-scope yt-icon"></path></g></svg>
                                                    History
                                                </label>
                                            </div>
                                            <div className="subinner">
                                                {historyvideos.length <= 4 ? (
                                                    <>
                                                        {historyvideos.map((hvideo) => (
                                                            <div className="subpost" key={hvideo.id}>
                                                                <NavLink to='/'>
                                                                    <div className="subimg">
                                                                        <LazyImage alt={hvideo.id} src={thumbnail} data-real-src={hvideo.image} />
                                                                        <span>
                                                                            <p>{hvideo.duration}</p>
                                                                        </span>
                                                                    </div>
                                                                    <div className="subdetail">
                                                                        <h4>{hvideo.title}</h4>
                                                                        <div onClick={(e) => navigator('/')}>{hvideo.author}</div>
                                                                        <span>
                                                                            <span>{hvideo.views} views</span> &bull; <span>{hvideo.published}</span>
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </div>
                                                        ))}
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                    </>
                                                ):(
                                                    <>
                                                        {historyvideos.map((hvideo) => (
                                                            <div className="subpost" key={hvideo.id}>
                                                                <NavLink to='/'>
                                                                    <div className="subimg">
                                                                        <LazyImage alt={hvideo.id} src={thumbnail} data-real-src={hvideo.image} />
                                                                        <span>
                                                                            <p>{hvideo.duration}</p>
                                                                        </span>
                                                                    </div>
                                                                    <div className="subdetail">
                                                                        <h4>{hvideo.title}</h4>
                                                                        <div onClick={(e) => navigator('/')}>{hvideo.author}</div>
                                                                        <span>
                                                                            <span>{hvideo.views} views</span> &bull; <span>{hvideo.published}</span>
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                                
                                            </div>
                                        </div>

                                    </>
                                )}
                            </div>
                            <div className="inner" style={{maxWidth: '1100px', width: '95%'}}>
                                {isLoading ? (
                                    <label>Loading...</label>
                                ):(
                                    <>
                                        <div className="subcon">
                                            <div className="heading" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <label style={{width: 'auto', marginBottom: '15px'}}>
                                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z" className="style-scope yt-icon"></path></g></svg>
                                                    Watch Later Videos
                                                </label>
                                            </div>
                                            <div className="subinner">
                                                {watchlater.length <= 4 ? (
                                                    <>
                                                        {watchlater.map((wvideo) => (
                                                            <div className="subpost" key={wvideo.id}>
                                                                <NavLink to={`/watch/${wvideo.id}`}>
                                                                    <div className="subimg">
                                                                        <LazyImage alt={wvideo.id} src={thumbnail} data-real-src={wvideo.image} />
                                                                        <span>
                                                                            <p>{wvideo.duration}</p>
                                                                        </span>
                                                                    </div>
                                                                    <div className="subdetail">
                                                                        <h4>{wvideo.title}</h4>
                                                                        <div onClick={(e) => navigator('/')}>{wvideo.author}</div>
                                                                        <span>
                                                                            <span>{wvideo.views} views</span> &bull; <span>{wvideo.published}</span>
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </div>
                                                        ))}
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                    </>
                                                ):(
                                                    <>
                                                        {watchlater.map((hvideo) => (
                                                            <div className="subpost" key={hvideo.id}>
                                                                <NavLink to={`/watch/${hvideo.id}`}>
                                                                    <div className="subimg">
                                                                        <LazyImage alt={hvideo.id} src={thumbnail} data-real-src={hvideo.image} />
                                                                        <span>
                                                                            <p>{hvideo.duration}</p>
                                                                        </span>
                                                                    </div>
                                                                    <div className="subdetail">
                                                                        <h4>{hvideo.title}</h4>
                                                                        <div onClick={(e) => navigator('/')}>{hvideo.author}</div>
                                                                        <span>
                                                                            <span>{hvideo.views} views</span> &bull; <span>{hvideo.published}</span>
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </div>
                                                        ))}  
                                                    </>
                                                )}
                                                
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="inner" style={{maxWidth: '1100px', width: '95%'}}>
                                {isLoading ? (
                                    <label>Loading...</label>
                                ):(
                                    <>
                                        <div className="subcon">
                                            <div className="heading" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <label style={{width: 'auto', marginBottom: '15px'}}>
                                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z" className="style-scope yt-icon"></path></g></svg>
                                                    Playlists
                                                </label>
                                            </div>
                                            <div className="subinner">
                                                {playlists.length <= 4 ? (
                                                    <>
                                                        {playlists.map((playlist) => (
                                                            <div className="subpost" key={playlist.id}>
                                                                <NavLink to={`/watch/${playlist.id}`}>
                                                                    <div className="subimg">
                                                                        <LazyImage alt={playlist.id} src={thumbnail} data-real-src={playlist.image} />
                                                                        <div className="over">
                                                                            <label>2</label>
                                                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z" className="style-scope yt-icon"></path></g></svg>
                                                                        </div>
                                                                    </div>
                                                                    <div className="subdetail">
                                                                        <h4>{playlist.name}</h4>
                                                                        <div onClick={(e) => navigator('/')}>{playlist.created}</div>
                                                                        <span>
                                                                            <span>{playlist.visibility}</span>
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </div>
                                                        ))}
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                    </>
                                                ):(
                                                    <>
                                                        {playlists.map((hvideo) => (
                                                            <div className="subpost" key={hvideo.id}>
                                                                <NavLink to={`/watch/${hvideo.id}`}>
                                                                    <div className="subimg">
                                                                        <LazyImage alt={hvideo.id} src={thumbnail} data-real-src={hvideo.image} />
                                                                        <span>
                                                                            <p>{hvideo.duration}</p>
                                                                        </span>
                                                                    </div>
                                                                    <div className="subdetail">
                                                                        <h4>{hvideo.title}</h4>
                                                                        <div onClick={(e) => navigator('/')}>{hvideo.author}</div>
                                                                        <span>
                                                                            <span>{hvideo.views} views</span> &bull; <span>{hvideo.published}</span>
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </div>
                                                        ))}  
                                                    </>
                                                )}
                                                
                                            </div>
                                        </div>

                                    </>
                                )}
                            </div>
                            <div className="inner" style={{maxWidth: '1100px', width: '95%'}}>
                                {isLoading ? (
                                    <label>Loading...</label>
                                ):(
                                    <>
                                        <div className="subcon">
                                            <div className="heading" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <label style={{width: 'auto', marginBottom: '15px'}}>
                                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z" className="style-scope yt-icon"></path></g></svg>
                                                    Liked Videos
                                                </label>
                                            </div>
                                            <div className="subinner">
                                                {likedvideos.length <= 4 ? (
                                                    <>
                                                        {likedvideos.map((hvideo) => (
                                                            
                                                                <div className="subpost" key={hvideo.id}>
                                                                    <NavLink to={`/watch/${hvideo.id}`}>
                                                                        <div className="subimg">
                                                                            <LazyImage alt={hvideo.id} src={thumbnail} data-real-src={hvideo.image} />
                                                                            <span>
                                                                                <p>{hvideo.duration}</p>
                                                                            </span>
                                                                        </div>
                                                                        <div className="subdetail">
                                                                            <h4>{hvideo.title}</h4>
                                                                            <div onClick={(e) => navigator('/')}>{hvideo.author}</div>
                                                                            <span>
                                                                                <span>{hvideo.views} views</span> &bull; <span>{hvideo.published}</span>
                                                                            </span>
                                                                        </div>
                                                                    </NavLink>
                                                                </div>
                                                            
                                                            
                                                        ))}
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                        <div className="subpost"></div>
                                                    </>
                                                ):(
                                                    <>
                                                        {likedvideos.map((hvideo) => (
                                                            <div className="subpost" key={hvideo.id}>
                                                                <NavLink to={`/watch/${hvideo.id}`}>
                                                                    <div className="subimg">
                                                                        <LazyImage alt={hvideo.id} src={thumbnail} data-real-src={hvideo.image} />
                                                                        <span>
                                                                            <p>{hvideo.duration}</p>
                                                                        </span>
                                                                    </div>
                                                                    <div className="subdetail">
                                                                        <h4>{hvideo.title}</h4>
                                                                        <div onClick={(e) => navigator('/')}>{hvideo.author}</div>
                                                                        <span>
                                                                            <span>{hvideo.views} views</span> &bull; <span>{hvideo.published}</span>
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </div>
                                                        ))}  
                                                    </>
                                                )}
                                                
                                            </div>
                                        </div>

                                    </>
                                )}
                            </div>
                        </>
                    ):(
                        <NoInternetPage />
                    )}
                
                    
                </div>
            </div>
        </>
    )
}
export default Library;