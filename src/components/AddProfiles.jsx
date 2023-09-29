import axios from "axios";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
  Image,
} from "@nextui-org/react";
import avatar from "../assets/avatar.png";

function AddProfiles({ setFetchProfiles }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [profiles, setProfiles] = useState([]);
  const [showPayeeFields, setShowPayeeFields] = useState(false);
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

    if (name === "addPayee") {
      setShowPayeeFields(checked);
    }
  };

  const handleAddProfile = () => {
    setProfiles([...profiles, formData]);
    handleClearForm();
  };

  const handleCreateProfiles = () => {
    axios
      .post("http://localhost:8080/api/profiles/import", profiles)
      .then((response) => {
        console.log("POST response", response);
        if (response.status === 201) {
          setFetchProfiles(true);
        } else {
          console.log("POST Failed");
        }
      });
    handleClearForm();
    setProfiles([]);
  };

  const handleCreateJSONs = () => {
    axios
      .post("http://localhost:8080/api/profiles/import/json", profiles)
      .then((response) => {
        console.log("POST response", response);
        if (response.status === 201) {
          setFetchProfiles(true);
        } else {
          console.log("POST Failed");
        }
      });
    handleClearForm();
    setProfiles([]);
    setFetchProfiles(true);
  };

  const handleCreateBoth = () => {
    handleCreateProfiles();
    handleCreateJSONs();
    handleClearForm();
    setProfiles([]);
    setFetchProfiles(true);
  };

  const handleDeleteProfile = (index) => {
    const updatedProfiles = [...profiles];
    updatedProfiles.splice(index, 1);
    setProfiles(updatedProfiles);
  };

  const handleClearForm = () => {
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

  const environments = [
    { label: "DEV", value: "DEV" },
    { label: "CERT", value: "CERT" },
    { label: "PROD", value: "PROD" },
  ];

  const intendedUses = [
    { label: "Sprint", value: "Sprint" },
    { label: "Sanity", value: "Sanity" },
    { label: "Certification", value: "Certification" },
    { label: "Pipeline", value: "Pipeline" },
  ];

  const accountTypes = [
    { label: "Debit", value: "Debit" },
    { label: "Credit", value: "Credit" },
    { label: "Deposit", value: "Deposit" },
    { label: "Mortgage", value: "Mortgage" },
  ];

  const accountSubTypes = [
    { label: "FHA Mortgage", value: "FHA Mortgage" },
    { label: "Visa Icon", value: "Visa Icon" },
    { label: "Premia Rewards", value: "Premia Rewards" },
    { label: "Title Insurance", value: "Title Insurance" },
    { label: "Dwelling", value: "Dwelling" },
  ];

  return (
    <div className="w-full">
      <Button onPress={onOpen} size="lg" color="primary">
        Add Profile
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add Profile</ModalHeader>
              <ModalBody>
                <form className="space-y-4">
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">In Use:</span>
                    <Checkbox
                      name="paymentMakePayments"
                      checked={formData.inUse}
                      onChange={handleInputChange}
                    />
                  </label>
                  <Select
                    items={environments}
                    label="Environment"
                    onChange={handleInputChange}
                    name="environment"
                    value={formData.environment}
                    placeholder="Select an environment"
                  >
                    {(environment) => (
                      <SelectItem
                        key={environment.value}
                        value={environment.value}
                      >
                        {environment.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    items={intendedUses}
                    label="Intended Use"
                    onChange={handleInputChange}
                    name="intendedUse"
                    value={formData.intendedUse}
                    placeholder="Select an intended use"
                  >
                    {(intendedUse) => (
                      <SelectItem
                        key={intendedUse.value}
                        value={intendedUse.value}
                      >
                        {intendedUse.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Input
                    type="text"
                    name="profileUserId"
                    value={formData.profileUserId}
                    onChange={handleInputChange}
                    label="Profile User Id"
                  />
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    label="Username"
                  />
                  <Input
                    type="text"
                    name="pass"
                    value={formData.pass}
                    onChange={handleInputChange}
                    label="Password"
                  />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    label="Email"
                  />
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    label="First Name"
                  />
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    label="Last Name"
                  />
                  <Input
                    type="text"
                    name="maidenName"
                    value={formData.maidenName}
                    onChange={handleInputChange}
                    label="Maiden Name"
                  />
                  <Input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    label="Birthdate"
                    labelPlacement="outside-left"
                  />
                  <Select
                    items={accountTypes}
                    label="Account Type"
                    onChange={handleInputChange}
                    name="accountType"
                    value={formData.accountType}
                    placeholder="Select an account type"
                  >
                    {(accountType) => (
                      <SelectItem
                        key={accountType.value}
                        value={accountType.value}
                      >
                        {accountType.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    items={accountSubTypes}
                    label="Account Sub Type"
                    onChange={handleInputChange}
                    name="accountSubType"
                    value={formData.accountSubType}
                    placeholder="Select an account sub type"
                  >
                    {(accountSubType) => (
                      <SelectItem
                        key={accountSubType.value}
                        value={accountSubType.value}
                      >
                        {accountSubType.label}
                      </SelectItem>
                    )}
                  </Select>

                  <Input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    label="Account Number"
                  />
                  <Input
                    type="text"
                    name="accountNickname"
                    value={formData.accountNickname}
                    onChange={handleInputChange}
                    label="Account Nickname"
                  />
                  <Input
                    type="text"
                    name="accountBalance"
                    value={formData.accountBalance}
                    onChange={handleInputChange}
                    label="Account Balance"
                  />
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">
                      Personal Information Email:
                    </span>
                    <Checkbox
                      name="personalInformationEmail"
                      checked={formData.personalInformationEmail}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">
                      Personal Information Phone:
                    </span>
                    <Checkbox
                      name="personalInformationPhone"
                      checked={formData.personalInformationPhone}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">
                      Personal Information Address:
                    </span>
                    <Checkbox
                      name="personalInformationAddress"
                      checked={formData.personalInformationAddress}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">
                      Personal Information Password:
                    </span>
                    <Checkbox
                      name="personalInformationPassword"
                      checked={formData.personalInformationPassword}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">
                      Personal Information Questions:
                    </span>
                    <Checkbox
                      name="personalInformationQuestions"
                      checked={formData.personalInformationQuestions}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">
                      Payment Make Payments:
                    </span>
                    <Checkbox
                      name="paymentMakePayments"
                      checked={formData.paymentMakePayments}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">
                      Cancel Future Transfer:
                    </span>
                    <Checkbox
                      name="cancelFutureTransfer"
                      checked={formData.cancelFutureTransfer}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">Make Future Payment:</span>
                    <Checkbox
                      name="makeFuturePayment"
                      checked={formData.makeFuturePayment}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">Make Future Transfer:</span>
                    <Checkbox
                      name="makeFutureTransfer"
                      checked={formData.makeFutureTransfer}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">
                      Delete Future Payment:
                    </span>
                    <Checkbox
                      name="deleteFuturePayment"
                      checked={formData.deleteFuturePayment}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">Edit Future Payment:</span>
                    <Checkbox
                      name="editFuturePayment"
                      checked={formData.editFuturePayment}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">On/Off Service:</span>
                    <Checkbox
                      name="onOffService"
                      checked={formData.onOffService}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block flex justify-between items-center">
                    <span className="text-gray-700">Add Payee:</span>
                    <Checkbox
                      name="addPayee"
                      checked={formData.addPayee}
                      onChange={handleInputChange}
                    />
                  </label>
                  {showPayeeFields && (
                    <>
                      <Input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleInputChange}
                        label="Nickname"
                      />
                      <Input
                        type="text"
                        name="payeeName"
                        value={formData.payeeName}
                        onChange={handleInputChange}
                        label="Payee Name"
                      />
                      <Input
                        type="text"
                        name="payeeAccountNumber"
                        value={formData.payeeAccountNumber}
                        onChange={handleInputChange}
                        label="Payee Account Number"
                      />
                      <label className="block flex justify-between items-center">
                        <span className="text-gray-700">E-Bill:</span>
                        <Checkbox
                          name="ebill"
                          checked={formData.ebill}
                          onChange={handleInputChange}
                        />
                      </label>
                    </>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button auto onClick={onClose} color="danger">
                  Cancel
                </Button>
                <Button
                  auto
                  color="success"
                  className="text-white"
                  onClick={() => {
                    handleAddProfile();
                    onClose();
                  }}
                >
                  Add Profile
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="mt-8 w-full mb-8">
        {profiles.length > 0 && (
          <Card className="bg-lightBlue">
            <div className="font-bold text-xl m-4">
              Profiles to Add: ({profiles.length})
            </div>
            <div className="flex flex-col self-center m-4 w-48">
              <Button
                className="text-white cursor-pointer"
                onClick={handleCreateProfiles}
              >
                {profiles.length > 1 ? (
                  <p>Create Profiles</p>
                ) : (
                  <p>Create Profile</p>
                )}
              </Button>
              <Button
                className="text-white cursor-pointer mt-2"
                onClick={handleCreateJSONs}
              >
                {profiles.length > 1 ? <p>Create JSONs</p> : <p>Create JSON</p>}
              </Button>
              <Button
                className="text-white cursor-pointer mt-2"
                onClick={handleCreateBoth}
              >
                {profiles.length > 1 ? (
                  <p>Create Profiles & JSONs</p>
                ) : (
                  <p>Create Profile & JSON</p>
                )}
              </Button>
            </div>
            <div className="w-60% grid grid-cols-3 gap-4 p-4">
              {profiles?.map((profile, index) => (
                <div>
                  <Card key={index} className="">
                    <CardHeader className="">
                      <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src={avatar}
                        width={40}
                      />
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <div className="flex space-x-4 text-small items-center">
                        <div className="text-gray-700 font-bold">User Id:</div>
                        <div>{" " + profile.profileUserId}</div>
                      </div>
                      <div className="flex space-x-4 text-small items-center">
                        <div className="text-gray-700 font-bold">Username:</div>
                        <div>{profile.username}</div>
                      </div>
                      <div className="flex space-x-4 text-small items-center">
                        <div className="text-gray-700 font-bold">
                          Account Type:
                        </div>{" "}
                        <div>{profile.accountType}</div>
                      </div>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <Button color="primary">Edit</Button>
                      <Button
                        className="text-white bg-danger cursor-pointer left-3"
                        onClick={() => handleDeleteProfile(index)}
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default AddProfiles;
