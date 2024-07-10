#!/bin/bash

git checkout release
git merge master
git push origin release

NODE_ENV=production npm run build

cd ./build/

ssh ubuntu@44.192.59.78 -t 'bash -l -c "rm -rf /var/www/bearchat-ui/*"'
scp -r ./* ubuntu@44.192.59.78:/var/www/bearchat-ui/

ssh ubuntu@44.192.59.78 -t 'bash -l -c "sudo systemctl restart nginx"'

ssh ubuntu@44.192.59.78 -t 'bash -l -c "cd /var/www/bearchat && git pull origin release"'
ssh ubuntu@44.192.59.78 -t 'bash -l -c "sudo systemctl restart bearchat-api"'

git checkout master