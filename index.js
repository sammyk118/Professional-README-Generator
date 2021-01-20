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

const generateREADME = (data) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${data.name}</h1>
    <p class="lead">I am from ${data.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${data.github}</li>
      <li class="list-group-item">LinkedIn: ${data.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;


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
