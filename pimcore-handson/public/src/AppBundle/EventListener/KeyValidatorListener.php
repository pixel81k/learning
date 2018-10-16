<?php

namespace AppBundle\EventListener;

use Symfony\Component\EventDispatcher\GenericEvent;

class KeyValidatorListener
{

    /**
     * @param \Symfony\Component\EventDispatcher\GenericEvent $event
     *
     * @return void
     */
    public function validateKey(GenericEvent $event)
    {
        $key = $event->getArgument('key');
        $event->setArgument('key', \Pimcore\File::getValidFilename($key));
    }
}