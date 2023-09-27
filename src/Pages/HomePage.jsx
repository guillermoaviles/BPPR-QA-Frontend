import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AddProfiles from "../components/AddProfiles";
import ExportProfiles from "../components/ExportProfiles";
import {
  Card,
  Chip,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Switch,
  Tooltip,
  Image,
} from "@nextui-org/react";
import { LockIcon } from "../assets/LockIcon";
import { UnlockIcon } from "../assets/UnlockIcon";
import avatar from "../assets/avatar.png";

function HomePage() {
  const [profiles, setProfiles] = useState([]);
  const [fetchProfiles, setFetchProfiles] = useState(true);
  const navigate = useNavigate();

  const handlePress = (id) => {
    console.log("pressed")
    navigate(`/profile/${id}`)
  }
  useEffect(() => {
    const handleGetProfiles = async () => {
      try {
        const profileResponse = await axios.get(
          "http://localhost:8080/api/profiles/all"
        );

        const profiles = profileResponse.data;

        setProfiles(profiles.slice(0, 6));
        setFetchProfiles(false); // Set fetchProfiles to false after fetching data
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (fetchProfiles) {
      handleGetProfiles();
    }
  }, [fetchProfiles]); // Only fetch data when fetchProfiles changes

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
          setFetchProfiles(true);
        } else {
          console.log("PATCH Failed");
        }
      });
  };

  return (
    <div className="p-4">
      <div className="w-[1100px] h-[50vh] m-auto flex flex-wrap justify-evenly">
        {profiles?.map((profile) => {
          return (
            <Card isPressable onPress={() => handlePress(profile.id)} key={profile.id} className="w-[325px] h-[235px]">
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
                <Button color="primary" variant="ghost">Edit</Button>
                <Button
                  color="danger"
                  className=" left-3 cursor-pointer"
                  variant="ghost"
                >
                  Delete
                </Button>
                <Switch
                  onValueChange={() => handleSetIsInUse(profile)} // Wrap the function call in a lambda
                  className="ml-20"
                  aria-label="inUse"
                />
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
