import axios from "axios";
import { useState, useEffect } from "react";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const environments = [
    { label: "DEV", value: "dev" },
    { label: "CERT", value: "cert" },
    { label: "PROD", value: "prod" },
  ];

  const intendedUses = [
    { label: "Sprint", value: "sprint" },
    { label: "Sanity", value: "sanity" },
    { label: "Certification", value: "certification" },
    { label: "Pipeline", value: "pipeline" },
  ];

  const accountTypes = [
    { label: "Debit", value: "debit" },
    { label: "Credit", value: "credit" },
    { label: "Deposit", value: "deposit" },
    { label: "Mortgage", value: "mortgage" },
  ];

  const accountSubTypes = [
    { label: "FHA Mortgage", value: "fha mortgage" },
    { label: "Visa Icon", value: "visaIcon" },
    { label: "Premia Rewards", value: "premia rewards" },
    { label: "Title Insurance", value: "title insurance" },
    { label: "Dwelling", value: "dwelling" },
  ];

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
        `http://localhost:8080/api/profiles/search?${search}`
      );
      setProfiles(response.data);
    } catch (error) {
      console.error("Failed to fetch profiles", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParams({
      ...params,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // useEffect(() => {
  //   console.log(params);
  // }, [params]);

  return (
    <div>
      <h1>Search Component</h1>
      <Button onPress={onOpen}>Search</Button>
      {/* <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        {(onClose) => (
          <>
            <ModalContent>
              <ModalHeader>Modal Header</ModalHeader>
              <ModalBody>
                <p>Modal Body</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    fetchProfiles();
                    onClose();
                  }}
                >
                  Filter
                </Button>
              </ModalFooter>
            </ModalContent>
          </>
        )}
      </Modal> */}
      <div className="flex flex-col items-center space-y-2 my-8">
        <Checkbox
          type="checkbox"
          name="inUse"
          checked={params.inUse}
          placeholder="In Use"
          onChange={handleInputChange}
          id="inUse"
        >
          In Use
        </Checkbox>
        <Select
          items={environments}
          label="Environment"
          onChange={handleInputChange}
          name="environment"
          value={params.environment}
          placeholder="Select an environment"
        >
          {(environment) => (
            <SelectItem key={environment.value} value={environment.value}>
              {environment.label}
            </SelectItem>
          )}
        </Select>
        <Select
          items={intendedUses}
          label="Intended Use"
          onChange={handleInputChange}
          name="intendedUse"
          value={params.intendedUse}
          placeholder="Select an intended use"
        >
          {(intendedUse) => (
            <SelectItem key={intendedUse.value} value={intendedUse.value}>
              {intendedUse.label}
            </SelectItem>
          )}
        </Select>
        <Input
          type="text"
          name="profileUserId"
          value={params.profileUserId}
          placeholder="Profile User Id"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="username"
          value={params.username}
          placeholder="Username"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="pass"
          value={params.pass}
          placeholder="Password"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="email"
          value={params.email}
          placeholder="Email"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="firstName"
          value={params.firstName}
          placeholder="First Name"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="lastName"
          value={params.lastName}
          placeholder="Last Name"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="maidenName"
          value={params.maidenName}
          placeholder="Maiden Name"
          onChange={handleInputChange}
        />
        <Input
          type="date"
          name="birthdate"
          value={params.birthdate}
          placeholder="Birthdate"
          onChange={handleInputChange}
        />
        <Select
          items={accountTypes}
          label="Account Type"
          onChange={handleInputChange}
          name="accountType"
          value={params.accountType}
          placeholder="Select an account type"
        >
          {(accountType) => (
            <SelectItem key={accountType.value} value={accountType.value}>
              {accountType.label}
            </SelectItem>
          )}
        </Select>
        <Select
          items={accountSubTypes}
          label="Account Sub Type"
          onChange={handleInputChange}
          name="accountSubType"
          value={params.accountSubType}
          placeholder="Select an account sub type"
        >
          {(accountSubType) => (
            <SelectItem key={accountSubType.value} value={accountSubType.value}>
              {accountSubType.label}
            </SelectItem>
          )}
        </Select>
        <Input
          type="text"
          name="accountNumber"
          value={params.accountNumber}
          placeholder="Account Number"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="accountNickname"
          value={params.accountNickname}
          placeholder="Account Nickname"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="accountBalance"
          value={params.accountBalance}
          placeholder="Account Balance"
          onChange={handleInputChange}
        />
        <Button color="primary" type="button" onClick={fetchProfiles}>
          Search
        </Button>
      </div>
      <div>
        {profiles.map((profile) => (
          <div key={profile.id}>
            <div className="grid border-2 border-blue-500">
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
