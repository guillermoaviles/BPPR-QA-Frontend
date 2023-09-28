import axios from "axios";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

export default function EditProfile({ selectedProfile }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showPayeeFields, setShowPayeeFields] = useState(false);
  const [profile, setProfile] = useState({ ...selectedProfile });
  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "addPayee") {
      setShowPayeeFields(checked);
    }
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

  const updateProfile = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/profiles/${id}`, profile);
      onOpenChange(false);
    } catch (err) {
      console.log("An error occurred while updating a profile.", err);
    }
  };

  return (
    <div>
      <Button color="primary" variant="ghost" onPress={onOpen}>
        Edit
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Profile</ModalHeader>
              <ModalBody>
                <Select
                  items={environments}
                  label="Environment"
                  onChange={handleInputChange}
                  name="environment"
                  value={profile.environment}
                  placeholder="Select an environment"
                  selectedKeys={[profile.environment]}
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
                  value={profile.intendedUse}
                  placeholder="Select an intended use"
                  selectedKeys={[profile.intendedUse]}
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
                  label="Profile User Id"
                  type="text"
                  name="profileUserId"
                  value={profile.profileUserId}
                  onChange={handleInputChange}
                />
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleInputChange}
                />
                <Input
                  label="Pass"
                  type="text"
                  name="pass"
                  value={profile.pass}
                  onChange={handleInputChange}
                />
                <Input
                  label="Email"
                  type="text"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                />
                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
                <Input
                  label="Maiden Name"
                  type="text"
                  name="maidenName"
                  value={profile.maidenName}
                  onChange={handleInputChange}
                />
                <Input
                  label="Birthdate"
                  type="text"
                  name="birthdate"
                  value={profile.birthdate}
                  onChange={handleInputChange}
                />
                <Select
                  items={accountTypes}
                  label="Account Type"
                  onChange={handleInputChange}
                  name="accountType"
                  value={profile.accountType}
                  placeholder="Select an account type"
                  selectedKeys={[profile.accountType]}
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
                  value={profile.accountSubType}
                  placeholder="Select an account sub type"
                  selectedKeys={[profile.accountSubType]}
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
                  label="Account Number"
                  type="text"
                  name="accountNumber"
                  value={profile.accountNumber}
                  onChange={handleInputChange}
                />
                <Input
                  label="Account Nickname"
                  type="text"
                  name="accountNickname"
                  value={profile.accountNickname}
                  onChange={handleInputChange}
                />
                <Input
                  label="Account Balance"
                  type="text"
                  name="accountBalance"
                  value={profile.accountBalance}
                  onChange={handleInputChange}
                />
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">
                    Personal Information Email:
                  </span>
                  <Checkbox
                    isSelected={profile.personalInformationEmail}
                    name="personalInformationEmail"
                    value={profile.personalInformationEmail}
                    placeholder="Personal Information Email"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">
                    Personal Information Phone:
                  </span>
                  <Checkbox
                    isSelected={profile.personalInformationPhone}
                    name="personalInformationPhone"
                    value={profile.personalInformationPhone}
                    placeholder="Personal Information Phone"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">
                    Personal Information Address:
                  </span>
                  <Checkbox
                    isSelected={profile.personalInformationAddress}
                    name="personalInformationAddress"
                    value={profile.personalInformationAddress}
                    placeholder="Personal Information Address"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">
                    Personal Information Password:
                  </span>
                  <Checkbox
                    isSelected={profile.personalInformationPassword}
                    name="personalInformationPassword"
                    value={profile.personalInformationPassword}
                    placeholder="Personal Information Password"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">
                    Personal Information Questions:
                  </span>
                  <Checkbox
                    isSelected={profile.personalInformationQuestions}
                    name="personalInformationQuestions"
                    value={profile.personalInformationQuestions}
                    placeholder="Personal Information Questions"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">Payment Make Payments:</span>
                  <Checkbox
                    isSelected={profile.paymentMakePayments}
                    name="paymentMakePayments"
                    value={profile.paymentMakePayments}
                    placeholder="Payment Make Payments"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">Cancel Future Transfer:</span>
                  <Checkbox
                    isSelected={profile.cancelFutureTransfer}
                    name="cancelFutureTransfer"
                    value={profile.cancelFutureTransfer}
                    placeholder="Cancel Future Transfer"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">Make Future Payment:</span>
                  <Checkbox
                    isSelected={profile.makeFuturePayment}
                    name="makeFuturePayment"
                    value={profile.makeFuturePayment}
                    placeholder="Make Future Payment"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">Make Future Transfer:</span>
                  <Checkbox
                    isSelected={profile.makeFutureTransfer}
                    name="makeFutureTransfer"
                    value={profile.makeFutureTransfer}
                    placeholder="Make Future Transfer"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">Delete Future Payment:</span>
                  <Checkbox
                    isSelected={profile.deleteFuturePayment}
                    name="deleteFuturePayment"
                    value={profile.deleteFuturePayment}
                    placeholder="Delete Future Payment"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">Edit Future Payment:</span>
                  <Checkbox
                    isSelected={profile.editFuturePayment}
                    name="editFuturePayment"
                    value={profile.editFuturePayment}
                    placeholder="Edit Future Payment"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">On/Off Service:</span>
                  <Checkbox
                    isSelected={profile.onOffService}
                    name="onOffService"
                    value={profile.onOffService}
                    placeholder="On Off Service"
                    onChange={handleInputChange}
                  />
                </label>
                <label className="block flex justify-between items-center">
                  <span className="text-gray-700">Add Payee:</span>
                  <Checkbox
                    isSelected={profile.addPayee}
                    name="addPayee"
                    value={profile.addPayee}
                    onChange={handleInputChange}
                  />
                </label>

                {showPayeeFields && (
                  <>
                    <Input
                      type="text"
                      name="nickname"
                      value={profile.nickname}
                      label="Nickname"
                      onChange={handleInputChange}
                    />
                    <Input
                      type="text"
                      name="payeeName"
                      value={profile.payeeName}
                      label="Payee Name"
                      onChange={handleInputChange}
                    />
                    <Input
                      type="text"
                      name="payeeAccountNumber"
                      value={profile.payeeAccountNumber}
                      label="Payee Account Number"
                      onChange={handleInputChange}
                    />
                    <label className="block flex justify-between items-center">
                      <span className="text-gray-700">E-Bill:</span>
                      <Checkbox
                        name="ebill"
                        isSelected={profile.eBill}
                        onChange={handleInputChange}
                        value={profile.eBill}
                        placeholder="E Bill"
                      />
                    </label>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button auto onClick={onClose} color="danger">
                  Cancel
                </Button>
                <Button
                  className="text-white"
                  auto
                  onClick={() => {
                    updateProfile(profile.id);
                    onClose();
                  }}
                  color="success"
                >
                  Update{" "}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
