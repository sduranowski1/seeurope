<?php

// src/Entity/FetchProduct.php
namespace App\Entity\Enova;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\FetchContractor\FetchContractorByIdController;
use App\Controller\FetchContractor\FetchContractorPeopleController;
use App\Controller\FetchContractor\FetchContractorsController;

#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/PanelWWW_API/DajKontrahentaWgId',
            controller: FetchContractorByIdController::class,
            openapi: new Model\Operation(
                summary: 'Fetch an individual product details by parameter',
                description: 'Fetch the product details based on the provided "parametr". This will return product information.',
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'parametr' => ['type' => 'integer', 'example' => 0]
                                ]
                            ],
                            'example' => [
                                'parametr' => 0
                            ]
                        ]
                    ])
                )
            ),
            paginationEnabled: false,
            description: 'Fetch an individual product data based on parameter.', // We don't need an output entity
            output: false,   // We don't need to read anything from the entity
            read: false,
        ),
        new Post(
            uriTemplate: '/PanelWWW_API/DajKontrahentow',
            controller: FetchContractorsController::class,
            openapi: new Model\Operation(
                summary: 'Fetch products data based on given parameters.',
                description: 'Fetch products data based on parameters like strona, limit, poleSortowane, etc. This will return product information.',
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'strona' => ['type' => 'integer', 'example' => 0],
                                    'limit' => ['type' => 'integer', 'example' => 0],
                                    'poleSortowane' => ['type' => 'string', 'example' => 'string'],
                                    'czyRosnaco' => ['type' => 'integer', 'example' => 0],
                                    'dataAktualizacji' => ['type' => 'string', 'format' => 'date-time', 'example' => '2024-11-07T11:44:00.099Z'],
                                ],
                                'additionalProperties' => false, // Allow extra properties if needed
                            ],
                            'example' => [
                                'strona' => 0,
                                'limit' => 0,
                                'poleSortowane' => 'string',
                                'czyRosnaco' => 0,
                                'dataAktualizacji' => '2024-11-07T11:44:00.099Z',
                            ],
                        ]
                    ])
                )
            ),
            paginationEnabled: false,
            description: 'Fetch products data based on parameters.',
            output: false,   // No output entity needed
            read: false,
        ),
        new Post(
            uriTemplate: '/PanelWWW_API/DajLudziKontrahentow',
            controller: FetchContractorPeopleController::class,
            openapi: new Model\Operation(
                summary: 'Fetch products data based on given parameters.',
                description: 'Fetch products data based on parameters like strona, limit, poleSortowane, etc. This will return product information.',
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'strona' => ['type' => 'integer', 'example' => 0],
                                    'limit' => ['type' => 'integer', 'example' => 0],
                                    'poleSortowane' => ['type' => 'string', 'example' => 'string'],
                                    'czyRosnaco' => ['type' => 'integer', 'example' => 0],
                                    'dataAktualizacji' => ['type' => 'string', 'format' => 'date-time', 'example' => '2024-11-07T11:44:00.099Z'],
                                ],
                                'additionalProperties' => false, // Allow extra properties if needed
                            ],
                            'example' => [
                                'strona' => 0,
                                'limit' => 0,
                                'poleSortowane' => 'string',
                                'czyRosnaco' => 0,
                                'dataAktualizacji' => '2024-11-07T11:44:00.099Z',
                            ],
                        ]
                    ])
                )
            ),
            paginationEnabled: false,
            description: 'Fetch products data based on parameters.',
            output: false,   // No output entity needed
            read: false,
        ),
    ]
)]
class FetchContractor
{
    // You can leave this class empty if it's just for the controller's routing
}