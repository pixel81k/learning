<?php /** @noinspection ALL */

namespace AppBundle\ViewHelper;

use Pimcore\Log\ApplicationLogger;
use Pimcore\Model\DataObject\ClassDefinition\LinkGeneratorInterface;
use Pimcore\Model\DataObject\Concrete;
use Pimcore\Model\Staticroute;
use Psr\Log\LoggerInterface;

/**
 * Class NewsLinkGenerator
 *
 * @package AppBundle\ViewHelper
 */
class NewsLinkGenerator implements LinkGeneratorInterface
{
    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * NewsLinkGenerator constructor.
     *
     * @param ApplicationLogger $logger
     */
    public function __construct(ApplicationLogger $logger)
    {
        $this->logger = $logger;
    }

    /**
     * @param Concrete $object
     * @param array    $params
     *
     * @return string
     */
    public function generate(Concrete $object, array $params = []): string
    {
        $staticRoute = Staticroute::getByName('news-detail');
        $path = $staticRoute->assemble([
            'name' => $object->getKey()
        ]);

        $this->logger->debug("generate");

        return $path;
    }

    /**
     * @param Concrete $object
     * @param array    $params
     *
     * @return string
     */
    public function generateCategoryLink(Concrete $object, array $params = []): string
    {
        $staticRoute = Staticroute::getByName('category-list');
        $path = $staticRoute->assemble([
            'name' => $object->getKey()
        ]);

        $this->logger->debug("generateCategoryLink");
        return $path;
    }
}
