import _ from "lodash"

const getComparisonResult = (parseData1, parseData2) => {
    const uniqKeys = _.sortBy(_.union(_.keys(parseData1),_.keys(parseData2)));
    const result = uniqKeys.map((key) => {
        if (!_.has(parseData1, key)){
            return `+ ${key}: ${parseData2[key]}`
        }
        if (!_.has(parseData2, key)){
            return `- ${key}: ${parseData1[key]}`
        }
        if (!_.isEqual(parseData1[key], parseData2[key])){
            return `- ${key}: ${parseData1[key]}\n+ ${key}: ${parseData2[key]}`
        }
        if (_.isEqual(parseData1[key], parseData2[key])){
            return `  ${key}: ${parseData1[key]}`;
        }
    });
    return `{\n${[...result].join('\n')}\n}`
};


const file1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };
  
  const file2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  };

  console.log(getComparisonResult(file1, file2));