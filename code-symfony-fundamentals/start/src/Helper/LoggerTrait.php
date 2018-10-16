<?php
/**
 * Created by PhpStorm.
 * User: mhartung
 * Date: 28.08.18
 * Time: 16:51
 */

namespace App\Helper;

use Psr\Log\LoggerInterface;

trait LoggerTrait
{

    /**
     * @var LoggerInterface|null
     */
    private $logger;


    /**
     * @param LoggerInterface $logger
     * @required
     */
    public function setLogger(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }
    public function logInfo(string $message, array $context=[]){
        if($this->logger){
            $this->logger->info($message, $context);
        }
    }
}