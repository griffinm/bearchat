#!/bin/bash

git checkout release
git merge master
git push origin release

NODE_ENV=production npm run build

cd ./build/

ssh ubuntu@44.202.222.180 -t 'bash -l -c "rm -rf /var/www/bearchat-ui/*"'
scp -r ./* ubuntu@44.202.222.180:/var/www/bearchat-ui/

ssh ubuntu@44.202.222.180 -t 'bash -l -c "sudo systemctl restart nginx"'