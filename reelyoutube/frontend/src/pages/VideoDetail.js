import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import { useLocation, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import thumbnail from '../../src/assets/placeholder.jpg';
import LikedVideosComponent from '../components/LikedVideosComponent';
import WatchLaterVideosComponent from '../components/WatchLaterVideosComponent';
import VideoPlayer from '../components/VideoPlayer';
import LazyImage from './LazyImage';
import '../../src/player.css';
import '../../src/player.js';

function VideoDetail({ userInfo }) {
    const [video, setVideo] = useState({});
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [likes, setLiked] = useState(null);
    const [subscribe, setSubscribe] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { videoId } = useParams();
    const [commentcount, setCommentCount] = useState(0);
    const commentInputRef = useRef(null);

    const location = useLocation();
    const parameter = new URLSearchParams(location.search).get('list');
    const index = new URLSearchParams(location.search).get('index');



    const axiosInstance = axios.create({
        withCredentials: true,
    });

    const handleLikeToggle = () => {
        axiosInstance.put(`http://localhost:8000/api/${videoId}/toggle_like`)
        .then((response) => {
            const data = response.data;
            setLiked(data.liked);
            if(data.liked === true){
                document.querySelector('.likedislike .like button label').innerHTML++;
            } else if(data.liked === false) {
                document.querySelector('.likedislike .like button label').innerHTML--;
            }
        })
        .catch((error) => {
            console.log('error: ', error);
        })
    }
    const handleSubscribeToggle = () => {
        axiosInstance.put(`http://localhost:8000/api/${video.channelsl}/toggle_subscribe`)
        .then((response) => {
            const data = response.data;
            setSubscribe(data.subscribed);
            if(data.subscribed === true){
                document.querySelector('.video-container .left .metadata .toprow .owner .ownerleft .uploadinfo label #subcount').innerHTML++;
            } else if(data.subscribed === false){
                document.querySelector('.video-container .left .metadata .toprow .owner .ownerleft .uploadinfo label #subcount').innerHTML--;
            }
        })
        .catch((error) => {
            console.log('error: ', error);
        })
    }


    window.onload = function(){
        var showmore = document.querySelector('.descinner button');
        showmore.innerHTML = 'more';
    }
    function handleOpen(){
        const descinner = document.querySelector('.descinner');
        const showmore = document.querySelector('.descinner button');

        descinner.classList.toggle('active');
        
        if(showmore.innerHTML === 'more'){
            showmore.innerHTML = 'less';
        } else {
            showmore.innerHTML = 'more';
        }
    }
    function openPostingCon(){
        var postingcon = document.querySelector('.posting');

        postingcon.style.display = 'flex';
    }
    function closePostingCon(){
        var postingcon = document.querySelector('.posting');

        postingcon.style.display = 'none';
    }
    function enableDisableBtn(){
        var commentbtn = document.querySelector('.posting button.comment');
        var commentinput = document.querySelector('.commentcon form input');

        if(commentinput.value.trim() === ''){ // Check if the input value is empty or contains only whitespace
            commentbtn.setAttribute('disabled', true);
            commentbtn.setAttribute('style', ''); // Reset any inline styles
        } else {
            commentbtn.removeAttribute('disabled');
            commentbtn.setAttribute('style', 'background: dodgerblue; color: white;');
        }
    }


    const loadComments = () => {
        fetch(`http://localhost:8000/api/${videoId}/comments`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if(response.status === 200){
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
                return response.json();
            } else {
                throw new Error('failed to fetch the comments');
            }
        })
        .then(res => {
            setComments(res);
            setCommentCount(res.length);
        })
    }

    useEffect(() => {
        const videoid = videoId;

        axiosInstance.get(`http://localhost:8000/api/get_video/${videoid}`)
        .then(response => {
            setIsLoading(false);
            setVideo(response.data.video_data);
            setLiked(response.data.user_liked);
            setSubscribe(response.data.user_subscribed);
            
        })
        .catch(error => {
            console.error('Error fetching video details:', error);
            setIsLoading(false);
        });
      
        axiosInstance.get(`http://localhost:8000/api/explore`)
        .then(response => {
            setIsLoading(false);
            setVideos(response.data.video_list);
        })
        .catch(error => {
            console.log('error fetching videos', error);
            setIsLoading(false);
        })


        loadComments();

    }, [videoId]);


    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if(commentText.trim() !== ''){
            setIsSubmitting(true);



            try {
                const rootElement = document.getElementById('root');
                const csrfToken = rootElement.getAttribute('data-csrf');

                fetch(`http://localhost:8000/api/${videoId}/post_comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    },
                    credentials: 'include',
                    body: JSON.stringify({ comment_body: commentText }),
                })
                .then(response => response.json())
                .then(data => {
                    loadComments();
                    commentInputRef.current.focus();
                })
            }
            catch (error) {
                console.log('error posting comment', error);
            } finally {
                setIsSubmitting(false);
                setCommentText('');
            }
        }
    }


    


    return (
        <>
            <Helmet>
            <title>{video.title ? `${video.title} - YouTube` : 'YouTube'}</title>
            </Helmet>

            <LoadingBar
                color="#ff0000" // Customize the color (e.g., red)
                height={1.5}       // Customize the height (4 pixels)
                progress={isLoading ? 30 : 100} // Set progress based on loading state
            />


            <Navbar userInfo={userInfo} />
            <div className="main">
                <div className="main-scroll" style={{width: '100%'}}>
                    <div className='inner'>
                        <div className="video-container">
                            <div className="left">
                                <div className="videocon">
                                    {/* <video src={video.video} autoPlay loop muted controls></video> */}
                                    <VideoPlayer url={video.video} />
                                </div>
                                <div className="metadata">
                                    <div className="abovefold">
                                        <div className="title">
                                            <h1>{video.title}</h1>
                                        </div>
                                        <div className="toprow">
                                            <div className="owner">
                                                <div className="ownerleft">
                                                    <NavLink to={`/@${video.channelsl}`}>
                                                        <div className="ownerimg">
                                                            <img alt='s' src={video.authorimg} />
                                                        </div>
                                                    </NavLink>
                                                    <div className="uploadinfo">
                                                        <div className="channelname">
                                                            <NavLink to={`/@${video.channelsl}`}>
                                                                {video.author}
                                                            </NavLink>
                                                        </div>
                                                        <label><label id='subcount'>{video.authorsubs}</label> subscribers</label>
                                                    </div>
                                                    
                                                </div>
                                                <div className="ownerright">
                                                    <div className="subscribe">
                                                        {userInfo.channeluser === video.author ? (
                                                            <button className="subscribe">Analytics</button>
                                                        ):(
                                                            <>
                                                                    {subscribe ? (
                                                                        <>
                                                                            <button className="subscribed" onClick={handleSubscribeToggle}>
                                                                                <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87zm-1 .42-2-1.88v-5.47c0-2.47-1.19-4.36-3.13-5.1-1.26-.53-2.64-.5-3.84.03C8.15 6.11 7 7.99 7 10.42v5.47l-2 1.88V18h14v-.23z"></path></svg>
                                                                                Subscribed
                                                                            </button>
                                                                        </>
                                                                    ):(
                                                                        <button className='subscribe' onClick={handleSubscribeToggle}>
                                                                            Subscribe
                                                                        </button>
                                                                    )}
                                                                
                                                            </>
                                                        )}
                                                        
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="actions">
                                                <div className="actionsinner">
                                                    <div id="menu">
                                                        <div className="toplevel">
                                                            <div className="likedislike">
                                                                <div className="like">
                                                                    <button onClick={handleLikeToggle}>
                                                                        {likes ? (
                                                                            <>
                                                                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z" className="style-scope yt-icon"></path></g></svg>
                                                                            </>
                                                                        ): (
                                                                            <>
                                                                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" className="style-scope yt-icon"></path></g></svg>
                                                                            </>
                                                                        )}                                                                 
                                                                        
                                                                        <label>{video.liked}</label>
                                                                    </button>
                                                                </div>
                                                                <div className="dislike">
                                                                    <button>
                                                                        <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="likedislike share">
                                                                <div className="like">
                                                                    <button>
                                                                        <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"></path></svg>
                                                                        <label>Share</label>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            

                                                        </div>
                                                        <div className="flexible-item one">
                                                            <div className="likedislike download">
                                                                <div className="like">
                                                                    <button>
                                                                        <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path></svg>
                                                                        <label>Download</label>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flexible-item two">
                                                            <div className="likedislike opt">
                                                                <div className="like">
                                                                    <button>
                                                                        <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bottomrow">
                                            <div className="description">
                                                <div className="descinner" onClick={handleOpen}>
                                                    <div className="info-container">
                                                        <div className="info">
                                                            <span>{video.views} views &bull;</span>
                                                            <span>{video.published}</span>
                                                        </div>
                                                    </div>
                                                    <div className="description-inline" dangerouslySetInnerHTML={{ __html: video.description}}>
                                                        {/* <p dangerouslySetInnerHTML={video.description}></p> */}
                                                    </div>
                                                    <button>More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="header">
                                    <div className="headertitle">
                                        <h2>
                                            <span>{commentcount}</span> <span>comments</span>
                                        </h2>
                                    </div>
                                    <div className="simplebox">
                                        <div className="simpleboxinner">
                                            <div className="commentbox">
                                                <div className="inputrow">
                                                    <div className="imgshow">
                                                        <img alt='s' src={userInfo.channelimage} />
                                                    </div>
                                                    <div className="commentcon">
                                                        <form onSubmit={handleCommentSubmit}>
                                                            <input name='comment_body' type="text" placeholder="Add a comment" autoComplete='off' onFocus={openPostingCon} onInput={enableDisableBtn} value={commentText} onChange={(e) => setCommentText(e.target.value)} disabled={isSubmitting} autoFocus ref={commentInputRef} />
                                                            <span></span>
                                                            <div className="posting">
                                                                <NavLink onClick={closePostingCon}>Cancel</NavLink>
                                                                <button className="comment" disabled>Comment</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="publiccomments" style={{marginTop: '15px'}}>
                                        {comments && comments.length > 0 ? (
                                            <>
                                                {comments.map(comment => (
                                                    <div className="simplebox" key={comment.comment_id} style={{marginBottom: '15px'}}>
                                                        <div className="simpleboxinner">
                                                            <div className="commentbox">
                                                                <div className="inputrow">
                                                                    <div className="imgshow">
                                                                        <img src={comment.commenter_image} alt='1'/>
                                                                    </div>
                                                                    <div className="commentcon">
                                                                        <div className="commentdetail">
                                                                            <div className="authortop">
                                                                                <NavLink to='/'>@{comment.comment_user}</NavLink>   
                                                                                <label> &nbsp;&bull;&nbsp;{comment.commented_on}</label>
                                                                            </div>
                                                                            <p>{comment.comment_body}</p>
                                                                            <div className="authorbottom">
                                                                                <div className="like">
                                                                                    <button className="likebtn">
                                                                                        <svg width="24px" height="24px" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon"><g className="style-scope yt-icon"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z" className="style-scope yt-icon"></path></g></svg>
                                                                                    </button>
                                                                                    <label></label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="actionsmenu">
                                                                        <button>
                                                                            <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
                                                                        </button>
                                                                        
                                                                        <div className="options">
                                                                            <ul>
                                                                                <li>
                                                                                    <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path></svg>
                                                                                    <label>Report</label>
                                                                                </li>
                                                                                <li>
                                                                                    <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m14.06 7.6 2.34 2.34L6.34 20H4v-2.34L14.06 7.6m0-1.41L3 17.25V21h3.75L17.81 9.94l-3.75-3.75zm3.55-2.14 2.37 2.37-1.14 1.14-2.37-2.37 1.14-1.14m0-1.42-2.55 2.55 3.79 3.79 2.55-2.55-3.79-3.79z"></path></svg>
                                                                                    <label>Edit</label>                                                          
                                                                                </li>
                                                                                <li>
                                                                                    <svg height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z"></path></svg>
                                                                                    <label>Delete</label>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ):(
                                            <label style={{width: '100%', textAlign: 'center', marginBottom: '20px'}}>No Comments</label>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="rightinner">
                                    {parameter === 'LL' ? (
                                        <LikedVideosComponent userInfo={userInfo} index={index} parameter={parameter} videoId={videoId} />
                                    ):(
                                        <></>
                                    )}
                                    {parameter === 'WL' ? (
                                        <WatchLaterVideosComponent userInfo={userInfo} index={index} parameter={parameter} videoId={videoId} />
                                    ):(
                                        <></>
                                    )}
                                    <div className="items">
                                        {isLoading ? (
                                            <></>
                                        ):(
                                            <>
                                                {videos.map((video) => (
                                                    <div key={video.id}>
                                                        {video.id === videoId ? (
                                                            <div key={video.id} className="item" style={{background: '#e8e6e6', borderRadius: '8px'}}>
                                                                <div className="item-img">
                                                                    <label>{video.duration}</label>
                                                                    <NavLink to={`/watch/${video.id}`}>
                                                                        <LazyImage src={thumbnail} data-real-src={video.image} alt={video.id} />
                                                                    </NavLink>
                                                                </div>
                                                                <div className="item-detail">
                                                                    <div className="item-detail-inner">
                                                                        <h3>
                                                                            <NavLink to={`/watch/${video.id}`}>
                                                                                {video.title}
                                                                            </NavLink>
                                                                        </h3>
                                                                        <NavLink to={`/@${video.authorslug}`}>{video.author}</NavLink>
                                                                        <span>
                                                                            <label>{video.views} views &nbsp;&bull;&nbsp;</label>
                                                                            <label>{video.published}</label>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ):(
                                                            <div key={video.id} className="item">
                                                                <div className="item-img">
                                                                    <label>{video.duration}</label>
                                                                    <NavLink to={`/watch/${video.id}`}>
                                                                        <LazyImage src={thumbnail} data-real-src={video.image} alt={video.id} />
                                                                    </NavLink>
                                                                </div>
                                                                <div className="item-detail">
                                                                    <div className="item-detail-inner">
                                                                        <h3>
                                                                            <NavLink to={`/watch/${video.id}`}>
                                                                                {video.title}
                                                                            </NavLink>    
                                                                        </h3>
                                                                        <NavLink to={`/@${video.authorslug}`}>{video.author}</NavLink>
                                                                        <span>
                                                                            <label>{video.views} views &nbsp;&bull;&nbsp;</label>
                                                                            <label>{video.published}</label>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </>
                                        )}
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

export default VideoDetail;