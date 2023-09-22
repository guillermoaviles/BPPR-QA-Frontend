import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AddProfiles from "../components/AddProfiles";
import ExportProfiles from "../components/ExportProfiles";

function HomePage() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const profileResponse = await axios.get(
          "http://localhost:8080/api/profiles/all"
        );

        const profiles = profileResponse.data;

        setProfiles(profiles.slice(0, 6));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    handleGetProfile();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline mb-4">Hello world!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {profiles?.map((profile) => {
          return (
            <div key={profile.id} className="bg-white rounded-lg p-4 shadow-md text-left">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-700 font-bold">Profile User Id:</div>
                <div>{profile.profileUserId}</div>
                <div className="text-gray-700 font-bold">Username:</div>
                <div>{profile.username}</div>
                <div className="text-gray-700 font-bold">Account Type:</div>
                <div>{profile.accountType}</div>
              </div>
            </div>
          );
        })}
      </div>
      <AddProfiles />
      <ExportProfiles />
    </div>
  );
}

export default HomePage;
