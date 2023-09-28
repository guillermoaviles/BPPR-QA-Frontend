import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Checkbox,
  Tooltip,
  Divider,
  Image,
  User,
  Switch,
} from "@nextui-org/react";
import { LockIcon } from "../assets/LockIcon";
import { UnlockIcon } from "../assets/UnlockIcon";
import avatar from "../assets/avatar.png";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState("");
  const [fetchProfileData, setFetchProfileData] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/profiles/${id}`
        );
        console.log("Profile details response", response.data);
        setProfile(response.data);
        setFetchProfileData(false)
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    console.log("About to fetch data.");
    if (fetchProfileData) {
      fetchData();
    }
  }, [id, fetchProfileData]);

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
          setFetchProfileData(true);
        } else {
          console.log("PATCH Failed");
        }
      });
  };

  const fullName = `${profile.firstName} ${profile.lastName}`;
  return (
    <div className="min-h-screen bg-app m-20">
      {/* {profile ? ( */}
      <Card>
        <div>
          <CardHeader className="grid grid-cols-4 m-8 gap-2">
            <div className="flex flex-col">
              <div className="ml-8 flex flex-rowjustify-center align-center">
                <User
                  name={fullName}
                  description={profile.username}
                  avatarProps={{ src: { avatar }, size: "lg" }}
                />
              </div>
              <div className="flex mt-4 ml-8">
                <Chip variant="flat" color="warning">
                  Profile ID: {profile?.profileUserId}
                </Chip>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <Chip color="primary" variant="dot" radius="sm">
                Environment: {profile?.environment}
              </Chip>
              <Chip color="warning" variant="dot" radius="sm">
                Intended Use: {profile?.intendedUse}
              </Chip>
            </div>
            <div></div>
            <div className="flex gap-4">
              <div className="mt-[5px]">
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
              <Switch
                  isSelected={profile.inUse}
                  onValueChange={() => handleSetIsInUse(profile, user)}
                  className="ml-20"
                  aria-label="inUse"
                  color="danger"
                />
            </div>
          </CardHeader>
        </div>
        <Divider />
        <div>
          <CardBody>
            <div className="grid grid-cols-3 m-8">
              <div className="">
                <div>
                  <h1 className="ml-8 uppercase text-xl">Info:</h1>
                  <Divider />
                  <div className="m-8">
                    <div className="mt-4 space-y-2 grid grid-rows">
                      <div className="flex justify-between">
                        <p className="font-bold">Email:</p> {profile?.email}
                      </div>
                      <div className="flex justify-between">
                        <b>Birthdate:</b> {profile?.birthdate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <h1 className="ml-12 uppercase text-xl">Accounts:</h1>
                <Divider />
                <div className="m-8">
                  <div className="mt-4 ml-4 space-y-2 grid grid-rows">
                    <div className="flex justify-between">
                      <p className="font-bold">Account Type:</p>{" "}
                      {profile?.accountType}
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Account Sub-Type:</p>{" "}
                      {profile?.accountSubType}
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Account Number:</p>{" "}
                      {profile?.accountNumber}
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Account Nickname:</p>{" "}
                      {profile?.accountNickname}
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Account Balance:</p>{" "}
                      {profile?.accountBalance}
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <h1 className="ml-12 uppercase text-xl ">Alert Preferences:</h1>
                <Divider />
                <div className="m-8">
                  <div className="mt-4 ml-4 space-y-2 grid grid-rows">
                    <div className="flex justify-between">
                      <p className="font-bold">Personal Information Email:</p>{" "}
                        <Checkbox isSelected={profile.personalInformationEmail} size="md"/>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Personal Information Phone:</p>{" "}
                       <Checkbox isSelected={profile.personalInformationPhone} size="md"/>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Personal Information Address:</p>{" "}
                      {profile.personalInformationAddress ? (
                        <Chip color="primary">True</Chip>
                      ) : (
                        <Chip color="danger">False</Chip>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">
                        Personal Information Password:
                      </p>{" "}
                      {profile.personalInformationPassword ? (
                        <Chip color="primary">True</Chip>
                      ) : (
                        <Chip color="danger">False</Chip>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">
                        Personal Information Questions:
                      </p>{" "}
                      {profile.personalInformationQuestions ? (
                        <Chip color="primary">True</Chip>
                      ) : (
                        <Chip color="danger">False</Chip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </div>
        <Divider />
        <div>
          <CardFooter className="m-8 grid grid-cols">
            <div className="">
              <h1 className="ml-8 uppercase text-xl text-left">Payee Data:</h1>
              <Divider />
            </div>
            <div className="grid grid-cols-3">
              <div className="m-8 space-y-2 w-4/6">
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">Add Payee:</p>{" "}
                  {profile.addPayee ? (
                    <Chip color="primary">True</Chip>
                  ) : (
                    <Chip color="danger">False</Chip>
                  )}
                </div>

                <div className="flex justify-between space-x-4">
                  <p className="font-bold">eBill:</p>{" "}
                  {profile.eBill ? (
                    <Chip color="primary">True</Chip>
                  ) : (
                    <Chip color="danger">False</Chip>
                  )}
                </div>
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">Nickname:</p> {profile?.nickname}
                </div>
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">Payee Name:</p> {profile?.payeeName}
                </div>
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">Payee Account:</p>{" "}
                  {profile?.payeeAccountNumber}
                </div>
              </div>
              <div className="m-8 space-y-2 w-4/6">
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">On/Off Service:</p>{" "}
                  {profile.onOffService ? (
                    <Chip color="primary">True</Chip>
                  ) : (
                    <Chip color="danger">False</Chip>
                  )}
                </div>
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">Make Payments:</p>{" "}
                  {profile.paymentMakePayments ? (
                    <Chip color="primary">True</Chip>
                  ) : (
                    <Chip color="danger">False</Chip>
                  )}
                </div>
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">Make Future Payment:</p>{" "}
                  {profile.makeFuturePayment ? (
                    <Chip color="primary">True</Chip>
                  ) : (
                    <Chip color="danger">False</Chip>
                  )}
                </div>
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">Delete Future Payment:</p>{" "}
                  {profile.deleteFuturePayment ? (
                    <Chip color="primary">True</Chip>
                  ) : (
                    <Chip color="danger">False</Chip>
                  )}
                </div>
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">Edit Future Payment:</p>{" "}
                  {profile.editFuturePayment ? (
                    <Chip color="primary">True</Chip>
                  ) : (
                    <Chip color="danger">False</Chip>
                  )}
                </div>
              </div>
              <div className="mt-8 space-y-2 w-4/6">
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">Make Future Transfer:</p>{" "}
                  {profile.makeFutureTransfer ? (
                    <Chip color="primary">True</Chip>
                  ) : (
                    <Chip color="danger">False</Chip>
                  )}
                </div>
                <div className="flex justify-between space-x-4">
                  <p className="font-bold">Cancel Future Transfer:</p>{" "}
                  {profile.cancelFutureTransfer ? (
                    <Chip color="primary">True</Chip>
                  ) : (
                    <Chip color="danger">False</Chip>
                  )}
                </div>
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
      {/* //   ) : (
    //     <p>Loading...</p>
    //   )} */}
    </div>
  );
}
