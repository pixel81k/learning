<?php

namespace AppBundle\Twig\Extension;

use AppBundle\Registry\ViewHelperRegistry;
use AppBundle\ViewHelper\AbstractViewHelper;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Pimcore\Model\Document\PageSnippet;

class ViewHelperExtension extends \Twig_Extension
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @var ViewHelperRegistry
     */
    protected $viewHelperRegistry;

    /**
     * @param ContainerInterface $container
     * @param ViewHelperRegistry $viewHelperRegistry
     */
    public function __construct(ContainerInterface $container, ViewHelperRegistry $viewHelperRegistry)
    {
        $this->container = $container;
        $this->viewHelperRegistry = $viewHelperRegistry;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('dachcom_view_helper', [$this, 'callViewHelper'], [
                'needs_context' => TRUE,
                'is_safe'       => ['html'],
            ])
        ];
    }

    /**
     * @see \Pimcore\View::tag
     *
     * @param array  $context
     * @param string $viewHelperName
     * @param string $viewHelperMethod
     * @param array  $options
     *
     * @return \Pimcore\Model\Document\Tag|string
     */
    public function callViewHelper($context, $viewHelperName, $viewHelperMethod, array $options = [])
    {
        $document = $context['document'];
        if (!($document instanceof PageSnippet)) {
            return '';
        }

        /** @var AbstractViewHelper $viewHelperService */
        $viewHelperService = $this->viewHelperRegistry->get($viewHelperName);
        $viewHelperService->setEditMode($context['editmode']);
        $viewHelperService->setDocument($document);

        return call_user_func_array([$viewHelperService, $viewHelperMethod], [$options]);
    }
}