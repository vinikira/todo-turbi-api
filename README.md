# todo-turbi-api
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Todo app challenge

## Get Started
Clone this respository and install dependencies

```sh
$ git clone https://github.com/vinikira/todo-turbi-api
$ cd todo-turbi-api
$ npm i
```

On Firabase Console go to Create a Firebase Realtime Database (Databases -> Realtime Database), then go to Settings -> Project Settings -> Service Accounts -> Firebase ADM SDK -> Generate New Private Key, it will generate a credential file. When you get the credential file, put it on root of project (your-git-folder/todo-turbi-api/).

Copy the .env.example file to .env and set the FIREBASE_DATABASE_URL with your Firebase Realtime Database and FIREBASE_CREDENTIAL_FILE with the your credential json file name.

## Starting the API
To start api on development environment, run this command:

```sh
npm run dev
```

To start on production environment, run this command:

```sh
npm start
```

## Testing
To run tests, run this command:

```src
npm run test
```
