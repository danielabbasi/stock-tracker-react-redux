import React from 'react';
import { useSelector } from 'react-redux';

const LatestNews = () => {
    const latestNews = useSelector((state) => state.latestNews)

    return (<div>{latestNews.headline}</div>)}

    export default LatestNews