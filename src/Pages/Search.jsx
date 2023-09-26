import axios from "axios";
import { useState, useEffect } from "react";
import ExportProfiles from "../components/ExportProfiles";
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
  Textarea,
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
  const [searchDone, setSearchDone] = useState(false);

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
      setSearchDone(true);
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

  const [selectedProfiles, setSelectedProfiles] = useState([]);

  return (
    <div className="m-8">
      <h1 className="mb-4">Search Component</h1>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <Card className="sm">
            <CardBody className="space-y-4">
              <Button color="primary" onPress={onOpen}>
                Search
              </Button>
              <ExportProfiles selectedProfiles={selectedProfiles} />
            </CardBody>
          </Card>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior="outside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Modal Header</ModalHeader>
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
        </div>
        <div className="col-span-3">
          {searchDone && (
            <Card className="sm">
              <CardBody>
                <div className="space-y-4">
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
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardBody>
              <CardFooter className="p-8">
                <p><b>Selected Profiles: </b> {selectedProfiles.join(", ")}</p>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
