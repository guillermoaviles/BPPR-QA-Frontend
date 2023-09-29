import axios from "axios";
import { useState, useEffect } from "react";
import ExportProfiles from "../components/ExportProfiles";
import DeleteProfile from "../components/DeleteProfile";
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
  Card,
  CardBody,
  CheckboxGroup,
  CardFooter,
  Chip,
  Divider,
  Tooltip,
  Switch,
} from "@nextui-org/react";
import { UnlockIcon } from "../assets/UnlockIcon";
import { LockIcon } from "../assets/LockIcon";

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
  const [makeSearch, setMakeSearch] = useState(true);

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
      setMakeSearch(false);
    } catch (error) {
      console.error("Failed to fetch profiles", error);
    }
    if (makeSearch) {
      fetchProfiles();
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParams({
      ...params,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const handleSetIsInUse = (profile) => {
    axios
      .patch(`http://localhost:8080/api/profiles/${profile.id}/inUse`, {
        environment: profile.environment,
        intendedUse: profile.intendedUse,
        inUse: !profile.inUse,
        profileUserId: profile.profileUserId,
        username: profile.username,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        maidenName: profile.maidenName,
        birthdate: profile.birthdate,
        accountType: profile.accountType,
        accountSubType: profile.accountSubType,
        accountNumber: profile.accountNumber,
        accountNickname: profile.accountNickname,
        accountBalance: profile.accountBalance,
        personalInformationEmail: profile.personalInformationEmail,
        personalInformationPhone: profile.personalInformationPhone,
        personalInformationAddress: profile.personalInformationAddress,
        personalInformationPassword: profile.personalInformationPassword,
        personalInformationQuestions: profile.personalInformationQuestions,
        paymentMakePayments: profile.paymentMakePayments,
        cancelFutureTransfer: profile.cancelFutureTransfer,
        makeFuturePayment: profile.makeFuturePayment,
        makeFutureTransfer: profile.makeFutureTransfer,
        deleteFuturePayment: profile.deleteFuturePayment,
        editFuturePayment: profile.editFuturePayment,
        onOffService: profile.onOffService,
        addPayee: profile.addPayee,
        nickname: profile.nickname,
        payeeName: profile.payeeName,
        payeeAccountNumber: profile.payeeAccountNumber,
        ebill: profile.ebill,
        user: profile.user,
      })
      .then((response) => {
        console.log("PATCH response", response);
        if (response.status === 200) {
          // setFetchProfiles(true);
        } else {
          console.log("PATCH Failed");
        }
      });
  };

  const handleDelete = (profile) => {
    axios
      .delete(`http://localhost:8080/api/profiles/${profile.id}/delete`)
      .then((response) => {
        console.log("DELETE response", response);
        if (response.status === 204) {
          // setFetchProfiles(true);
        } else {
          console.log("DELETE Failed");
        }
      });
  };

  return (
    <div className="pt-32 bg-app p-8">
      <div className="flex flex-col max-w-4xl m-auto">
        <div className="w-[325px] m-auto pb-16">
          <Card className="sm">
            <CardBody className="space-y-4">
              <Button color="primary" onPress={onOpen}>
                Search
              </Button>
              <ExportProfiles selectedProfiles={selectedProfiles} />
            </CardBody>
          </Card>
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="outside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Filter Profiles</ModalHeader>
                <ModalBody>
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
                      value={params.intendedUse}
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
                      value={params.accountSubType}
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
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button auto onClick={onClose} color="danger">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      fetchProfiles();
                      onClose();
                    }}
                  >
                    Filter
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="col-span-3">
          {!makeSearch && profiles.length > 0 && (
            <Card className="sm">
              <CardBody>
                <p>
                  <b>Selected Profiles: </b> {selectedProfiles.join(", ")}
                </p>
                <div className="space-y-4 p-8">
                  {profiles.map((profile) => (
                    <div key={profile?.id}>
                      <Card isBlurred shadow="sm">
                        <CardBody>
                          <div className="grid grid-cols-4">
                            <div className="col-span-2">
                              <CheckboxGroup
                                value={selectedProfiles}
                                onChange={setSelectedProfiles}
                              >
                                <Checkbox value={profile?.id}>
                                  <Chip color="primary" variant="flat">
                                    ID: {profile?.id}
                                  </Chip>
                                </Checkbox>
                              </CheckboxGroup>
                            </div>
                            <Chip
                              color="warning"
                              variant="flat"
                              startContent={`@`}
                            >
                              Profile ID: {profile?.profileUserId}
                            </Chip>
                            <div>
                              {profile?.inUse ? (
                                <Tooltip
                                  color="danger"
                                  placement="right"
                                  content={`Used By: ${profile?.user}`}
                                >
                                  <Chip
                                    color="danger"
                                    variant="flat"
                                    startContent={<LockIcon />}
                                  >
                                    Locked
                                  </Chip>
                                </Tooltip>
                              ) : (
                                <Chip
                                  color="success"
                                  variant="flat"
                                  startContent={<UnlockIcon />}
                                >
                                  Unlocked
                                </Chip>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 mt-4">
                            <div className="col-span-2">
                              <b>Profile Info:</b>
                              <Divider />
                              <p>
                                <b>Username:</b> @{profile?.username}
                              </p>

                              <p>
                                <b>Name:</b> {profile?.firstName}{" "}
                                {profile?.lastName}
                                {profile?.maidenName && (
                                  <> {profile?.maidenName}</>
                                )}
                              </p>
                              <p>
                                <b>Email:</b> {profile?.email}
                              </p>
                            </div>
                            <div>
                              <b>Accounts:</b>
                              <Divider />
                              <p>
                                <b>Type: </b> {profile?.accountType}
                              </p>
                              <p>
                                <b>Sub-Type: </b> {profile?.accountSubType}
                              </p>
                              <p>
                                <b>Number: </b> {profile?.accountNumber}
                              </p>
                            </div>
                            <div>
                              <div className="">
                                <b>Use:</b>
                                <Divider />
                                <b>Environment: </b>
                                {profile?.environment}
                              </div>
                              <div>
                                <b>Intended Use: </b>
                                {profile?.intendedUse}
                              </div>
                            </div>
                          </div>
                          <CardFooter>
                            <Button
                              className="-ml-3"
                              color="primary"
                              variant="ghost"
                            >
                              Edit
                            </Button>
                            <DeleteProfile
                              selectedProfile={profile}
                              setFetchProfiles={setMakeSearch}
                            />
                            <Switch
                              isSelected={profile.inUse}
                              onValueChange={() => handleSetIsInUse(profile)}
                              className="ml-7"
                              aria-label="inUse"
                              size="lg"
                              color="danger"
                            />
                          </CardFooter>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
