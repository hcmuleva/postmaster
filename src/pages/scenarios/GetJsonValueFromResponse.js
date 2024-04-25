const getJsonValueByPath = (obj, path)=> {
    console.log("obj",obj, "path",path)
    const keys = path.split('.');
    let value = obj;
    
    for (const key of keys) {
        if (Array.isArray(value)) {
            const index = parseInt(key);
            if (isNaN(index)) {
                return undefined; // Invalid index
            }
            value = value[index];
        } else if (typeof value === 'object' && value !== null) {
            if (!value.hasOwnProperty(key)) {
                return undefined; // Key not found
            }
            value = value[key];
        } else {
            return undefined; // Path not valid for current value
        }
    }
    return value;
}

function replaceVariables(jsonData, jsonVariables) {
    console.log("JsonData",jsonData, "jsonVariables",jsonVariables)
    // Iterate over each variable
    jsonVariables.forEach(variable => {
        const variableName = variable.name;
        const variableValue = variable[variableName];
        
        // Replace all occurrences of {{variableName}} with variableValue in jsonData
        const regex = new RegExp("{{" + variableName + "}}", "g");
        if(typeof jsonData === 'string'){
            jsonData = jsonData.replace(regex, variableValue);

        }else if(typeof jsonData === 'object'){

            jsonData = JSON.parse(JSON.stringify(jsonData).replace(regex, variableValue));
        }

    });

    return jsonData;
}
 export {getJsonValueByPath,replaceVariables};