import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
    const loading = useSelector(state => state.loading);
    console.log(loading)
return(
    <div>
        <p>loading</p>
    </div>
)
}

export default Loading;