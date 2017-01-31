#! /bin/bash

# setup node
nvm install 6.9.4
nvm use 6.9.4
echo "6" > ~/.nvm/alias/default

# set default project settings / runners
cp ./project.settings ~/workspace

# install dependencies
cd ~/workspace
npm install -g cordova@6.0.x ionic && npm install

# checkout lesson one
git checkout lesson-one

echo "Don't forget to set the student's Ionic App Name and ID in ~/workspace/ionic.config.json"
