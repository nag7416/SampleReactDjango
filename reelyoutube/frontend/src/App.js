import './App.css';
import './style.css';
import './assets/script.js';
import Home from './pages/Home';
import Explore from './pages/Explore';
import {Routes, Route} from 'react-router-dom';
import Subscriptions from './pages/Subscriptions';
import Library from './pages/Library';
import VideoDetail from './pages/VideoDetail';
import HiddenSideBar from './components/HiddenSideBar';
import Search from './pages/Search';
import History from './pages/History';
import ChannelHome from './components/channel/ChannelHome';
import ChannelVideos from './components/channel/ChannelVideos';
import ChannelAbout from './components/channel/ChannelAbout';
import { useEffect, useState } from 'react';
import AuthorChannelHome from './components/authorchannel/AuthorChannelHome';
import AuthorChannelVideos from './components/authorchannel/AuthorChannelVideos';
import AuthorChannelAbout from './components/authorchannel/AuthorChannelAbout';
import WatchLaterVideos from './pages/WatchLaterVideos';
import LikedVideos from './pages/LikedVideos';
import ChannelChannels from './components/channel/ChannelChannels';
import StudioHome from './components/studio/StudioHome';
import StudioContent from './components/studio/StudioContent';
import Channel from './components/channel/Channel.js';
import LikedVideosDetail from './pages/LikedVideosDetail.js';
import StudioAnalytics from './components/studio/StudioAnalytics.js';
import StudioComments from './components/studio/StudioComments.js';
import StudioSubtitles from './components/studio/StudioSubtitles.js';
import StudioCopyright from './components/studio/StudioCopyright.js';



function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [subdata, setSubData] = useState([]);

  useEffect(() => {
        fetch(`http://localhost:8000/api/get_user_data`, {
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
            setUserInfo(data.user);
            setSubData(data.user.subscribers);
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });
  }, [])
  return (
    <>
    <HiddenSideBar subdata={subdata} />
      <Routes>
        <Route exact path='/' element={<Home userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/watch/:videoId' element={<VideoDetail userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/feed/explore' element={<Explore userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/feed/subscriptions' element={<Subscriptions userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/feed/library' element={<Library userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/feed/history' element={<History userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/feed/playlist/list=WL' element={<WatchLaterVideos userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/feed/playlist/list=LL' element={<LikedVideos userInfo={userInfo} subdata={subdata} />}></Route>

        {/* <Route exact path='/watch/:videoId/list=LL/index=:index' element={<LikedVideosDetail userInfo={userInfo} subdata={subdata} />}></Route> */}

        <Route exact path='/search' element={<Search userInfo={userInfo} subdata={subdata} />}></Route>
        
        <Route exact path='/c/:channelslug' element={<Channel userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/c/:channelslug/videos' element={<Channel userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/c/:channelslug/channels' element={<Channel userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/c/:channelslug/playlists' element={<Channel userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/c/:channelslug/about' element={<Channel userInfo={userInfo} subdata={subdata} />}></Route>


        <Route exact path='/:authorslug' element={<AuthorChannelHome userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/:authorslug/videos' element={<AuthorChannelVideos userInfo={userInfo} subdata={subdata} />}></Route>
        <Route exact path='/:authorslug/about' element={<AuthorChannelAbout userInfo={userInfo} subdata={subdata} />}></Route>

        <Route exact path='/studio/:channelslug' element={<StudioHome userInfo={userInfo} />}></Route>
        <Route exact path='/studio/:channelslug/videos' element={<StudioContent userInfo={userInfo} />}></Route>
        <Route exact path='/studio/:channelslug/analytics' element={<StudioAnalytics userInfo={userInfo} />}></Route>
        <Route exact path='/studio/:channelslug/comments' element={<StudioComments userInfo={userInfo} />}></Route>
        <Route exact path='/studio/:channelslug/subtitles' element={<StudioSubtitles userInfo={userInfo} />}></Route>
        <Route exact path='/studio/:channelslug/copyright' element={<StudioCopyright userInfo={userInfo} />}></Route>
      </Routes>
    </>
  );
}

export default App;
