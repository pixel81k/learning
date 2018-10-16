#!/bin/bash
# Quickinstaller Startup Script
# @author Remo Liebi <rliebi@dachcom.ch>
# @copyright (c) 2013 DACHCOM.DIGITAL AG, http://www.dachcomdigital.ch

echo "Removing Quickinstaller Git Repo"
rm -rf ./.git/

port=$(jot -r 1  2000 65000)
echo "Using Port $port"
sed -i -e "s/_HTTP_PORT_/${port}/g" docker-compose.yml

git_name=
while [ -z $git_name ]
do
    echo -n 'What should the Git Repository be called? (Project Folder is renamed as well): '
    read git_name
done
domain_name=
while [ -z $domain_name ]
do
    echo -n 'Please enter the dev Domain Name if i should update your /etc/hosts file: '
    read domain_name
done


echo "Renaming Directory"
mv $PWD ${PWD%/*}/${git_name}
cd `pwd -P`
echo 'quickstart.sh' >> ./.gitignore

echo "Initializing GIT"
git init
git add .
git commit -m 'initial commit'
git remote add origin https://git.dachcom.net/dachcom/${git_name}
echo "Pushing initial commit"
#git push -u origin master


echo "Running docker-compose"
docker-compose up -d

echo "Running npm install"

npm install && gulp build



echo "Removing Quickinstaller Script-File"


echo "Starting PHPStrom"
pstorm .