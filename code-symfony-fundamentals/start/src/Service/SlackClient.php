<?php
/**
 * Created by PhpStorm.
 * User: mhartung
 * Date: 28.08.18
 * Time: 16:35
 */

namespace App\Service;

use App\Helper\LoggerTrait;
use Nexy\Slack\Client;

/**
 * Class SlackMessenger
 *
 * @package App\Service
 */
class SlackClient
{
    use LoggerTrait;

    /**
     * @var Client
     */
    protected $slackClient;

    /**
     * SlackMessenger constructor.
     *
     * @param Client $slackClient
     */
    public function __construct(Client $slackClient)
    {
        $this->slackClient = $slackClient;
    }

    /**
     * @param string $from
     * @param string $message
     *
     * @throws \Http\Client\Exception
     */
    public function sendMessage(string $from, string $message)
    {
        $this->logInfo('sending a message to slack...', ['message'=>$message]);

        $slackMessage = $this->slackClient->createMessage()
            ->from($from)
            ->withIcon(':ghost:')
            ->setText($message);

        $this->slackClient->sendMessage($slackMessage);
    }
}