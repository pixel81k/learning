<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;

class AjaxController extends AbstractController
{
    /**
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function proxyAction(Request $request)
    {
        if(!$request->isXmlHttpRequest()) {
            throw new \Exception('no valid xmlhttprequest.');
        }

        $controller = ucfirst($request->request->get('proxyController'));
        $action = lcfirst(join(array_map('ucfirst',
            explode('-', $request->request->get('proxyAction')))));

        $request->request->remove('proxyController');
        $request->request->remove('proxyAction');

        $response = $this->forward('AppBundle:' . $controller . ':' . $action);

        return $response;
    }

}
