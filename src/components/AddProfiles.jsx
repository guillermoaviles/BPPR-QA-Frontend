import axios from "axios";
import { useState } from "react";

function AddProfiles() {
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

  const handleAddProfile = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/api/profiles/new", formData)
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
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">
        Add New Profiles Component
      </h1>
      <form className="space-y-4">
        <label className="flex items-center justify-between">
          Environment:
          <input
            type="text"
            name="environment"
            value={formData.environment}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Intended Use:
          <input
            type="text"
            name="intendedUse"
            value={formData.intendedUse}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          In Use:
          <input
            type="checkbox"
            name="inUse"
            checked={formData.inUse}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Profile User Id:
          <input
            type="text"
            name="profileUserId"
            value={formData.profileUserId}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          pass:
          <input
            type="text"
            name="pass"
            value={formData.pass}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Maiden Name:
          <input
            type="text"
            name="maidenName"
            value={formData.maidenName}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Birthdate:
          <input
            type="text"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Account Type:
          <input
            type="text"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Account Sub Type:
          <input
            type="text"
            name="accountSubType"
            value={formData.accountSubType}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Account Number:
          <input
            type="text"
            name="accountSubType"
            value={formData.accountSubType}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between block">
          Account Nickname:
          <input
            type="text"
            name="accountNickname"
            value={formData.accountNickname}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Account Balance:
          <input
            type="text"
            name="accountBalance"
            value={formData.accountBalance}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Personal Information Email:
          <input
            type="checkbox"
            name="personalInformationEmail"
            checked={formData.personalInformationEmail}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Personal Information Phone:
          <input
            type="checkbox"
            name="personalInformationPhone"
            checked={formData.personalInformationPhone}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Personal Information Address:
          <input
            type="checkbox"
            name="personalInformationAddress"
            checked={formData.personalInformationAddress}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Personal Information Password:
          <input
            type="checkbox"
            name="personalInformationPassword"
            checked={formData.personalInformationPassword}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Personal Information Questions:
          <input
            type="checkbox"
            name="personalInformationQuestions"
            checked={formData.personalInformationQuestions}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Payment Make Payments:
          <input
            type="checkbox"
            name="paymentMakePayments"
            checked={formData.paymentMakePayments}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Cancel Future Transfer:
          <input
            type="checkbox"
            name="cancelFutureTransfer"
            checked={formData.cancelFutureTransfer}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Make Future Payment:
          <input
            type="checkbox"
            name="makeFuturePayment"
            checked={formData.makeFuturePayment}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Make Future Transfer:
          <input
            type="checkbox"
            name="makeFutureTransfer"
            checked={formData.makeFutureTransfer}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Delete Future Payment:
          <input
            type="checkbox"
            name="deleteFuturePayment"
            checked={formData.deleteFuturePayment}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Edit Future Payment:
          <input
            type="checkbox"
            name="editFuturePayment"
            checked={formData.editFuturePayment}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          On/Off Service:
          <input
            type="checkbox"
            name="onOffService"
            checked={formData.onOffService}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Add Payee:
          <input
            type="checkbox"
            name="addPayee"
            checked={formData.addPayee}
            onChange={handleInputChange}
            className="ml-2"
          />
        </label>
        <label className="flex items-center justify-between">
          Nickname:
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Payee Name:
          <input
            type="text"
            name="payeeName"
            value={formData.payeeName}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          Payee Account Number:
          <input
            type="text"
            name="payeeAccountNumber"
            value={formData.payeeAccountNumber}
            onChange={handleInputChange}
            className="w-full border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label className="flex items-center justify-between">
          E-Bill:
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
    </div>
  );
}

export default AddProfiles;
