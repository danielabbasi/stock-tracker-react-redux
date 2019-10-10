import React from "react";
import { useSelector } from "react-redux";
import { Icon } from 'antd';
import Spin from 'antd/es/spin'

const Loading = () => {
    const loading = useSelector(state => state.loading);
    console.log("loading", loading)
    
    // const loading = useSelector(state => state.loading);
    // const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
return(
    <div>
        <Icon type="sync" spin />
    </div>
)
}

export default Loading;