import axios from "axios";
import { Button } from "@nextui-org/react";
const FileDownload = require("js-file-download");

function ExportProfiles({ selectedProfiles }) {
  const handleAddProfile = () => {
    axios
      .post("http://localhost:8080/api/profiles/export", selectedProfiles, {
        headers: { "Content-Type": "application/json" },
        responseType: "blob",
      })
      .then((response) => {
        console.log("POST response", response);
        if (response.status === 200) {
          FileDownload(response.data, "profiles.json");
          //   handleGetProfiles();
        } else {
          console.log("POST Failed");
        }
      });
  };

  return (
    <div>
      <Button
        color="warning"
        className="w-full text-white"
        onClick={handleAddProfile}
        isDisabled={selectedProfiles.length === 0}
      >
        Export Profiles
      </Button>
    </div>
  );
}

export default ExportProfiles;
