import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AddProfiles from "../components/AddProfiles";
import ExportProfiles from "../components/ExportProfiles";
import {
  Card,
  Chip,
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
  Switch,
  Checkbox,
  Tooltip,
  Input,
  Link,
  Image,
} from "@nextui-org/react";
import { MailIcon } from "../assets/MailIcon";
import { LockIcon } from "../assets/LockIcon";
import { UnlockIcon } from "../assets/UnlockIcon";
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
      <div className="w-[1100px] h-[50vh] m-auto flex flex-wrap justify-evenly">
        {profiles?.map((profile) => {
          return (
            <Card key={profile.id} className="w-[325px] h-[235px]">
              <CardHeader className="flex gap-3">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src={avatar}
                  width={40}
                />
                <div className="flex">
                  <Chip color="primary" variant="flat">
                    ID: {profile?.id}
                  </Chip>
                  <div className="ml-24">
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
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex space-x-4 text-small items-center">
                  <div className="text-gray-700 font-bold">
                    Profile User Id:
                  </div>
                  <div>{profile.profileUserId}</div>
                </div>
                <div className="flex space-x-4 text-small items-center">
                  <div className="text-gray-700 font-bold">Username:</div>
                  <div>{profile.username}</div>
                </div>
                <div className="flex space-x-4 text-small items-center">
                  <div className="text-gray-700 font-bold">Account Type:</div>
                  <div>{profile.accountType}</div>
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button color="primary">Edit</Button>
                <Button
                  color="warning"
                  className="text-white left-3 bg-danger cursor-pointer"
                >
                  Delete
                </Button>
                <Switch className="ml-20" aria-label="inUse" />
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div className="flex flex-col">
        <AddProfiles />
        <ExportProfiles />
      </div>
    </div>
  );
}

export default HomePage;
