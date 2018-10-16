<?php

namespace AppBundle\Controller;

use Pimcore\Model\DataObject\NewsCategory;
use Pimcore\Model\DataObject\NewsEntry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class NewsController extends AbstractController
{
    /**
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function detailAction(Request $request)
    {
        $identifier = $request->get('name');

        try {
            $newsEntries = new NewsEntry\Listing();

            $newsEntries->setCondition('o_key LIKE ?', [$identifier]);
            $newsEntries->setLimit(1);
            $newsEntries->setOffset(0);
            $newsEntries->load();

            $entry = $newsEntries->getItems(0, 1)[0];

        } catch (\Exception $e) {
            $entry = null;
        }

        if (!($entry instanceof NewsEntry)) {
            throw new NotFoundHttpException('Entry (' . $identifier . ') couldn\'t be found');
        }

        foreach ($entry->getCategories() as $category) {
            $category->link = $category->getClass()->getLinkGenerator()->generateCategoryLink($category);
        }

        $params = [
            'entry'    => $entry,
            'backLink' => '../../'
        ];

        return $this->renderTemplate('News/news_detail.html.twig', $params);
    }

    /***
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function catListAction(Request $request)
    {
        $identifier = $request->get('name');

        try {
            $cat = new NewsCategory\Listing();
            $cat->setCondition('o_key="' . $identifier . '"');
            $cat->load();
            $catfound = $cat->getObjects();

            if (sizeof($catfound) != 1) {
                $this->redirect('/' . $request->getLocale());
            }
            $category = $catfound[0];
        } catch (\Exception $e) {
            throw new NotFoundHttpException('Category (' . $identifier . ') couldn\'t be found');
        }

        try {
            $newsEntries = new NewsEntry\Listing();
            $newsEntries->setCondition('categories LIKE "%' . $category->getId() . '%"');
//            $newsEntries->load();
//
//            $entries = $newsEntries->getObjects();
        } catch (\Exception $e) {
            $entries = [];
        }

//        $viewEntries = [];
//
//        foreach ($entries as $entry) {
//            if (!($entry instanceof NewsEntry)) {
//                throw new NotFoundHttpException('Entry (' . $identifier . ') couldn\'t be found');
//            }
//            $entry->detailLink = $entry->getClass()->getLinkGenerator()->generate($entry);
//            array_push($viewEntries, $entry);
//        }

        $paginator = new \Zend\Paginator\Paginator($newsEntries);
        $paginator->setCurrentPageNumber($request->get('page'));
        $paginator->setItemCountPerPage(10);

        return $this->renderTemplate('News/news_cat_list.html.twig',
            [
                'paginator'     => $paginator,
                'backLink' => "/" . $request->getLocale(),
                'category' => $category->getTitle()
            ]
        );
    }

}