import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
	const { gameName, tagLine } = useParams();
	const [profileData, setProfileData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await axios.get(
					`http://localhost:5125/profile/${encodeURIComponent(
						gameName
					)}/${encodeURIComponent(tagLine)}`
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
	}, [gameName, tagLine, profileData, isLoading]);

	return (
		<div>
			{profileData ? (
				<div>
					<h1>
						{profileData.gameName && profileData.tagLine
							? `${profileData.gameName}#${profileData.tagLine}`
							: "Unknown User"}
					</h1>
					<p>Region: {profileData.region || "Unknown Region"}</p>
					<p>Profile Icon ID: {profileData.profileIconId}</p>
				</div>
			) : (
				<div>Profile not found</div>
			)}
		</div>
	);
};

export default Profile;
