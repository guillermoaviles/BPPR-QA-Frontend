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
  Image,
} from "@nextui-org/react";
import avatar from "../assets/avatar.png";

function AddProfiles() {
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
          //   handleGetProfiles();
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
          //   handleGetProfiles();
        } else {
          console.log("POST Failed");
        }
      });
    handleClearForm();
    setProfiles([]);
  };

  const handleCreateBoth = () => {
    handleCreateProfiles();
    handleCreateJSONs();
    handleClearForm();
    setProfiles([]);
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

  return (
    <div className="">
      <Button onPress={onOpen} color="primary">
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
                  <label className="block">
                    <span className="text-gray-700">Environment:</span>
                    <Input
                      type="text"
                      name="environment"
                      value={formData.environment}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Intended Use:</span>
                    <Input
                      type="text"
                      name="intendedUse"
                      value={formData.intendedUse}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">In Use: </span>
                    <Checkbox
                      name="inUse"
                      checked={formData.inUse}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Profile User Id:</span>
                    <Input
                      type="text"
                      name="profileUserId"
                      value={formData.profileUserId}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Username:</span>
                    <Input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Pass:</span>
                    <Input
                      type="text"
                      name="pass"
                      value={formData.pass}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Email:</span>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">First Name:</span>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Last Name:</span>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Maiden Name:</span>
                    <Input
                      type="text"
                      name="maidenName"
                      value={formData.maidenName}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Birthdate:</span>
                    <Input
                      type="text"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Account Type:</span>
                    <Input
                      type="text"
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Account Sub Type:</span>
                    <Input
                      type="text"
                      name="accountSubType"
                      value={formData.accountSubType}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Account Number:</span>
                    <Input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Account Nickname:</span>
                    <Input
                      type="text"
                      name="accountNickname"
                      value={formData.accountNickname}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Account Balance:</span>
                    <Input
                      type="text"
                      name="accountBalance"
                      value={formData.accountBalance}
                      onChange={handleInputChange}
                    />
                  </label>
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
                      <label className="block">
                        <span className="text-gray-700">Nickname:</span>
                        <Input
                          type="text"
                          name="nickname"
                          value={formData.nickname}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label className="block">
                        <span className="text-gray-700">Payee Name:</span>
                        <Input
                          type="text"
                          name="payeeName"
                          value={formData.payeeName}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label className="block">
                        <span className="text-gray-700">
                          Payee Account Number:
                        </span>
                        <Input
                          type="text"
                          name="payeeAccountNumber"
                          value={formData.payeeAccountNumber}
                          onChange={handleInputChange}
                        />
                      </label>
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
      <div className="flex justify-center">
        {profiles.length > 0 && (
          <div className="w-[1100px] mx-auto rounded-lg shadow-lg mt-10">
            <div className="m-auto flex flex-wrap justify-evenly p-4">
              {profiles?.map((profile, index) => (
                <Card key={profile.id} className="w-[325px] h-[235px]">
                  <CardHeader className="flex gap-3">
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
                      <div className="text-gray-700 font-bold">
                        Profile User Id:
                      </div>
                      <div>{" " + profile.profileUserId}</div>
                    </div>
                    <div className="flex space-x-4 text-small items-center">
                      <div className="text-gray-700 font-bold">Username:</div>
                      <div>{profile.username}</div>
                    </div>
                    <div className="flex space-x-4 text-small items-center">
                      <div className="text-gray-700 font-bold">
                        Account Type:
                      </div>
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
              ))}
            </div>
            <div className="flex flex-col w-[210px] mx-auto mt-4 p-4">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProfiles;
