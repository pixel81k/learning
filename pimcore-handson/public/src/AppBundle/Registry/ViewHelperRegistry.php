<?php

namespace AppBundle\Registry;

class ViewHelperRegistry
{
    /**
     * @var array
     */
    protected $types;

    /**
     * @var string
     */
    private $abstractClass;

    /**
     * @param string $abstractClass
     */
    public function __construct($abstractClass)
    {
        $this->abstractClass = $abstractClass;
    }

    /**
     * {@inheritdoc}
     */
    public function register($service, $alias)
    {
        if (!is_subclass_of($service, $this->abstractClass)) {
            throw new \InvalidArgumentException(
                sprintf('%s needs to be a subclass of "%s".', get_class($service), $this->abstractClass)
            );
        }

        $this->types[$alias] = $service;
    }

    /**
     * {@inheritdoc}
     */
    public function has($alias)
    {
        return isset($this->types[$alias]);
    }

    /**
     * {@inheritdoc}
     */
    public function get($alias)
    {
        if (!$this->has($alias)) {
            throw new \Exception('"' . $alias . '" View Helper Identifier does not exist');
        }

        return $this->types[$alias];
    }
}
