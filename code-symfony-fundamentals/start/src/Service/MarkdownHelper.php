<?php
/**
 * Created by PhpStorm.
 * User: mhartung
 * Date: 28.08.18
 * Time: 11:31
 */

namespace App\Service;

use Michelf\MarkdownInterface;
use Psr\Cache\InvalidArgumentException;
use Psr\Log\LoggerInterface;
use Symfony\Component\Cache\Adapter\AdapterInterface;

/**
 * Class MarkdownHelper
 *
 * @package App\Service
 */
class MarkdownHelper
{
    /**
     * @var MarkdownInterface
     */
    protected $markdown;
    /**
     * @var AdapterInterface
     */
    protected $cache;
    /**
     * @var LoggerInterface
     */
    protected $logger;
    /**
     * @var bool
     */
    protected $isDebug;

    /**
     * MarkdownHelper constructor.
     *
     * @param MarkdownInterface $markdown
     * @param AdapterInterface  $cache
     * @param LoggerInterface   $markdownLogger
     * @param bool              $isDebug
     */
    public function __construct(MarkdownInterface $markdown, AdapterInterface $cache, LoggerInterface $markdownLogger, bool $isDebug)
    {
        $this->markdown = $markdown;
        $this->cache = $cache;
        $this->logger = $markdownLogger;
        $this->isDebug = $isDebug;
    }

    /**
     * @param string $source
     *
     * @return string
     */
    public function parse(string $source): string
    {
        if (stripos($source, 'bacon') && $this->isDebug) {
            $this->logger->info('They\'re talking about bacon again!');
        }

        $item = null;
        try {
            $item = $this->cache->getItem('markdown_' . md5($source));
        } catch (InvalidArgumentException $e) {
            return $source;
        }

        if (!$item->isHit()) {
            $item->set($this->markdown->transform($source));
            $this->cache->save($item);
        }
        return $item->get();

    }
}