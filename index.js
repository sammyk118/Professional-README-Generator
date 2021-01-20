const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    { type: 'input', name: 'title', message: 'Project title:', },
    { type: 'input', name: 'description', message: 'Project description', },
    { type: 'input', name: 'installation', message: 'Installation:', },
    { type: 'input', name: 'usage', message: 'Usage', },
    { type: 'input', name: 'license', message: 'License', },
    { type: 'input', name: 'contributing', message: 'contributing', },
    { type: 'input', name: 'tests', message: 'Tests', },
    { type: 'input', name: 'questions', message: 'Questions' },
    { type: 'input', name: 'username', message: 'Github username:' },
    { type: 'input', name: 'email', message: 'Email address:' },
  ]);

const generateREADME = (answers) =>
  `
  ${answers.title}
  `;


async function init() {
  try {
    const answers = await promptUser();

    const content = generateREADME(answers);

    writeFileAsync('output.md', content);

    console.log('Successfully wrote to output.md');
  } catch (err) {
    console.log(err);
  }
};

init();
