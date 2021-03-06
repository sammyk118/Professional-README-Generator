const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    { type: 'input', name: 'title', message: 'Project title:', },
    { type: 'input', name: 'description', message: 'Brief description of your project:', },
    { type: 'input', name: 'installation', message: 'Installation guide:', },
    { type: 'input', name: 'usage', message: 'What\'s this used for?', },
    { type: 'list', name: 'license', message: 'Choose a license:', choices: ["MIT", "GNU", "Unlicensed", "Mozilla", "Apache"] },
    { type: 'input', name: 'contributing', message: 'Contributors to your project:', },
    { type: 'input', name: 'tests', message: 'Any included tests people can run?', },
    { type: 'input', name: 'questions', message: 'What if people have questions?' },
    { type: 'input', name: 'username', message: 'Github username:' },
    { type: 'input', name: 'email', message: 'Email address:' },
  ]);

const generateREADME = (answers) =>
  `${answers.title}

## Description
${answers.description}

  ## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
${answers.questions}

Github: [${answers.username}](https://github.com/${answers.username}) <br>
Email me with any questions: ${answers.email}
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
