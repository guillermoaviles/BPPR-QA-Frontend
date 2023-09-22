import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AddProfiles from "../components/AddProfiles";
import ExportProfiles from "../components/ExportProfiles";
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
import { MailIcon } from "../assets/MailIcon";
import { LockIcon } from "../assets/LockIcon";
import avatar from "../assets/avatar.png";

function HomePage() {
  const [profiles, setProfiles] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const profileResponse = await axios.get(
          "http://localhost:8080/api/profiles/all"
        );

        const profiles = profileResponse.data;

        setProfiles(profiles.slice(0, 6));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    handleGetProfile();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold underline mb-4">Hello world!</h1>
      <div className="card-container">
        {profiles?.map((profile) => {
          return (
              <Card key={profile.id} className="card">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={avatar}
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{profile.id}</p>
                    {profile.isActive ? (
                      <p className="text-small text-default-500">Active: 🟢</p>
                    ) : (
                      <p className="text-small text-default-500">
                        Inactive: 🔴
                      </p>
                    )}
                  </div>
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
                  <Link isExternal href="" className="mr-2">
                    Edit
                  </Link>
                  <Link isExternal href="">
                    Delete
                  </Link>
                </CardFooter>
              </Card>
          );
        })}
      </div>
      <Button onPress={onOpen} color="primary">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <AddProfiles />
      <ExportProfiles />
    </div>
  );
}

export default HomePage;
