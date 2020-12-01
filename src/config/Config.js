const defaultConfig = require('./stages/default');
const devConfig = require('./stages/dev');
const stagingConfig = require('./stages/staging');
const prodConfig = require('./stages/prod');
const localConfig = require('./stages/local');
const fs = require('file-system')
const configFilePath = './src/config/finalConfig.json'

function getMergedConfigObjectFromStage(stage) {
    let mergedConfigObject = {};
    switch (stage) {
      case 'dev':
        mergedConfigObject = lodash.merge(defaultConfig, devConfig);
        break;

      case 'staging':
        mergedConfigObject = lodash.merge(defaultConfig, stagingConfig);
        break;

      case 'prod':
        mergedConfigObject = lodash.merge(defaultConfig, prodConfig);
        break;

      case 'local':
        mergedConfigObject = lodash.merge(defaultConfig, localConfig);
        break;

      default:
        mergedConfigObject = defaultConfig;
        break;
    };

    return mergedConfigObject;
  }

async function generateConfigFile(filePath, configObject) {
    try {
        const fileData = JSON.stringify(configObject, null, 4);
        await fs.writeFile(filePath, fileData); // need to be in an async function
        return true;
    } catch (error) {
        console.log("Error while writing to config file: ", error);
        throw error;
    }
}

module.exports = async (serverless) => {
    try {
        serverless.cli.consoleLog('Generating Static Config file !!!!');

        //get deployment stage
        const deploymentStage = serverless.cli.serverless.processedInput.options.stage;

        const configObject = getMergedConfigObjectFromStage(deploymentStage);

        console.log('>>> final object is :', configObject);

        await generateConfigFile(configFilePath, configObject);

        return configObject;
    }
    catch(e) {
        console.log('>>> Error while setting up config object: ', e);

        throw e;
    }
}