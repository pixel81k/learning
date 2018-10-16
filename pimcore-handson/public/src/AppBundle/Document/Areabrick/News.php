<?php

namespace AppBundle\Document\Areabrick;

use Pimcore\Model\DataObject;
use ToolboxBundle\Document\Areabrick\AbstractAreabrick;
use Pimcore\Model\Document\Tag\Area\Info;

class News extends AbstractAreabrick
{
    public function action(Info $info)
    {
        //call this to activate all the toolbox magic.
        parent::action($info);

        $categories = $this->getDocumentTag($info->getDocument(), 'multihref', 'category1')->getElements();
        $limit = $this->getDocumentTag($info->getDocument(), 'numeric', 'limit1')->getData();
        $catList = new DataObject\NewsEntry\Listing();
        foreach ($categories as $cat) {
            $catList->addConditionParam('categories LIKE "%' . $cat->getId() . '%"');
        }

        $page_key = 'page_' . $info->getIndex();

        $paginator = new \Zend\Paginator\Paginator($catList);
        $paginator->setCurrentPageNumber($info->request->get($page_key));
        $paginator->setItemCountPerPage($limit);

        $info->getView()->getParameters()->add([
                'paginator' => $paginator,
                'page_key'  => $page_key
            ]
        );
    }

    public function getName()
    {
        return 'News';
    }

    public function getDescription()
    {
        return 'Displays newest (amount) entries from selected (categories)';
    }

}