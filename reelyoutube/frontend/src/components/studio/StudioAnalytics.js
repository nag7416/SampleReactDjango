import { useParams } from "react-router-dom";
import StudioNav from "./studioComps/StudioNav";
import StudioSidebar from "./studioComps/StudioSidebar";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function StudioAnalytics({ userInfo }){
    const { channelslug } = useParams();
    const channelslu = channelslug.replace('@', '');
    useEffect(() => {
        
    }, [channelslu])
    return (
        <>
            <Helmet>
                <title>Channel Analytics - YouTube</title>
            </Helmet>
            <StudioNav userInfo={userInfo} />
            <div className="main">
                <StudioSidebar userInfo={userInfo} />
                <div className="studioscroll">
                    <div className="inner">
                        <div className="line">
                            <h5>Channel Analytics</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}