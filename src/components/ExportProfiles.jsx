import axios from "axios";
const FileDownload = require('js-file-download');

function ExportProfiles() {
  const handleAddProfile = () => {
    const body = ["1", "2", "3"];
    axios
      .post("http://localhost:8080/api/profiles/export", body, {headers:{"Content-Type":"application/json"}, responseType: "blob"})
      .then((response) => {
        console.log("POST response", response);
        if (response.status === 200) {
            FileDownload(response.data, 'profiles.json');
          //   handleGetProfiles();
        } else {
          console.log("POST Failed");
        }
      });
  };

  return (
    <div>
      <h1>Export Profiles Component</h1>
      <button className="bg-black text-white" onClick={handleAddProfile}>
        Export Profiles
      </button>
    </div>
  );
}

export default ExportProfiles;
