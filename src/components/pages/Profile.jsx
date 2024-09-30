import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
	const { puuid } = useParams();
	const [profileData, setProfileData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await axios.get(
					`http://localhost:5125/api/profile/${puuid}`
				);
				console.log(response.data);
				setProfileData(response.data);
			} catch (error) {
				setError("Error fetching profile data");
				console.error("Error fetching profile data", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfileData();
	}, [puuid]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			{profileData ? (
				<div>
					<h1>
						{console.log(profileData)}
						{profileData.gameName && profileData.tagLine
							? `${profileData.gameName}#${profileData.tagLine}`
							: "Unknown User"}
					</h1>
					<p>Level: {profileData.summonerLevel}</p>
				</div>
			) : (
				<div>Profile not found</div>
			)}
		</div>
	);
};

export default Profile;
