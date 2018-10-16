<?php

namespace AppBundle\DependencyInjection\CompilerPass;

use AppBundle\Registry\ViewHelperRegistry;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Compiler\PriorityTaggedServiceTrait;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

final class ViewHelperPass implements CompilerPassInterface
{
    use PriorityTaggedServiceTrait;

    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        $viewHelperDefinition = $container->getDefinition(ViewHelperRegistry::class);

        foreach ($container->findTaggedServiceIds('dachcom.view_helper') as $id => $tags) {
            foreach ($tags as $attributes) {
                $viewHelperDefinition->addMethodCall('register', [new Reference($id), $attributes['alias']]);
            }
        }
    }
}