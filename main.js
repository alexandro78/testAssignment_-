const customModule = require('./moduls/module');
const { Console } = require('console');
const fs = require('fs');
const inputDataF = fs.readFileSync('input_data.json', 'utf8');
// const conditionF = fs.readFileSync('condition.json', 'utf8');
let inputData;
// let condition;

try {
    inputData = JSON.parse(inputDataF);
    // condition = JSON.parse(conditionF);
}
catch (err) {
    console.log(err);
}

//operation of filtering data by "condition" "include" array. 
let filtDataWithoutExcludeOption = customModule.selectData(inputData, customModule.checkInclude(inputData));

//exclud operation of object data by condition.exclude["disabled" array object prop].
let excludedfiltData = customModule.excludeData(filtDataWithoutExcludeOption, customModule.checkExclude(inputData));

//sorted operation by condition.sort_by props array.
let result = customModule.sortByProp(excludedfiltData, customModule.sortBy(inputData));


//writing the result to a json file.
const redyToWrite = JSON.stringify(result);
fs.writeFileSync('result.json', redyToWrite);



