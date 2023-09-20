import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AddProfiles from "../components/AddProfiles";

function HomePage() {
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const profileResponse = await axios.get(
          "http://localhost:8080/api/profiles/all"
        );

        const profile = profileResponse.data;

        setProfile(profile[0]);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    handleGetProfile();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
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
      <AddProfiles/>
    </div>
  );
}

export default HomePage;
