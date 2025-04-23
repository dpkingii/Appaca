import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'


function DisplayPage() {
    const navigate = useNavigate();
    const handleLogin = async()=> { navigate('/twoTruths')};
    return (
        <>
            <h1>DisplayPage</h1>
                <button onClick = {handleLogin}
                id = "searchBtn"> Login </button>
        </>
    )
}

export default DisplayPage;