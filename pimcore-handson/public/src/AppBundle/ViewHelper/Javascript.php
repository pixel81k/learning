<?php

namespace AppBundle\ViewHelper;

class Javascript extends AbstractViewHelper
{
    /**
     * @return mixed
     */
    public function getGlobalVars()
    {
        //remove locale from ajax url, if no language slug is needed.
        $locale = $this->requestStack->getCurrentRequest()->getLocale();

        $config = [
            'language'     => $locale,
            'baseUrl'      => $this->requestStack->getMasterRequest()->getBaseUrl(),
            'ajaxUrl'      => $this->requestStack->getMasterRequest()->getBaseUrl() . DIRECTORY_SEPARATOR . $locale . DIRECTORY_SEPARATOR . 'ajax/',
            'translations' => [
                'website' => []
            ]
        ];

        return $this->templating->render('/ViewHelper/javascript/config.html.twig', ['config' => $config]);
    }
}