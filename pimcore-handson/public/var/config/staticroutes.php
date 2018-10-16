<?php 

return [
    3 => [
        "id" => 3,
        "name" => "news-detail",
        "pattern" => "/\\/\\w+\\/news\\/(.*)/",
        "reverse" => "/%_locale/news/%name",
        "module" => "AppBundle",
        "controller" => "@AppBundle\\Controller\\NewsController",
        "action" => "detail",
        "variables" => "name",
        "defaults" => "",
        "siteId" => [

        ],
        "priority" => 0,
        "legacy" => FALSE,
        "creationDate" => 1534323951,
        "modificationDate" => 1534500850
    ],
    4 => [
        "id" => 4,
        "name" => "category-list",
        "pattern" => "/\\/\\w+\\/catlist\\/(.*)/",
        "reverse" => "/%_locale/catlist/%name",
        "module" => "AppBundle",
        "controller" => "@AppBundle\\Controller\\NewsController",
        "action" => "catList",
        "variables" => "name",
        "defaults" => "",
        "siteId" => [

        ],
        "priority" => 0,
        "legacy" => FALSE,
        "creationDate" => 1534489120,
        "modificationDate" => 1534498832
    ]
];
