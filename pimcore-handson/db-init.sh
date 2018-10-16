#!/usr/bin/env bash
rsync -azL -e "ssh -o StrictHostKeyChecking=no" www-data@integration.dachcom.local:/var/dev/www/dachcom-sync/src/dachcom-sync.phar /usr/local/bin/dachcom-sync
chmod +x /usr/local/bin/dachcom-sync
dachcom-sync db -f integration -t development