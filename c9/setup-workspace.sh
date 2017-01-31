#! /bin/bash

echo "installing node 6.9.4.."
source ~/.nvm/nvm.sh
nvm install 6.9.4
nvm use 6.9.4
echo "6" > ~/.nvm/alias/default

echo "installing node dependencies, go make a cup of tea.."
cd ~/workspace
npm install -g cordova@6.0.x ionic && npm install

echo "logging into ionic.."
mkdir -p ~/.ionic
cp c9/ionic/* ~/.ionic

echo "switching to lesson-one.."
git checkout lesson-one

echo "workspace setup complete.." 
echo "Don't forget to do the remaining manual tasks (README.md)"
