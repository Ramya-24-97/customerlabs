import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialSchemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const [data, setData] = useState({
    segment_name: "",
    schema: [],
  });

  const [selectedSchema, setSelectedSchema] = useState("");
  const [availableOptions, setAvailableOptions] =
    useState(initialSchemaOptions);

  const handleSchemaSelection = (event) => {
    setSelectedSchema(event.target.value);
  };

  const handleAddSchema = () => {
    if (selectedSchema) {
      const selectedOption = initialSchemaOptions.find(
        (option) => option.value === selectedSchema
      );

      setData((prevData) => ({
        ...prevData,
        schema: [
          ...prevData.schema,
          { [selectedSchema]: selectedOption.label },
        ],
      }));

      setAvailableOptions((prevOptions) =>
        prevOptions.filter((option) => option.value !== selectedSchema)
      );

      setSelectedSchema("");
    }
  };

  // const handleRemoveSchema = (indexToRemove) => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     schema: prevData.schema.filter((_, index) => index !== indexToRemove),
  //   }));
  // };

  
  const handleRemoveSchema = (indexToRemove) => {
  const removedSchema = data.schema[indexToRemove];
  const removedSchemaValue = Object.keys(removedSchema)[0]; // Get the value of the removed schema

  setData((prevData) => ({
    ...prevData,
    schema: prevData.schema.filter((_, index) => index !== indexToRemove),
  }));

  // Add the removed schema back to availableOptions
  setAvailableOptions((prevOptions) => [
    ...prevOptions,
    { label: removedSchema[removedSchemaValue], value: removedSchemaValue },
  ]);
};

  const handleSegmentSave = () => {
    fetch("https://webhook.site/57bce186-da04-4c56-94fc-7fd610168aa9", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent successfully");

          setData({
            segment_name: "",
            schema: [],
          });

          setAvailableOptions(initialSchemaOptions);

          setSelectedSchema("");
        } else {
          console.error("Failed to send data:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  useEffect(() => {
    setSelectedSchema("");
  }, [availableOptions]);

  return (
    <div className="App m-5">
      <button
        className="btn btn-info text-light mt-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Saving Segment
      </button>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header bg-info text-light">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Save Segment
          </h5>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="mb-3">
              <label htmlFor="segmentName" className="form-label">
                Enter name of the Segment
              </label>
              <input
                type="text"
                className="form-control"
                id="segmentName"
                name="segmentName"
                placeholder="Name of the segment"
                value={data.segment_name} 
                onChange={(e) =>
                  setData({ ...data, segment_name: e.target.value })
                }
              />
            </div>

            <p>
              To save your statement, you need to add the schema to build the
              query
            </p>

            <div className="border border-primary p-2 my-2">
              {data.schema.map((item, index) => (
                <div key={index} className="d-flex mb-2 align-items-center">
                  <select
                    className="form-select me-2"
                    value={Object.values(item)[0]}
                    onChange={() => {}}
                    name={`dynamicSchema${index}`}
                    id={`dynamicSchema${index}`}
                  >
                    <option value={Object.values(item)[0]}>
                      {Object.keys(item)[0]}
                    </option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemoveSchema(index)}
                  >
                    -
                  </button>
                </div>
              ))}
            </div>

            <select
              className="form-select mb-3"
              value={selectedSchema}
              onChange={handleSchemaSelection}
              id="schemaSelection"
              name="schemaSelection"
            >
              <option value="">Select Schema</option>
              {availableOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn btn-link
           mb-3"
              onClick={handleAddSchema}
            >
              +Add new schema
            </button>
          </form>
          <button
            className="btn btn-info text-light mt-3"
            onClick={handleSegmentSave}
          >
            Save the segment
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
