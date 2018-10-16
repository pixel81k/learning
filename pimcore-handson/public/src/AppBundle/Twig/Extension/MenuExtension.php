<?php

namespace AppBundle\Twig\Extension;

use Pimcore\Model\Document;
use Pimcore\Model\Site;
use Pimcore\Navigation\Page;
use Pimcore\Navigation\Container;
use Pimcore\Templating\Helper\Placeholder;

class MenuExtension extends \Twig_Extension
{
    /**
     * @var Placeholder\ContainerService
     */
    protected $containerService;

    /**
     * MenuExtension constructor.
     *
     * @param Placeholder\ContainerService $containerService
     */
    public function __construct(Placeholder\ContainerService $containerService)
    {
        $this->containerService = $containerService;
    }


    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            new \Twig_Function('dachcom_menu_extend_breadcrumb', [$this, 'extendBreadcrumb']),
            new \Twig_Function('dachcom_menu_start_node', [$this, 'getNavStartNode']),
            new \Twig_Function('dachcom_menu_start_depth_node', [$this, 'getNavStartDepthNode']),
            new \Twig_Function('dachcom_menu_current_depth', [$this, 'getDepth'])
        ];
    }

    /**
     * @param Document $document
     *
     * @return int
     */
    public function getDepth(Document $document)
    {
        $pathFragments = array_filter(explode('/', $document->getPath()));

        return count($pathFragments);
    }

    /**
     * @param Container $container
     *
     * @return Container
     */
    public function extendBreadcrumb(Container $container)
    {
        /** @var Container $placeholderContainer */
        $placeholderContainer = $this->containerService->getContainer('Placeholder_breadcrumb');

        foreach ($placeholderContainer as $breadcrumb) {
            $parentPage = $breadcrumb['parentId'] === 0 ? $container : $container->findBy('id', $breadcrumb['parentId']);

            $parentPage->addPage(Page::factory([
                'id'     => $breadcrumb['id'],
                'uri'    => $breadcrumb['uri'] != '' ? $breadcrumb['uri'] : '',
                'label'  => $breadcrumb['label'],
                'active' => !empty($breadcrumb['label']),
            ]));
        }

        return $container;
    }


    /**
     * @param Document $document
     * @param string   $propertyName
     * @param bool     $useRootAsFallBack
     *
     * @return null|Document
     */
    public function getNavStartNode(Document $document, $propertyName = 'page_start_node', $useRootAsFallBack = TRUE)
    {
        $startNode = $document->getProperty($propertyName);

        if ($useRootAsFallBack === TRUE && empty($startNode)) {
            $startNode = Document::getById(1);
        }

        return $startNode;
    }

    /**
     * @param Document $document
     * @param int      $maxDepthNodeStart
     * @param string   $propertyName
     * @param bool     $useRootAsFallBack
     *
     * @return null|Document
     */
    public function getNavStartDepthNode(Document $document, $maxDepthNodeStart = 0, $propertyName = 'page_start_node', $useRootAsFallBack = TRUE)
    {
        $pathFragments = array_filter(explode('/', $document->getFullPath()));
        $maxSubDocument = array_slice($pathFragments, 0, $maxDepthNodeStart);

        $startNode = $document->getProperty($propertyName);

        if ($useRootAsFallBack === TRUE && empty($startNode)) {
            $startNode = Document::getById(1);
        }

        if (empty($maxSubDocument)) {
            return $startNode;
        }

        $realPath = '';
        if (Site::isSiteRequest()) {
            $realPath = Site::getCurrentSite()->getRootDocument()->getRealFullPath();
        }

        $maxDocument = Document::getByPath($realPath . '/' . implode('/', $maxSubDocument));

        return $maxDocument;
    }
}