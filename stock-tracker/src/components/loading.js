import React from "react";
import { useSelector } from "react-redux";
import { Icon, Spin } from 'antd';

const Loading = () => {
    // const loading = useSelector(state => state.loading);
    // const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
return(
    <div>
        <p>loading</p>
    </div>
)
}

export default Loading;