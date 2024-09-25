import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
	const { puuid } = useParams(); // Get puuid from URL params
	const [profileData, setProfileData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5125/api/profile/${puuid}`
				);
				setProfileData(response.data);
			} catch (error) {
				console.error("Error fetching profile data", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfileData();
	}, [puuid]);

	return (
		<div>
			{profileData ? (
				<div>
					<h1>
						{profileData.gameName}#{profileData.tagLine}
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
