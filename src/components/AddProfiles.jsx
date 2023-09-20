import axios from "axios";

function AddProfiles() {
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
        //   handleGetProfiles();
        } else {
          console.log("POST Failed");
        }
      });
  };

  return (
    <div>
      <h1>Add New Profiles Component</h1>
      <button className="bg-black text-white" onClick={handleAddProfile}>
        Add New Profile
      </button>
    </div>
  );
}

export default AddProfiles;
