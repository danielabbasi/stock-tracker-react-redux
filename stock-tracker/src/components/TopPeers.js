import React from 'react';
import { useSelector } from 'react-redux'

const TopPeers = () => {
    const peers = useSelector((state) => state.topPeers)
    return (
        <div>
            <h3>Top Peers</h3>
            <ul>{peers.map(data => <li>{data}</li>)} </ul>
        </div>
    )
}
export default TopPeers;