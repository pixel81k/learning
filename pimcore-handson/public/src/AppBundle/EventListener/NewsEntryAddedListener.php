<?php /** @noinspection ALL */

namespace AppBundle\EventListener;

use AppBundle\ViewHelper\NewsLinkGenerator;
use Pimcore\Event\Model\ElementEventInterface;
use Pimcore\Log\ApplicationLogger;
use Pimcore\Mail;
use Pimcore\Model\DataObject\NewsEntry;

/**
 * Class NewsEntryAddedListener
 *
 * @package AppBundle\EventListener
 */
class NewsEntryAddedListener
{
    /**
     * @var NewsLinkGenerator
     */
    protected $newsLinkGenerator;

    /**
     * @var ApplicationLogger
     */
    protected $logger;

    /**
     * NewsEntryAddedListener constructor.
     *
     * @param NewsLinkGenerator $newsLinkGenerator
     * @param ApplicationLogger $logger
     * @param string            $text
     */
    public function __construct(NewsLinkGenerator $newsLinkGenerator, ApplicationLogger $logger)
    {
        $this->newsLinkGenerator = $newsLinkGenerator;
        $this->logger = $logger;
    }

    /**
     * @param ElementEventInterface $event
     *
     * @return void
     */
    public function onPostAdd(ElementEventInterface $event)
    {
        $this->logger->debug('about to send you a notice');
        if (!$event->getObject() instanceof NewsEntry) {
            return;
        }

        $link = $this->newsLinkGenerator->generate($event->getObject());

        $name = $event->getObject()->getKey();
        $mail = new Mail();
        $mail->addTo('mhartung@dachcom.ch');
        $mail->setSubject('new NewsEntry "' . $name . '" created');
        $mail->setBodyText('yeah, believe me! ^_^ see here: ' . $link);

        $mail->send();
    }
}
