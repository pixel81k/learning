<?php 

return [
    1 => [
        "id" => 1,
        "name" => "Teaser Snippet",
        "module" => "ToolboxBundle",
        "controller" => "Snippet",
        "action" => "teaser",
        "template" => "",
        "type" => "snippet",
        "priority" => 0,
        "creationDate" => 1518523790,
        "modificationDate" => 1518523790,
        "legacy" => FALSE
    ],
    2 => [
        "id" => 2,
        "name" => "Without Side Navigation",
        "module" => NULL,
        "controller" => "@AppBundle\\Controller\\DefaultController",
        "action" => "nosnav",
        "template" => NULL,
        "type" => "page",
        "priority" => 0,
        "creationDate" => 1518534837,
        "modificationDate" => 1519146797,
        "legacy" => FALSE
    ],
    3 => [
        "id" => 3,
        "name" => "Footer Snippet",
        "module" => NULL,
        "controller" => "@AppBundle\\Controller\\SnippetController",
        "action" => "default",
        "template" => "Snippet/footer.html.twig",
        "type" => "snippet",
        "priority" => 0,
        "creationDate" => 1518608407,
        "modificationDate" => 1518608440,
        "legacy" => FALSE
    ],
    4 => [
        "id" => 4,
        "name" => "2 Columns Page",
        "module" => NULL,
        "controller" => "@AppBundle\\Controller\\DefaultController",
        "action" => "twocolumns",
        "template" => NULL,
        "type" => "page",
        "priority" => 0,
        "creationDate" => 1519054106,
        "modificationDate" => 1519054176,
        "legacy" => FALSE
    ],
    5 => [
        "id" => 5,
        "name" => "Email",
        "module" => NULL,
        "controller" => "@AppBundle\\Controller\\EmailController",
        "action" => "default",
        "template" => NULL,
        "type" => "email",
        "priority" => 0,
        "creationDate" => 1519114475,
        "modificationDate" => 1519114492,
        "legacy" => FALSE
    ],
    6 => [
        "id" => 6,
        "name" => "Snippet",
        "module" => NULL,
        "controller" => "@AppBundle\\Controller\\SnippetController",
        "action" => "default",
        "template" => NULL,
        "type" => "snippet",
        "priority" => 0,
        "creationDate" => 1519114985,
        "modificationDate" => 1519115897,
        "legacy" => FALSE
    ]
];
