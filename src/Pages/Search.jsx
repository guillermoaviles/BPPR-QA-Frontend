import axios from "axios";
import { useState, useEffect } from "react";

function Search() {
  const [params, setParams] = useState({
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
  });
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async () => {
    try {
      let search = "";
      for (const key in params) {
        if (params[key]) {
          if (search !== "") search += "&";
          search += `${key}=${params[key]}`;
        }
      }

      const response = await axios.get(
        `http://localhost:8080/api/profiles/search?${search}`);
        setProfiles(response.data);
    } catch (error) {
      console.error("Failed to fetch profiles", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParams({
      ...params,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    console.log(params);
  }, [params]);

  return (
    <div>
      <h1>Search Component</h1>
      <div className="flex flex-col items-center space-y-2 my-8">
      <input 
        type="text"
        name="environment"
        value={params.environment}
        placeholder="Environment"
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="intendedUse"
        value={params.intendedUse}
        placeholder="Intended Use"
        onChange={handleInputChange}
        />
        <label htmlFor="inUse">In Use</label>
        <input
        type="checkbox"
        name="inUse"
        value={params.inUse}
        placeholder="In Use"
        onChange={handleInputChange}
        id="inUse"
        />
        <input
        type="text"
        name="profileUserId"
        value={params.profileUserId}
        placeholder="Profile User Id"
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="username"
        value={params.username}
        placeholder="Username"
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="pass"
        value={params.pass}
        placeholder="Password"
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="email"
        value={params.email}
        placeholder="Email"
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="firstName"
        value={params.firstName}
        placeholder="First Name"
        onChange={handleInputChange}
        />
      <input
        type="text"
        name="lastName"
        value={params.lastName}
        placeholder="Last Name"
        onChange={handleInputChange}
      />
        <input
        type="text"
        name="maidenName"
        value={params.maidenName}
        placeholder="Maiden Name"
        onChange={handleInputChange}
        />
        <input
        type="date"
        name="birthdate"
        value={params.birthdate}
        placeholder="Birthdate"
        onChange={handleInputChange}
        />
        <select onChange={handleInputChange} name="accountType" value={params.accountType} placeholder="Account Type">
            <option value="" >Account Type</option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
        </select>
        <select onChange={handleInputChange} name="accountSubType" value={params.accountSubType} placeholder="Account SubType">
            <option value="" >Account SubType</option>
            <option value="Mortgage">Mortgage</option>
            <option value="Visa Icon">Visa Icon</option>
        </select>
        <input
        type="text"
        name="accountNumber"
        value={params.accountNumber}
        placeholder="Account Number"
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="accountNickname"
        value={params.accountNickname}
        placeholder="Account Nickname"
        onChange={handleInputChange}
        />
        <input
        type="text"
        name="accountBalance"
        value={params.accountBalance}
        placeholder="Account Balance"
        onChange={handleInputChange}
        />
      <button className="mt-4 w-44 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700" type="button" onClick={fetchProfiles}>Search</button>
      </div>
      <div>
                {profiles.map((profile) => (
                    <div key={profile.id}>
                    <div  className="grid border-2 border-blue-500">
                    <p>{profile?.environment}</p>
                    <p>{profile?.intendedUse}</p>
                    <p>{profile?.inUse}</p>
                    <p>{profile?.profileUserId}</p>
                    <p>{profile?.username}</p>
                    <p>{profile?.pass}</p>
                    <p>{profile?.email}</p>
                    <p>{profile?.firstName}</p>
                    <p>{profile?.lastName}</p>
                    <p>{profile?.maidenName}</p>
                    <p>{profile?.birthdate}</p>
                    <p>{profile?.accountType}</p>
                    <p>{profile?.accountSubType}</p>
                    <p>{profile?.accountNumber}</p>
                    <p>{profile?.accountNickname}</p>
                    <p>{profile?.accountBalance}</p>
                    <p>{profile?.personalInformationEmail}</p>
                    <p>{profile?.personalInformationPhone}</p>
                    <p>{profile?.personalInformationAddress}</p>
                    <p>{profile?.personalInformationPassword}</p>
                    <p>{profile?.personalInformationQuestions}</p>
                    <p>{profile?.paymentMakePayments}</p>
                    <p>{profile?.cancelFutureTransfer}</p>
                    <p>{profile?.makeFuturePayment}</p>
                    <p>{profile?.deleteFuturePayment}</p>
                    <p>{profile?.editFuturePayment}</p>
                    <p>{profile?.onOffService}</p>
                    <p>{profile?.addPayee}</p>
                    <p>{profile?.nickname}</p>
                    <p>{profile?.payeeName}</p>
                    <p>{profile?.payeeAccountNumber}</p>
                    <p>{profile?.ebill}</p>
                    </div>
                    </div>
                ))}
            </div>
    </div>
  );
}

export default Search;
