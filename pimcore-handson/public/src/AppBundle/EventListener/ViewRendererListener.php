<?php

namespace AppBundle\EventListener;

use Pimcore\Controller\TemplateControllerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Force every frontend controller to use twig engine renderer.
 *
 * @package AppBundle\EventListener
 */
class ViewRendererListener implements EventSubscriberInterface
{
    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController'
        ];
    }

    /**
     * @param FilterControllerEvent $event
     */
    public function onKernelController(FilterControllerEvent $event)
    {
        $event->getRequest()->attributes->set(TemplateControllerInterface::ATTRIBUTE_AUTO_RENDER, TRUE);
        $event->getRequest()->attributes->set(TemplateControllerInterface::ATTRIBUTE_AUTO_RENDER_ENGINE, 'twig');
    }

}