import axios from "axios";
import { useState } from "react";

function AddProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    environment: "",
    intendedUse: "",
    inUse: false,
    profileUserId: "",
    username: "",
    pass: "",
    email: "",
    firstName: "",
    lastName: "",
    maidenName: "",
    birthdate: "",
    accountType: "",
    accountSubType: "",
    accountNumber: "",
    accountNickname: "",
    accountBalance: "",
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
    nickname: "",
    payeeName: "",
    payeeAccountNumber: "",
    ebill: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Update the form data based on the input type
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddProfile = () => {
    setProfiles([...profiles, formData]);
    setFormData({
      environment: "",
      intendedUse: "",
      inUse: false,
      profileUserId: "",
      username: "",
      pass: "",
      email: "",
      firstName: "",
      lastName: "",
      maidenName: "",
      birthdate: "",
      accountType: "",
      accountSubType: "",
      accountNumber: "",
      accountNickname: "",
      accountBalance: "",
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
      nickname: "",
      payeeName: "",
      payeeAccountNumber: "",
      ebill: false,
    });
  };

  const handleUploadProfiles = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/api/profiles/import", profiles)
      .then((response) => {
        console.log("POST response", response);
        if (response.status === 201) {
          //   handleGetProfiles();
        } else {
          console.log("POST Failed");
        }
      });
    setFormData({
      environment: "",
      intendedUse: "",
      inUse: false,
      profileUserId: "",
      username: "",
      pass: "",
      email: "",
      firstName: "",
      lastName: "",
      maidenName: "",
      birthdate: "",
      accountType: "",
      accountSubType: "",
      accountNumber: "",
      accountNickname: "",
      accountBalance: "",
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
      nickname: "",
      payeeName: "",
      payeeAccountNumber: "",
      ebill: false,
    });
    setProfiles([]);
  };

  const handleDeleteProfile = (index) => {
    const updatedProfiles = [...profiles];
    updatedProfiles.splice(index, 1); // Remove the profile at the given index
    setProfiles(updatedProfiles);
  };

  console.log("profiles", profiles);

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">
        <span className="text-gray-700">Add New Profiles Component</span>
      </h1>
      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Environment:</span>
          <input
            type="text"
            name="environment"
            value={formData.environment}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Intended Use:</span>
          <input
            type="text"
            name="intendedUse"
            value={formData.intendedUse}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">In Use:</span>
          <input
            type="checkbox"
            name="inUse"
            checked={formData.inUse}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Profile User Id:</span>
          <input
            type="text"
            name="profileUserId"
            value={formData.profileUserId}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Username:</span>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Pass:</span>

          <input
            type="text"
            name="pass"
            value={formData.pass}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">First Name:</span>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Last Name:</span>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Maiden Name:</span>

          <input
            type="text"
            name="maidenName"
            value={formData.maidenName}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Birthdate:</span>

          <input
            type="text"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Account Type:</span>
          <input
            type="text"
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Account Sub Type:</span>
          <input
            type="text"
            name="accountSubType"
            value={formData.accountSubType}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Account Number:</span>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Account Nickname:</span>
          <input
            type="text"
            name="accountNickname"
            value={formData.accountNickname}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Account Balance:</span>
          <input
            type="text"
            name="accountBalance"
            value={formData.accountBalance}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Personal Information Email:</span>
          <input
            type="checkbox"
            name="personalInformationEmail"
            checked={formData.personalInformationEmail}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Personal Information Phone:</span>
          <input
            type="checkbox"
            name="personalInformationPhone"
            checked={formData.personalInformationPhone}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Personal Information Address:</span>
          <input
            type="checkbox"
            name="personalInformationAddress"
            checked={formData.personalInformationAddress}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Personal Information Password:</span>
          <input
            type="checkbox"
            name="personalInformationPassword"
            checked={formData.personalInformationPassword}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Personal Information Questions:</span>
          <input
            type="checkbox"
            name="personalInformationQuestions"
            checked={formData.personalInformationQuestions}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Payment Make Payments:</span>
          <input
            type="checkbox"
            name="paymentMakePayments"
            checked={formData.paymentMakePayments}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Cancel Future Transfer:</span>
          <input
            type="checkbox"
            name="cancelFutureTransfer"
            checked={formData.cancelFutureTransfer}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Make Future Payment:</span>
          <input
            type="checkbox"
            name="makeFuturePayment"
            checked={formData.makeFuturePayment}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Make Future Transfer:</span>

          <input
            type="checkbox"
            name="makeFutureTransfer"
            checked={formData.makeFutureTransfer}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Delete Future Payment:</span>

          <input
            type="checkbox"
            name="deleteFuturePayment"
            checked={formData.deleteFuturePayment}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Edit Future Payment:</span>

          <input
            type="checkbox"
            name="editFuturePayment"
            checked={formData.editFuturePayment}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">On/Off Service:</span>
          <input
            type="checkbox"
            name="onOffService"
            checked={formData.onOffService}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Add Payee:</span>
          <input
            type="checkbox"
            name="addPayee"
            checked={formData.addPayee}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Nickname:</span>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Payee Name:</span>
          <input
            type="text"
            name="payeeName"
            value={formData.payeeName}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Payee Account Number:</span>
          <input
            type="text"
            name="payeeAccountNumber"
            value={formData.payeeAccountNumber}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">E-Bill:</span>
          <input
            type="checkbox"
            name="ebill"
            checked={formData.ebill}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
      </form>
      <button
        className="mt-4 bg-[#005596] text-white py-2 px-4 rounded-full hover:bg-gray-800 cursor-pointer"
        onClick={handleAddProfile}
      >
        Add
      </button>
      <div>
        <div>
          {profiles?.map((profile, index) => (
            <div key={index}>
              <div>
                <h3>Profile ID: {profile.profileUserId}</h3>
                <h3>Account Type: {profile.accountType}</h3>
              </div>
              <button onClick={() => handleDeleteProfile(index)}>Delete</button>
            </div>
          ))}
        </div>
        {profiles.length > 0 && (
          <>
            <button
              className="mt-4 bg-[#005596] text-white py-2 px-4 rounded-full hover:bg-gray-800 cursor-pointer"
              onClick={handleUploadProfiles}
            >
              {profiles.length > 1 ? (
                <p>Create Profiles</p>
              ) : (
                <p>Create Profile</p>
              )}
            </button>
            <button
              className="mt-4 bg-[#005596] text-white py-2 px-4 rounded-full hover:bg-gray-800 cursor-pointer"
              onClick={handleUploadProfiles}
            >
              {profiles.length > 1 ? <p>Create JSONs</p> : <p>Create JSON</p>}
            </button>
            <button
              className="mt-4 bg-[#005596] text-white py-2 px-4 rounded-full hover:bg-gray-800 cursor-pointer"
              onClick={handleUploadProfiles}
            >
              {profiles.length > 1 ? (
                <p>Create Profiles & JSONs</p>
              ) : (
                <p>Create Profile & JSON</p>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AddProfiles;
