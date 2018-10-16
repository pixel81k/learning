<?php

namespace AppBundle\ViewHelper;

class Localisation extends AbstractViewHelper
{
    /**
     * @param $params
     * @return string
     */
    public function getLocalizedfield($params)
    {
        $string = '';
        $localizedfields = $params['localizedfields'];
        $variableName = $params['data_type'];

        $local = $this->requestStack->getCurrentRequest()->getLocale();
        $language = explode('_', $local)[0];

        if(array_key_exists($local, $localizedfields->items)) {
            $string = $localizedfields->items[$local][$variableName];
        } else if (array_key_exists($language, $localizedfields->items)) {
            $string = $localizedfields->items[$language][$variableName];
        }

        return $string;
    }
}