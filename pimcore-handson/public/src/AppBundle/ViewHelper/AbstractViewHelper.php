<?php

namespace AppBundle\ViewHelper;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Templating\EngineInterface;
use Pimcore\Model\Document;

abstract class AbstractViewHelper
{
    /**
     * @var EngineInterface
     */
    var $templating;

    /**
     * @var RequestStack
     */
    var $requestStack;

    /**
     * @var Document
     */
    var $document;

    /**
     * @var bool
     */
    var $editMode = FALSE;

    /**
     * ElementBuilder constructor.
     *
     * @param EngineInterface $templating
     * @param RequestStack    $requestStack
     */
    public function __construct(
        EngineInterface $templating,
        RequestStack $requestStack
    ) {
        $this->templating = $templating;
        $this->requestStack = $requestStack;
    }

    /**
     * @param Document $document
     */
    public function setDocument(Document $document)
    {
        $this->document = $document;
    }

    /**
     * @return mixed
     */
    public function getDocument()
    {
        return $this->document;
    }

    /**
     * @param string $editMode
     */
    public function setEditMode($editMode)
    {
        $this->editMode = $editMode;
    }

    /**
     * @return mixed
     */
    public function isEditMode()
    {
        return $this->editMode;
    }

}