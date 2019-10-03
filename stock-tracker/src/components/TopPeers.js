import React from 'react';
import { useSelector } from 'react-redux'

const TopPeers = () => {
    const peers = useSelector((state) => state.topPeers)
    return (
        <div className="toppeers">
            <h3>TOP PEERS</h3>
            <ul>{peers.map((data, index) => <li key={index}>{data}</li>)} </ul>
        </div>
    )
}
export default TopPeers;