<?php

/*
 * Add composer requirements:
 * composer req dachcom/deployer
 */

namespace Deployer;

require __DIR__ . '/public/vendor/dachcom/deployer/recipes/pimcore5.php';

set('sync_dir', __DIR__ . '/public/');

task('deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:rsync',
    'deploy:shared',
    'deploy:assets:install',
    'deploy:pimcore:classes-rebuild',
    'deploy:pimcore:migrate',
    'deploy:cache:clear',
    'deploy:cache:warmup',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:opcache:reset',
    'deploy:unlock',
    'cleanup',
    'success'
])->desc('Deploy your project');

