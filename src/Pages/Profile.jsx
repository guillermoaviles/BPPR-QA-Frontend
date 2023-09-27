import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Tooltip,
  Divider,
  Image,
  User,
  Switch,
} from "@nextui-org/react";
import { LockIcon } from "../assets/LockIcon";
import { UnlockIcon } from "../assets/UnlockIcon";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import avatar from "../assets/avatar.png";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/profiles/${id}`
        );
        console.log("Profile details response", response.data);
        setProfile(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    console.log("About to fetch data.");
    fetchData();
  }, [id]);

  const fullName = `${profile.firstName} ${profile.lastName}`;
  return (
    <div className="m-20">
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
              <Switch>Lock</Switch>
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
                      {profile.personalInformationEmail ? (
                        <Chip color="primary">True</Chip>
                      ) : (
                        <Chip color="danger">False</Chip>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">Personal Information Phone:</p>{" "}
                      {profile.personalInformationPhone ? (
                        <Chip color="primary">True</Chip>
                      ) : (
                        <Chip color="danger">False</Chip>
                      )}
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
