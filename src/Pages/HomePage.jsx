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
            <div
              key={profile.id}
              className="bg-white rounded-lg p-4 shadow-md"
            >
            <p>{profile.environment}</p>
            <p>{profile.intendedUse}</p>
            <p>{profile.inUse}</p>
            <p>{profile.profileUserId}</p>
            <p>{profile.username}</p>
            <p>{profile.pass}</p>
            <p>{profile.email}</p>
            <p>{profile.firstName}</p>
            <p>{profile.lastName}</p>
            <p>{profile.maidenName}</p>
            <p>{profile.birthdate}</p>
            <p>{profile.accountType}</p>
            <p>{profile.accountSubType}</p>
            <p>{profile.accountNumber}</p>
            <p>{profile.accountNickname}</p>
            <p>{profile.accountBalance}</p>
            <p>{profile.personalInformationEmail}</p>
            <p>{profile.personalInformationPhone}</p>
            <p>{profile.personalInformationAddress}</p>
            <p>{profile.personalInformationPassword}</p>
            <p>{profile.personalInformationQuestions}</p>
            <p>{profile.paymentMakePayments}</p>
            <p>{profile.cancelFutureTransfer}</p>
            <p>{profile.makeFuturePayment}</p>
            <p>{profile.deleteFuturePayment}</p>
            <p>{profile.editFuturePayment}</p>
            <p>{profile.onOffService}</p>
            <p>{profile.addPayee}</p>
            <p>{profile.nickname}</p>
            <p>{profile.payeeName}</p>
            <p>{profile.payeeAccountNumber}</p>
            <p>{profile.ebill}</p>
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
