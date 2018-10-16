<?php

namespace AppBundle\Navigation\Renderer;

use Pimcore\Navigation\Container;
use Pimcore\Navigation\Page;
use Pimcore\Navigation\Renderer\Breadcrumbs;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BootstrapBreadcrumb extends Breadcrumbs
{
    /**
     * @var string
     */
    private $listType;

    /**
     * @var string
     */
    private $listClass;

    /**
     * @var string
     */
    private $itemClass;

    public function htmlify(Page $page, $isActive = false)
    {
        return sprintf('<li%s>%s</li>', $this->getListItemAttributes($isActive), parent::htmlify($page));
    }

    /**
     * @param bool $isActive
     *
     * @return string
     */
    protected function getListItemAttributes($isActive = false)
    {
        return $this->_htmlAttribs([
            'class' => $this->itemClass . ($isActive ? ' active' : '')
        ]);
    }

    /**
     * Add listitems to a string of listitems
     *
     * @param string $listItems
     * @param array  $items
     * @param bool   $prepend If true, the items will be prepended, otherwise apended
     *
     * @return string
     */
    protected function addItems(string $listItems, array $items, $prepend = false)
    {
        $listItemContent = '';

        foreach ($items as $item) {
            if (is_string($item)) {
                $listItemContent = $item;
            } elseif (is_array($item)) {
                if (isset($item['name']) && isset($item['name'])) {
                    $listItemContent = sprintf('<a href="%s">%s</a>', $item['link'], $item['name']);
                } else {
                    throw new \InvalidArgumentException('Breadcrumb append/prepend array can only contain properties "name" & "link"');
                }
            }

            $listItem = sprintf('<li%s>%s</li>', $this->getListItemAttributes(), $listItemContent);
            $listItems = $prepend ? $listItem . $listItems : $listItems . $listItem;
        }

        return $listItems;
    }

    public function generateList(string $listItems)
    {
        $listAttribs = [
            'class' => $this->listClass
        ];

        return sprintf('<%s%s>%s</%s>', $this->listType, $this->_htmlAttribs($listAttribs), $listItems, $this->listType);
    }

    public function renderBreadcrumbs(Container $container, array $options = [])
    {
        $resolver = new OptionsResolver();
        $resolver->setDefaults([
            'listType'     => 'ol',
            'listClass'    => 'breadcrumb',
            'itemClass'    => 'breadcrumb-item',
            'prependLinks' => [],
            'appendLinks'  => []
        ]);
        $resolver->setAllowedValues('listType', ['ol', 'ul']);
        $resolver->setAllowedTypes('prependLinks', 'array');
        $resolver->setAllowedTypes('appendLinks', 'array');

        $options         = $resolver->resolve($options);
        $this->listType  = $options['listType'];
        $this->listClass = $options['listClass'];
        $this->itemClass = $options['itemClass'];

        if (!$activePage = $this->findActive($container, 0)) {
            return '';
        }

        /** @var Page $activePage */
        $activePage = $activePage['page'];
        $listItems  = $this->htmlify($activePage, true);

        while ($parent = $activePage->getParent()) {
            if ($parent instanceof Page && strpos($listItems, $parent->getLabel()) === false) {
                $listItems = $this->htmlify($parent) . $listItems;
            }

            if ($parent === $container) {
                break;
            }

            $activePage = $parent;
        }

        if (!empty($options['prependLinks'])) {
            $listItems = $this->addItems($listItems, $options['prependLinks'], true);
        }
        if (!empty($options['appendLinks'])) {
            $listItems = $this->addItems($listItems, $options['appendLinks']);
        }

        return $this->generateList($listItems);
    }
}
