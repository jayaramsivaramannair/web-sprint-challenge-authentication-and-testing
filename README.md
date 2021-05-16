# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/lambdaschool/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [ ] Fork and clone the repo. Delete your old fork from Github first if you are repeating this Unit.
- [ ] Open the assignment in Canvas and click on the "Set up git" option.
- [ ] Follow instructions to set up Codegrade's Webhook and Deploy Key.
- [ ] Make a commit and push it to Github.
- [ ] Check to see that Codegrade has accepted your git submission.

For a step-by-step on setting up Codegrade see [this guide.](https://www.notion.so/lambdaschool/Submitting-an-assignment-via-Code-Grade-A-Step-by-Step-Walkthrough-07bd65f5f8364e709ecb5064735ce374)

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### Task 1: MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [ ] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [ ] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [ ] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**Notes:**

- Execute tests locally by running `npm test`.
- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. The "test" script has been added for you.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work.
- It is better to submit a challenge that meets MVP than one that attempts too much and does not.

### Task 2: Stretch Goals

**IMPORTANT:** Don't break MVP by working on stretch goals! Run `npm test` and keep an eye on your tests.

These goals may or may not be things you have learned in this module but they build on the material you just studied. Time allowing, stretch your limits and see if you can deliver on the following optional goals:

- [ ] Write at least 4 tests per endpoint.
- [ ] Extract user validation into a separate method and write unit tests for it.
- [ ] Implement authentication using sessions instead of tokens. Build separate auth endpoints & middleware for this to avoid breaking tests.

## Submission format

- [ ] Submit via Codegrade by committing and pushing any new changes.
- [ ] Create a pull request to merge `<firstName-lastName>` branch into `main`.
- [ ] Please don't merge your own pull request and make sure **you are on your own repo**.
- [ ] Check Codegrade for automated feedback.
- [ ] Check Codegrade on Monday following the Sprint Challenge for reviewer feedback.
- [ ] Any changes pushed after the deadline will not receive any feedback.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

```
Using sessions will help us track user logins using a session id. This information can be directly stored on the server which provides us with a greater degree of control over user sessions. When sessions are used, the user session is tracked by way of cookies which are passed back and forth between the client and the server and is usually stored on the browser. Since the cookie gets automatically saved on the browser, it does not need to be provided specifically when making an access request to a protected resource. 

On the other hand, JSON web tokens (JWT) are also used to authenticate the user and the token encodes key information about the user which can be decoded by the server. A JWT is a string which has three parts separated by a period. The first part is the header which contains information about the algorithm used. The second part is payload which contains information about the user such as the user id, username and the date of creation of the token. The third part contains the signature which is generated using a secret which encodes the header and payload information using base64 encoding. 

The part which differentiates JWT from sessions is that JWT's are not stored on the server and every time a client makes a request to a protected resource, the token must be provided as part of request header (unlike session ids) so that the server can verify if the client can access the resource or not. 

```
2. What does `bcryptjs` do to help us store passwords in a secure manner?
```
bcryptjs has a hash method which converts the user password  into an alpha-numeric string of the same length based on the algorithm used by the hashing function. This makes it difficult for hackers to gain access to user passwords and decrypt them. In order to reverse engineer the user password, the attacker or hacker will need to know the algorithm used and the rounds which were used to generate the hash. 
```

3. How are unit tests different from integration and end-to-end testing?

```
Unit tests only test small unit of software in isolation such as functions or methods. 

On the other hand, integration tests test a part of the application involving different units to check how they are interacting with each other and if they are working correctly or not. End-to-end testing however simulates and tests the entire user experience right from the point when they log into the system to when they exit out of the system. 
```

4. How does _Test Driven Development_ change the way we write applications and tests?
```
Instead of writing the applications and then testing them, we start with the tests and then proceed to finish the applications in case of Test Driven Development (TDD). Thus, TDD helps us start with the end in mind. In case of TDD, we finish writing the tests then proceed to implement the associated function until the tests pass.  
```

## CodeGrade Test Submission
