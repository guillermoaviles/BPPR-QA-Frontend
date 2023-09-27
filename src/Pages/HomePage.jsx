import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, useNavigate } from "react-router-dom";
import AddProfiles from "../components/AddProfiles";
import DeleteProfile from "../components/DeleteProfile";
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
import EditProfile from "../components/EditProfile";

function HomePage() {
  const [profiles, setProfiles] = useState([]);
  const [fetchProfiles, setFetchProfiles] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePress = (id) => {
    console.log("pressed");
    navigate(`/profile/${id}`);
  };

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

  const handleSetIsInUse = (profile, user) => {
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
        user: user.username,
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
    <div className="grid grid-cols-4 p-4">
      <div className="flex m-8">
        <AddProfiles setFetchProfiles={setFetchProfiles} />
      </div>
      <div className="col-span-3">
        <div className="m-4 grid grid-cols-3 content-start gap-4 flex flex-wrap">
          {profiles?.map((profile) => {
            return (
              <Card
                isPressable
                onPress={() => handlePress(profile.id)}
                key={profile.id}
                className=""
              >
                <CardHeader className="flex justify-between">
                  <div className="flex">
                    <Image
                      alt="nextui logo"
                      height={40}
                      radius="sm"
                      src={avatar}
                      width={40}
                    />
                    
                      <Chip className="mt-2" color="primary" variant="flat">
                        ID: {profile?.id}
                      </Chip>
                    </div>
                    <div className="flex justify-end">
                      {profile?.inUse ? (
                        <Tooltip
                          color="danger"
                          placement="right"
                          content={`Used By: ${profile.user}`}
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
                <CardFooter className="flex justify-between">
                  <div className="flex">
                    <EditProfile selectedProfile={profile} />
                    <DeleteProfile
                      selectedProfile={profile}
                      setFetchProfiles={setFetchProfiles}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Switch
                      isSelected={profile.inUse}
                      onValueChange={() => handleSetIsInUse(profile, user)}
                      aria-label="inUse"
                      color="danger"
                    />
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
