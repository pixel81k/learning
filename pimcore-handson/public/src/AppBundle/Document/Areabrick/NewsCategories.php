<?php

namespace AppBundle\Document\Areabrick;

use Pimcore\Model\DataObject;
use ToolboxBundle\Document\Areabrick\AbstractAreabrick;
use Pimcore\Model\Document\Tag\Area\Info;
use Zend\Paginator\Paginator;

class NewsCategories extends AbstractAreabrick
{
    public function action(Info $info)
    {
        //call this to activate all the toolbox magic.
        parent::action($info);
        $categories = new DataObject\NewsCategory\Listing();

        $tmpCats = $categories->getObjects();
        $viewCategories = [];

        foreach ($tmpCats as $tmpCat) {
            array_push($viewCategories, [
                'text' => $tmpCat->getTitle(),
                'link' => $tmpCat->getClass()->getLinkGenerator()->generateCategoryLink($tmpCat)
            ]);
        }

        $info->getView()->categories = $viewCategories;
    }

    public function getName()
    {
        return 'NewsCategories';
    }

    public function getDescription()
    {
        return 'Displays available categories';
    }

}