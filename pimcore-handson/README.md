# dachcom pimcore quickinstaller

Use this quickinstaller and kickstart your project in minutes!

## Included

* Base Layout
* I18n (Plugin)
* Toolbox (Plugin)
* Emailizr (Plugin)

## Getting started

### Install

`$ git clone git@git.dachcom.net:dachcom/pimcore-quickinstaller.git`

1. Get into project folder
2. Update `composer.json` project properties
3. Remove `.git` folder and initialize your project git stuff
4. Update `public/web/.htaccess`
5. Start docker: `$ docker-compose up -d`
6. Get into docker container: `$ docker-compose exec web bash`
8. Execute `composer install`
9. Create DB
10. Open the website in your browser to start pimcore installation process

## Cronjobs
* the default cronjob should get installed automatically with docker

## Setup SASS
* Install npm dependencies on project root: `npm install` 
* Run gulp on project root: `gulp watch`

## Deployment
* configure /project.yml
* configure Jenkins (http://qups.dachcom.net/)

## Dachcom | Pimcore Deployment
classes / objectbricks / fieldcollection should be available in git but will not deployed to other environments like staging or production. 
however, we syncronize data between dev and integration because of the db sharing philosophy! 
The staging|production Deployment (Phing) takes care of synchronizing and installing those data.

## Backend caching ([redis](http://redis.io/))
pimcore quickinstaller comes with a optional redis caching. If you want to enable backend redis caching, you need to perform following steps:

1. uncomment redis section in `docker-compose.yml`
2. [setup cache](https://www.pimcore.org/docs/5.0.0/Development_Tools_and_Details/Cache/index.html)
3. restart your docker container ( start / stop )
4. use redis commander (node.js gui) to observe redis: `http://YOUR_LOCALHOST:8081/`

## Additional Plugins from Dachcom

### Open Source
* [Pimcore 5.x Lucene Search](https://github.com/dachcom-digital/pimcore-lucene-search)
* [Pimcore 5.x News](https://github.com/dachcom-digital/pimcore-news)
* [Pimcore 5.x Members](https://github.com/dachcom-digital/pimcore-members)
* [Pimcore 5.x Formbuilder](https://github.com/dachcom-digital/pimcore-formbuilder)
* [Pimcore 5.x Toolbox](https://github.com/dachcom-digital/pimcore-toolbox)
* [Pimcore 5.x I18n](https://github.com/dachcom-digital/pimcore-i18n)

### Internal
--- 

### Docker commands
start container: `docker-compose up -d`  
stop container: `docker-compose stop`  
composer update: `docker-compose exec web bash -c 'composer update --working-dir=/var/www/'`  