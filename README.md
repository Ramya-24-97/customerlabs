# Getting Started 

* Clone this repo
* Open in vs code 
* Run React app
```
npm start
```

### Sate management

* **data** stores the segment's name and schema.
* **selectedSchema** keeps track of the currently selected schema option.
* **availableOptions** maintains a list of available schema options.

### Functions

* **handleSchemaSelection:** Updates the selectedSchema state based on the user's selection.
* **handleAddSchema:** Adds the selected schema to the data state and removes it from the available options.
* **handleRemoveSchema:** Removes a selected schema from the data state based on its index.
* **handleSegmentSave:** Logs the data to be sent (which can later be modified to send data to a server) and resets the state to clear the segment name, schema, and available options.