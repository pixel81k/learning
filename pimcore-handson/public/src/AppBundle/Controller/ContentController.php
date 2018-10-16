<?php

namespace AppBundle\Controller;

use Pimcore\Model\DataObject\HeaderSlider;
use Pimcore\Model\Asset\Image;
use Symfony\Component\HttpFoundation\Request;

class ContentController extends AbstractController
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
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function headerContentAction(Request $request)
    {
        $type = $request->get('type');

        if ($type === 'image') {
            return $this->renderHeaderImage(Image::getById($request->get('id')));
        } elseif ($type === 'object') {
            return $this->renderHeaderSlider(HeaderSlider::getById($request->get('id')));
        }

    }

    /**
     * @param $image
     * @return \Symfony\Component\HttpFoundation\Response
     */
    private function renderHeaderImage($image)
    {

        if ($image instanceof Image) {

            $params = [
                'image' => $image
            ];

            return $this->renderTemplate('HeaderContent/headerimage.html.twig', $params);
        }
    }

    /**
     * @param $slider
     * @return \Symfony\Component\HttpFoundation\Response
     */
    private function renderHeaderSlider($slider)
    {

        if ($slider instanceof HeaderSlider) {

            $params = [
                'slider' => $slider
            ];

            return $this->renderTemplate('HeaderContent/headerslider.html.twig', $params);
        }

    }


}
