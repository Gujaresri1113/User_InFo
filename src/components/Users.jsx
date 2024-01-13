import React, { useState } from 'react';
import {Tilt} from 'react-tilt';

const Users = () => {
    const [username, setUsername] = useState();
    const [userInfo, SetUserInfo] = useState(null);

    const getUserInfo = async () => {
        const apiUrl = `https://api.github.com/users/${username}`;

        try {
            const response = await fetch(apiUrl);
            const userData = await response.json();

            if (response.ok) {
                SetUserInfo(userData);
            } else {
                alert(`Error : ${userData.message || response.statusText}`)
            }
        } catch (error) {
            console.error('Error fetching data : ', error);
        }
    };

    return (
        (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-700 to-purple-900">
                <Tilt className="Tilt max-w-md mx-auto p-6 bg-white bg-opacity-70 rounded-md shadow-lg" options={{ max: 10, scale: 1.02 }}>
                    <div className="Tilt-inner">
                        <h1 className="py-2 text-center text-3xl font-bold">Github Users Card</h1>
                        <form onSubmit={(e) => { e.preventDefault(); getUserInfo(); }}>
                            <label for="username" className="mx-20 py-10 px-6 mb-4">Enter Github Username</label>
                            <input type="text" className="p-2 border rounded-md focus:outline-none mt-4 mb-2" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <button type="submit" className="ml-2 p-2 bg-teal-500 text-white rounded-md shadow-md">Get Info</button>
                        </form>

                        {userInfo && (
                            <div className="mt-6 mx-4">
                                <img src={userInfo.avatar_url} alt="Avatar" className="w-36 h-36 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold">Username : {userInfo.login || 'login not available'}</h3>
                                <h3 className="text-gray-600">Name : {userInfo.name || "Name not available"}</h3>
                                <p className="text-gray-600">Public repos : {userInfo.public_repos}</p>
                                <p className="text-gray-600">Public Gists : {userInfo.public_gists}</p>
                                <p className="text-gray-600">Profile Created : {new Date(userInfo.created_at).toLocaleDateString('en-US')}</p>
                            </div>
                        )}
                        <div className="mt-4 text-sm text-gray-600">
          &copy; 2024 Srikrishna Dutta Gujare. All rights reserved.
        </div>
                    </div>
                </Tilt>
            </div>
        )
    )
}
export default Users