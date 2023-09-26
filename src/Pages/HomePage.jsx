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
  Button,
  useDisclosure,
  Switch,
  Checkbox,
  Input,
  Link,
  Image,
} from "@nextui-org/react";
import avatar from "../assets/avatar.png";
import NavbarComp from "../components/NavbarComp";

function HomePage() {
  const [profiles, setProfiles] = useState([]);

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
    <NavbarComp />
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
                <div className="flex flex-col">
                  <p className="text-md">{profile.id}</p>
                  {profile.isActive ? (
                    <p className="text-small text-default-500">Active: 🟢</p>
                  ) : (
                    <p className="text-small text-default-500">Inactive: 🔴</p>
                  )}
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
