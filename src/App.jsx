import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState({});

  // Popup toggle hander
  const togglePopup = () => {
    setShowPopup(!showPopup);
    setSegmentName("");
    setSchemas([]);
    setSelectedSchema("");
  };

  // Addd schema handler
  const handleAddSchema = () => {
    if (
      selectedSchema &&
      !schemas.some((schema) => schema?.value === selectedSchema?.value)
    ) {
      const selectedOption = schemaOptions.find(
        (option) => option?.value === selectedSchema?.value
      );
      setSchemas([...schemas, selectedOption]);
      setSelectedSchema("");
    }
  };

  // Send data to server
  const handleSaveSegment = () => {
    const payload = {
      segment_name: segmentName,
      schema: schemas.map((schema) => ({ [schema.value]: schema.label })),
    };
    // Replace with API call to send data to server
    console.log("payload ", payload);

    fetch("https://webhook.site/e7e6f41e-e358-4241-9cb5-a0217a84c722", {
      method: "post",
      headers: {
        "Content-Type": "apllication/json",
      },
      body: payload,
    })
      .then((res) => {
        console.log("res ", res);
      })
      .catch((err) => {
        console.log("err ", err);
      });
    togglePopup();
  };

  return (
    <div>
      <Button variant="contained" onClick={togglePopup}>
        Save segment
      </Button>

      {showPopup && (
        <div className="popup">
          <h2 className="margin_botton_20">Saving Segment</h2>
          <div className="segment_form_container">
            <div className="input_container margin_botton_20">
              <label className="input_lable">
                Enter the Name of the Segment
              </label>
              <TextField
                className="segment_input"
                placeholder="Name of the segment"
                type="text"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
                id="outlined-size-small"
                size="small"
              />
            </div>

            <div className="schema-box margin_botton_20">
              {schemas?.map((schema, index) => {
                return (
                  <div key={index}>
                    <Select
                      value={schema}
                      onChange={(e) => {
                        setSelectedSchema(e);
                      }}
                      className="schema_dropdown margin_botton_20"
                      options={schemaOptions}
                    />
                  </div>
                );
              })}
            </div>
            <Select
              value={selectedSchema}
              onChange={(e) => {
                setSelectedSchema(e);
              }}
              className="schema_dropdown margin_botton_20"
              placeholder="Add schema to segment"
              options={schemaOptions}
            />
          </div>

          <Stack
            className="btn_container margin_botton_20"
            spacing={2}
            direction="row"
          >
            <Button variant="contained" onClick={handleAddSchema}>
              +Add new schema
            </Button>
            <Button variant="outlined" onClick={handleSaveSegment}>
              Save the Segment
            </Button>
            {/* <button onClick={handleAddSchema}>+Add new schema</button> */}
            {/* <button onClick={handleSaveSegment}>Save the Segment</button> */}
          </Stack>

          <Stack
            className="btn_container"
            spacing={2}
            direction="row"
            sx={{
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Button variant="outlined" onClick={togglePopup}>
              Cancel
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default App;
