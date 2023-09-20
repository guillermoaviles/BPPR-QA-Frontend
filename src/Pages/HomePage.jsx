import { useState } from "react";
import axios from "axios";

function HomePage() {
  const [profiles, setProfiles] = useState([]);

  const handleGetProfiles = async () => {
    const profilesResponse = await axios.get(
      "http://localhost:8080/api/profiles/all"
    );
    const profiles = profilesResponse.data;
    setProfiles(profiles);
  };

  const handleAddProfile = () => {
    const body = {
      environment: "test",
      intendedUse: "test",
      inUse: false,
      profileUserId: "test",
      username: "test",
      pass: "test",
      email: "test",
      firstName: "test",
      lastName: "test",
      maidenName: "test",
      birthdate: "test",
      accountType: "test",
      accountSubType: "test",
      accountNumber: "test",
      accountNickname: "test",
      accountBalance: "test",
      personalInformationEmail: false,
      personalInformationPhone: false,
      personalInformationAddress: false,
      personalInformationPassword: false,
      personalInformationQuestions: false,
      paymentMakePayments: false,
      cancelFutureTransfer: false,
      makeFuturePayment: false,
      makeFutureTransfer: false,
      deleteFuturePayment: false,
      editFuturePayment: false,
      onOffService: false,
      addPayee: false,
      nickname: "test",
      payeeName: "test",
      payeeAccountNumber: "test",
      ebill: false,
    };
    axios
      .post("http://localhost:8080/api/profiles/new", body)
      .then((response) => {
        console.log("POST response", response);
        if (response.status === 201) {
          handleGetProfiles();
        } else {
          console.log("POST Failed");
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button className="bg-black text-white" onClick={handleAddProfile}>
        Add New Profile
      </button>
      {profiles?.map((profile) => {
        return (
          <div key={profile.id}>
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
  );
}

export default HomePage;
