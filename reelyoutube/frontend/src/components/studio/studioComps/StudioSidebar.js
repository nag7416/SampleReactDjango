import { NavLink, useLocation } from "react-router-dom";
import author from '../../../assets/author.png';

export default function StudioSidebar({ userInfo }){
    const location = useLocation();
    const isStudioHomePage = location.pathname === `/studio/${userInfo.channelslug}`;
    const isStudioContentPage = location.pathname === `/studio/${userInfo.channelslug}/videos`;
    const isStudioAnalyticsPage = location.pathname === `/studio/${userInfo.channelslug}/analytics`;
    const isStudioCommentsPage = location.pathname === `/studio/${userInfo.channelslug}/comments`;
    const isStudioSubtitlesPage = location.pathname === `/studio/${userInfo.channelslug}/subtitles`;
    const isStudioCopyrightPage = location.pathname === `/studio/${userInfo.channelslug}/copyright`;

    return (
        <>
            <div className="studioside">
                <div className="studioinner">
                    <div className="channelimage">
                        <div className="img">
                            <img alt="s" src={userInfo.channelimage ? userInfo.channelimage : author} />
                        </div>
                        <label>Your Channel</label>
                        <span>{userInfo.channeluser ? userInfo.channeluser : "Loading..."}</span>
                    </div>
                    <div className="studiolinks">
                        <ul>
                            {isStudioHomePage ? (
                                <li className="active">
                                    <NavLink to={`/studio/${userInfo.channelslug}`}>
                                        <button>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M11 3H3V13H11V3ZM21 11H13V21H21V11ZM11 15H3V21H11V15ZM13 3V9H21V3H13Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Dashboard</label>
                                        </button>
                                    </NavLink>
                                </li>
                            ):(
                                <li>
                                    <NavLink to={`/studio/${userInfo.channelslug}`}>
                                        <button>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" className="style-scope tp-yt-iron-icon"><path d="M10 16V20H4V16H10ZM11 15H3V21H11V15ZM20 4V8H14V4H20ZM21 3H13V9H21V3ZM3 3V13H11V3H3ZM10 12H4V4H10V12ZM13 11V21H21V11H13ZM20 20H14V12H20V20Z" className="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Dashboard</label>
                                        </button>
                                    </NavLink>
                                </li>
                            )}
                            {isStudioContentPage ? (
                                <li className="active">
                                    <NavLink to={`/studio/${userInfo.channelslug}/videos`}>
                                        <button>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M4 5.99982H3V20.9998H18V19.9998H4V5.99982Z" class="style-scope tp-yt-iron-icon"></path><path d="M6 2.99982V17.9998H21V2.99982H6ZM11 13.9998V6.99982L17 10.4998L11 13.9998Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Content</label>
                                        </button>
                                    </NavLink>
                                </li>
                            ):(
                                <li>
                                    <NavLink to={`/studio/${userInfo.channelslug}/videos`}>
                                        <button>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M11 6.99982V13.9998L17 10.4998L11 6.99982Z" class="style-scope tp-yt-iron-icon"></path><path d="M18 20.9998H3V5.99982H4V19.9998H18V20.9998ZM21 2.99982H6V17.9998H21V2.99982ZM7 3.99982H20V16.9998H7V3.99982Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Content</label>
                                        </button>
                                    </NavLink>
                                </li>
                            )}
                            {isStudioAnalyticsPage ? (
                                <li className="active">
                                    <NavLink to={`/studio/${userInfo.channelslug}/analytics`}>
                                        <button>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M3 3V21H21V3H3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V14H17V17Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Analytics</label>
                                        </button>
                                    </NavLink>
                                </li>
                            ):(
                                <li>
                                    <NavLink to={`/studio/${userInfo.channelslug}/analytics`}>
                                        <button>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M9 17H7V10H9V17ZM13 7H11V17H13V7ZM17 14H15V17H17V14ZM20 4H4V20H20V4ZM21 3V21H3V3H21Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Analytics</label>
                                        </button>
                                    </NavLink>
                                </li>
                            )}
                            {isStudioCommentsPage ? (
                                <li className="active">
                                    <NavLink to={`/studio/${userInfo.channelslug}/comments`}>
                                        <button>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M4 2V17H15L20 22V2H4ZM8 11H13V13H8V11ZM8 7H16V9H8V7Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Comments</label>
                                        </button>
                                    </NavLink>
                                </li>
                            ):(
                                <li>
                                    <NavLink to={`/studio/${userInfo.channelslug}/comments`}>
                                        <button>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M8 7H16V9H8V7ZM8 13H13V11H8V13ZM5 3V16H15H15.41L15.7 16.29L19 19.59V3H5ZM4 2H20V22L15 17H4V2Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Comments</label>
                                        </button>
                                    </NavLink>
                                </li>
                            )}
                            {isStudioSubtitlesPage ? (
                                <li className="active">
                                    <NavLink to={`/studio/${userInfo.channelslug}/subtitles`}>
                                        <button>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M2 6V20H22V6H2ZM5 11H7V13H5V11ZM15 17H5V15H15V17ZM19 17H17V15H19V17ZM19 13H9V11H19V13Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Subtitles</label>
                                        </button>
                                    </NavLink>
                                </li>
                            ):(
                                <li>
                                    <NavLink to={`/studio/${userInfo.channelslug}/subtitles`}>
                                        <button>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M5 11H7V13H5V11ZM15 15H5V17H15V15ZM19 15H17V17H19V15ZM19 11H9V13H19V11ZM22 6H2V20H22V6ZM3 7H21V19H3V7Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Subtitles</label>
                                        </button>
                                    </NavLink>
                                </li>
                            )}
                            {isStudioCopyrightPage ? (
                                <li className="active">
                                    <NavLink to={`/studio/${userInfo.channelslug}/copyright`}>
                                        <button>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.9998C17.5228 21.9998 22 17.5226 22 11.9998C22 6.47691 17.5228 1.99976 12 1.99976C6.47715 1.99976 2 6.47691 2 11.9998C2 17.5226 6.47715 21.9998 12 21.9998ZM10.8399 10.1698C10.7199 10.3998 10.6199 10.6598 10.5699 10.9598C10.5199 11.2598 10.4999 11.5598 10.4799 11.8798V12.1298C10.4799 12.4298 10.5099 12.7398 10.5499 13.0398C10.5899 13.3398 10.6899 13.6098 10.8199 13.8398C10.9499 14.0598 11.1299 14.2498 11.3599 14.3998C11.5699 14.5398 11.8399 14.5998 12.1699 14.6098C12.3599 14.5998 12.5499 14.5798 12.7199 14.5198C12.8999 14.4598 13.0499 14.3698 13.1899 14.2498C13.3299 14.1298 13.4299 13.9998 13.5199 13.8298C13.6099 13.6598 13.6499 13.4898 13.6599 13.2998H15.2899C15.2799 13.6798 15.1799 14.0198 15.0199 14.3498C14.8599 14.6798 14.6299 14.9598 14.3499 15.2098C14.0699 15.4498 13.7399 15.6398 13.3699 15.7798C12.9999 15.9198 12.5999 15.9898 12.1699 15.9898C11.5799 15.9898 11.0599 15.8798 10.6199 15.6798C10.1899 15.4798 9.81992 15.1998 9.52992 14.8498C9.23992 14.4998 9.01992 14.0898 8.87992 13.6198C8.73992 13.1498 8.66992 12.6598 8.66992 12.1298V11.8798C8.66992 11.3598 8.74992 10.8698 8.88992 10.3898C9.02992 9.90976 9.24992 9.49976 9.53992 9.14976C9.82992 8.78976 10.1899 8.51976 10.6299 8.30976C11.0699 8.09976 11.5899 7.99976 12.1799 7.99976C12.6499 7.99976 13.0699 8.05976 13.4399 8.20976C13.8199 8.34976 14.1399 8.55976 14.4199 8.80976C14.6999 9.05976 14.9099 9.36975 15.0599 9.72975C15.2199 10.0898 15.2999 10.4798 15.3199 10.9098H13.6899C13.6799 10.7098 13.6399 10.5098 13.5599 10.3298C13.4799 10.1498 13.3799 9.98976 13.2499 9.84976C13.1299 9.70976 12.9599 9.59976 12.7799 9.51976C12.6099 9.44976 12.4199 9.40976 12.2099 9.39976C11.8699 9.40976 11.5999 9.46976 11.3799 9.60976C11.1499 9.74976 10.9599 9.93976 10.8399 10.1698Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Copyright</label>
                                        </button>
                                    </NavLink>
                                </li>
                            ):(
                                <li>
                                    <NavLink to={`/studio/${userInfo.channelslug}/copyright`}>
                                        <button>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M10.57 10.96C10.62 10.66 10.72 10.4 10.84 10.17C10.96 9.94 11.15 9.75 11.38 9.61C11.6 9.47 11.87 9.41 12.21 9.4C12.42 9.41 12.61 9.45 12.78 9.52C12.96 9.6 13.13 9.71 13.25 9.85C13.38 9.99 13.48 10.15 13.56 10.33C13.64 10.51 13.68 10.71 13.69 10.91L15.32 10.91C15.3 10.48 15.22 10.09 15.06 9.73C14.91 9.37 14.7 9.06 14.42 8.81C14.14 8.56 13.82 8.35 13.44 8.21C13.07 8.06 12.65 8 12.18 8C11.59 8 11.07 8.1 10.63 8.31C10.19 8.52 9.83 8.79 9.54 9.15C9.25 9.5 9.03 9.91 8.89 10.39C8.75 10.87 8.67 11.36 8.67 11.88L8.67 12.13C8.67 12.66 8.74 13.15 8.88 13.62C9.02 14.09 9.24 14.5 9.53 14.85C9.82 15.2 10.19 15.48 10.62 15.68C11.06 15.88 11.58 15.99 12.17 15.99C12.6 15.99 13 15.92 13.37 15.78C13.74 15.64 14.07 15.45 14.35 15.21C14.63 14.96 14.86 14.68 15.02 14.35C15.18 14.02 15.28 13.68 15.29 13.3L13.66 13.3C13.65 13.49 13.61 13.66 13.52 13.83C13.43 14 13.33 14.13 13.19 14.25C13.05 14.37 12.9 14.46 12.72 14.52C12.55 14.58 12.36 14.6 12.17 14.61C11.84 14.6 11.57 14.54 11.36 14.4C11.13 14.25 10.95 14.06 10.82 13.84C10.69 13.61 10.59 13.34 10.55 13.04C10.51 12.74 10.48 12.43 10.48 12.13L10.48 11.88C10.5 11.56 10.52 11.26 10.57 10.96ZM12 3C16.96 3 21 7.04 21 12C21 16.96 16.96 21 12 21C7.04 21 3 16.96 3 12C3 7.04 7.04 3 12 3ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                            <label>Copyright</label>
                                        </button>
                                    </NavLink>
                                </li>
                            )}
                            
                            <li>
                                <NavLink to='/'>
                                    <button>
                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M8 7V10C8 10.55 8.45 11 9 11H15C16.1 11 17 11.9 17 13V17C17 18.1 16.1 19 15 19H13V21H11V19H7V18H15C15.55 18 16 17.55 16 17V13C16 12.45 15.55 12 15 12H9C7.9 12 7 11.1 7 10V7C7 5.9 7.9 5 9 5H11V3H13V5H17V6H9C8.45 6 8 6.45 8 7Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                        <label>Earn</label>
                                    </button>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>
                                    <button>
                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M6.71 7.2L7.89 5.1L6.71 3L8.81 4.18L10.91 3L9.74 5.1L10.92 7.2L8.82 6.02L6.71 7.2ZM18.9 14.26L16.8 13.08L17.98 15.18L16.8 17.28L18.9 16.1L21 17.28L19.82 15.18L21 13.08L18.9 14.26ZM21 3L18.9 4.18L16.8 3L17.98 5.1L16.8 7.2L18.9 6.02L21 7.2L19.82 5.1L21 3ZM17.14 10.02L6.15 21L3 17.85L14 6.85L17.14 10.02ZM6.15 19.59L13.7 12.04L11.96 10.3L4.41 17.85L6.15 19.59Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                        <label>Customization</label>
                                    </button>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/'>
                                    <button>
                                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope tp-yt-iron-icon"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M16 6L16 8L14 8L14 13C14 14.1 13.1 15 12 15C10.9 15 10 14.1 10 13C10 11.9 10.9 11 12 11C12.37 11 12.7 11.11 13 11.28L13 6L16 6ZM18 20L4 20L4 6L3 6L3 21L18 21L18 20ZM21 3L6 3L6 18L21 18L21 3ZM7 4L20 4L20 17L7 17L7 4Z" class="style-scope tp-yt-iron-icon"></path></g></svg>
                                        <label>Audio Library</label>
                                    </button>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}