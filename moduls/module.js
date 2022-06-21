module.exports = { selectData, checkInclude, sortBy, sortByProp, checkExclude, excludeData };

//selects all include objects of data array and forms a filtered object.
function selectData(inputData, inputArray) {
    let selectedData = {};
    selectedData.data = [];
    for (topKey in inputData.data) {
        for (secondKey in inputData.data[topKey]) {

            for (arrKey in inputArray) {
                if (inputData.data[topKey][secondKey] == inputArray[arrKey]) {
                    selectedData.data.push(inputData.data[topKey]);
                }
            }
        }
    }
    return selectedData;
}

//selects all the condition.include properties and puts them in a simple array.
function checkInclude(inputData) {
    for (topKey in inputData.condition.include) {
        let inputArray = [];
        for (secondKey in inputData.condition.include[topKey]) {
            inputArray.push(inputData.condition.include[topKey][secondKey]);
        }
        return inputArray;
    }
}

//selects all indexes of conditon obj sort_by element.
function sortBy(inputData) {
    let sortArray = [];
    for (sortByTopKey in inputData.condition.sort_by) {
        sortArray.push(inputData.condition.sort_by[sortByTopKey]);
    }
    return sortArray;
}

//returns the selected and sorted object.
function sortByProp(filteredObj, sortArray) {
    for (sortItem in sortArray) {
        let tempProp = sortArray[sortItem];
        filteredObj.data.sort((a, b) => a[tempProp] > b[tempProp] ? 1 : -1);
    }
    return filteredObj;
}

// selects all indexes of the exclude conditon.
function checkExclude(inputData) {
    let excludeArray = [];
    for (excludeTopKey in inputData.condition.exclude) {
        for (innerKey in inputData.condition.exclude[excludeTopKey]) {
            excludeArray = inputData.condition.exclude[excludeTopKey][innerKey];
        }
    }
    return excludeArray;
}

//exclude objekts containing keys with a specific value.
function excludeData(selectedData, excludeArray) {
    let readyExcludeData = {};
    readyExcludeData.data = [];
    for (key1 in selectedData.data) {
        for (key2 in selectedData.data[key1]) {
            let check = selectedData.data[key1]['disabled'] == undefined || selectedData.data[key1][key2] == !excludeArray;
            if (check) {
                readyExcludeData.data.push(selectedData.data[key1]);
                break;
            }
        }
    }
    return readyExcludeData;
}