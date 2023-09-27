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
  SelectItem
} from "@nextui-org/react";

export default function EditProfile({ selectedProfile }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [profile, setProfile] = useState({ ...selectedProfile });

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: type === 'checkbox' ? checked : value }));
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
                <Checkbox isSelected={profile.inUse} name="inUse" placeholder="In Use" onChange={handleInputChange}>In Use</Checkbox>
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
                <Input label="Profile User Id" type="text" name="profileUserId" value={profile.profileUserId} placeholder="Profile User Id" onChange={handleInputChange} />
                <Input label="Username" type="text" name="username" value={profile.username} placeholder="Username" onChange={handleInputChange} />
                <Input label="Pass" type="text" name="pass" value={profile.pass} placeholder="Password" onChange={handleInputChange} />
                <Input label="Email" type="text" name="email" value={profile.email} placeholder="Email" onChange={handleInputChange} />
                <Input label="First Name" type="text" name="firstName" value={profile.firstName} placeholder="First Name" onChange={handleInputChange} />
                <Input label="Last Name" type="text" name="lastName" value={profile.lastName} placeholder="Last Name" onChange={handleInputChange} />
                <Input label="Maiden Name" type="text" name="maidenName" value={profile.maidenName} placeholder="Maiden Name" onChange={handleInputChange} />
                <Input label="Birthdate" type="text" name="birthdate" value={profile.birthdate} placeholder="Birthdate" onChange={handleInputChange} />
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
                <Input label="Account Number" type="text" name="accountNumber" value={profile.accountNumber} placeholder="Account Number" onChange={handleInputChange} />
                <Input label="Account Nickname" type="text" name="accountNickname" value={profile.accountNickname} placeholder="Account Nickname" onChange={handleInputChange} />
                <Input label="Account Balance" type="text" name="accountBalance" value={profile.accountBalance} placeholder="Account Balance" onChange={handleInputChange} />
                <Checkbox isSelected={profile.personalInformationEmail} name="personalInformationEmail" value={profile.personalInformationEmail} placeholder="Personal Information Email" onChange={handleInputChange}>Personal Information Email</Checkbox>
                <Checkbox isSelected={profile.personalInformationPhone} name="personalInformationPhone" value={profile.personalInformationPhone} placeholder="Personal Information Phone" onChange={handleInputChange}>Personal Information Phone</Checkbox>
                <Checkbox isSelected={profile.personalInformationAddress} name="personalInformationAddress" value={profile.personalInformationAddress} placeholder="Personal Information Address" onChange={handleInputChange}>Personal Information Address</Checkbox>
                <Checkbox isSelected={profile.personalInformationPassword} name="personalInformationPassword" value={profile.personalInformationPassword} placeholder="Personal Information Password" onChange={handleInputChange}>Personal Information Password</Checkbox>
                <Checkbox isSelected={profile.personalInformationQuestions} name="personalInformationQuestions" value={profile.personalInformationQuestions} placeholder="Personal Information Questions" onChange={handleInputChange}>Personal Information Questions</Checkbox>
                <Checkbox isSelected={profile.paymentMakePayments} name="paymentMakePayments" value={profile.paymentMakePayments} placeholder="Payment Make Payments" onChange={handleInputChange}>Payment Make Payments</Checkbox>
                <Checkbox isSelected={profile.cancelFutureTransfer} name="cancelFutureTransfer" value={profile.cancelFutureTransfer} placeholder="Cancel Future Transfer" onChange={handleInputChange}>Cancel Future Transfer</Checkbox>
                <Checkbox isSelected={profile.makeFuturePayment} name="makeFuturePayment" value={profile.makeFuturePayment} placeholder="Make Future Payment" onChange={handleInputChange}>Make Future Payment</Checkbox>
                <Checkbox isSelected={profile.makeFutureTransfer} name="makeFutureTransfer" value={profile.makeFutureTransfer} placeholder="Make Future Transfer" onChange={handleInputChange}>Make Future Transfer</Checkbox>
                <Checkbox isSelected={profile.deleteFuturePayment} name="deleteFuturePayment" value={profile.deleteFuturePayment} placeholder="Delete Future Payment" onChange={handleInputChange}>Delete Future Payment</Checkbox>
                <Checkbox isSelected={profile.editFuturePayment} name="editFuturePayment" value={profile.editFuturePayment} placeholder="Edit Future Payment" onChange={handleInputChange}>Edit Future Payment</Checkbox>
                <Checkbox isSelected={profile.onOffService} name="onOffService" value={profile.onOffService} placeholder="On Off Service" onChange={handleInputChange}>On Off Service</Checkbox>
                <Checkbox isSelected={profile.addPayee} name="addPayee" value={profile.addPayee} placeholder="Add Payee" onChange={handleInputChange}>Add Payee</Checkbox>
                <Input type="text" name="nickname" value={profile.nickname} placeholder="Nickname" onChange={handleInputChange} />
                <Input type="text" name="payeeName" value={profile.payeeName} placeholder="Payee Name" onChange={handleInputChange} />
                <Input type="text" name="payeeAccountNumber" value={profile.payeeAccountNumber} placeholder="Payee Account Number" onChange={handleInputChange} />
                <Checkbox isSelected={profile.eBill} name="eBill" value={profile.eBill} placeholder="E Bill" onChange={handleInputChange}>eBill</Checkbox>
              </ModalBody>
              <ModalFooter>
              <Button auto onClick={onClose} color="danger">
                      Cancel
                    </Button>
                    <Button className="text-white" auto onClick={() => {updateProfile(profile.id); onClose();}} color="success">
                      Save </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
