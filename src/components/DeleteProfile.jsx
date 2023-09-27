import axios from "axios";
import { Button } from "@nextui-org/react";


function DeleteProfile({ selectedProfile, setFetchProfiles }) {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/profiles/${selectedProfile.id}/delete`)
      .then((response) => {
        console.log("DELETE response", response);
        if (response.status === 204) {
          setFetchProfiles(true);
        } else {
          console.log("DELETE Failed");
        }
      });
  };

  return (
    <div>
      <Button
        color="danger"
        className=" left-3 cursor-pointer"
        variant="ghost"
        onPress={handleDelete}
      >
        Delete
      </Button>
    </div>
  );
}

export default DeleteProfile;
