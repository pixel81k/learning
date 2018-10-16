<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;

class DefaultController extends AbstractController
{
    /**
     * @param Request $request
	 *
	 * @return void|array
     */
    public function defaultAction(Request $request)
	{
	
	}

    /**
     * @param Request $request
     *
     * @return void|array
     */
    public function nosnavAction(Request $request)
    {

    }

    /**
     * @param Request $request
     *
     * @return void|array
     */
    public function twocolumnsAction(Request $request)
    {

    }

    /**
     * @param Request $request
     *
     * @return void|array
     */
    public function errorAction(Request $request)
    {

    }
	
}