# ece461-project

This is Group 16's repository for the ECE 461 project. The members of this group are Evan Allendar, Xavier Callait, Mingyu Kim, Patrick McLin, and Ayush Shukla. 

## Commands

There are three main commands that can be run using ./run (argument). There are three possible types of arguments. The first is 'install'. As the name suggests, it will install all the needed dependencies for the system. The second accepted argument is 'test'. This will run our test suites on all of our src files. The last argument is 'URL_file' where URL_file is the name of a file that contains links to either a package in the npm registry or to the GitHub repository of an npm package. For example, if a file containing a link to a GitHub page is called 'One-url.txt', then the appropriate call would be './run One-url.txt'. There is little input validation from the command line, so ensure that all inputs and files are valid. 

When working on the repository, all packages needed during development can be run using `npm i`. All files can be built using `npm run build` and to manually test the code, `npm test` can be called. 

When the URL_file command is called, if successful, the standard output will contain the URL, a score, and the metrics below in NDJSON format. It should also exit 0. If it does not, that means there is an error occurring somewhere in the program. Ensure that the .env contains the GITHUB_TOKEN when running this command. In addition, logging can be set using the LOG_LEVEL and LOG_FILE in the .env file. 

The commands are parsed by a file called run in the root directory. When the argument is passed, the file will call the appropriate program. 

## File Directory

Our files are divided into 3 main sections: commands, middleware, and services. The commands contain all of the files related to the frontend and command line. The middleware contains the metric calculations and bridges the frontend to the backend. The services contain functions related to calling using REST API. These 3 sections are included in both the src and test folders. The src contains the actual code, while the test contains the unit tests for each of the files. The goal for testing was to have 80% coverage with 90% accuracy. 

### src/commands
These files deal with the command line. They handle the different commands that can be called. The 'install.ts' handles the install command and will output the number of dependencies installed if successful. The 'test.ts' handles the test command and will output all testing suites. The 'checkUrl.ts' will run if a valid file containing URLs is passed in. 

### src/middleware
The middleware contains files for extracting the link, calculating metrics, and formatting the scores. It interacts with both the commands frontend and the service backend. The middleware uses models defined in the src/models folder to pass data.  

### src/services
These files handle all API calls needed for this program. It gets called by middleware and will pass data back. For the calls to work, the GITHUB_TOKEN in the .env file needs to be valid. 

### src/models
This folder contains several models for both the middleware and services backend. 

### test/commands
This folder contains the test suites for the src/commands files. Each src file should have its own test file containing test cases. If created properly, new test suites will be added when running the './run test'.

### test/middleware
This folder contains the test suites for the src/middleware files. Each src file should have its own test file containing test cases. If created properly, new test suites will be added when running the './run test'.

### test/services
This folder contains the test suites for the src/services files. Each src file should have its own test file containing test cases. If created properly, new test suites will be added when running the './run test'.

## Metrics 

### Net Score (NS)
NS = LC * (0.4 * BF + 0.15 * CM + 0.15 * RU + 0.3 * RM)
All of the variables used in this equation are explained below. 

### Bus Factor (BF)
BS = 1 - (critPR * 0.6 + critCommits * 0.4) / (totalPR * 0.6 + totalCommits * 0.4)
The variables in the equation containing the prefix 'crit' signify the number of either pull requests or commits by the most critical contributor. Calculating the weight of the most critical contributor can tell us if there are few people or many people working on a package.

### Correctness (CN)
CN = closedIssues / totalIssues
If the number of closed issues is near the number of total issues, then the correctness/accuracy of the package is high. A low score will be produced by a high number of open issues.

### Ramp Up (RU)
RU = linesOfCode
The ramp-up time is calculated by the number of lines of code. If there are many lines, it will take longer to understand and use the package. If there are few lines of code, it will be easier to understand as there is less content to cover.

### Responsive Maintainer (RM)
RM = max(monthlyCommitCount) - min(monthlyCommitCount)
The monthly commits for the past year are saved and the difference between the highest and lowest is taken. The value is then compared to the annual commits. If there are consistent updates, then the responsive maintainer score is high.

### License (LC)
LC = { 1, if license exits; 0, else }
This score is pretty simple, if it has a license, then it's a 1. 

## API

For this project, we have opted to use the REST API. The REST API is the standard in the industry and has been around for a while. There is a lot of documentation. Below is a link to a website that provides a brief overview of this API.

(https://restfulapi.net/)[https://restfulapi.net/]

## Frameworks

### JEST

We decided on JEST as our test framework. It is one of the most popular testing frameworks for Typescript and Javascript. It is relatively easy to use and many features that can be implemented to help test functions and files. For more information regarding JEST, follow this link. 

(https://jestjs.io/)[https://jestjs.io/]

### Oclif

For the command line interface, we have chosen Oclif. It is easy to use and quick to set up. It integrates with JEST seamlessly and was made to be used with Typescript. With Oclif, there is autodocumentation and autocompletion. For more information regarding Oclif, follow this link. 

(https://oclif.io/)[https://oclif.io/]



