<?php
// src/Entity/FetchProduct.php
namespace App\Entity\Enova;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\FetchProduct\FetchProductByIdController;
use App\Controller\FetchProduct\FetchProductsController;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Enova\ProductInfo; // Import the ProductInfo entity

#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/PanelWWW_API/DajTowarWgId',
            controller: FetchProductByIdController::class,
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
            uriTemplate: '/PanelWWW_API/DajTowary',
            controller: FetchProductsController::class,
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
                                    'pokazCeny' => ['type' => 'boolean', 'example' => true],
                                ],
                                'additionalProperties' => false, // Allow extra properties if needed
                            ],
                            'example' => [
                                'strona' => 0,
                                'limit' => 0,
                                'poleSortowane' => 'string',
                                'czyRosnaco' => 0,
                                'dataAktualizacji' => '2024-11-07T11:44:00.099Z',
                                'pokazCeny' => true,
                            ],
                        ]
                    ])
                )
            ),
            paginationEnabled: true,
            paginationItemsPerPage: 10,
            description: 'Fetch products data based on parameters.',
            output: false,   // No output entity needed
            read: false,
        ),
    ]
)]
#[ApiFilter(SearchFilter::class, properties: [
    'productInfo.kod' => 'partial', // Allow searching by partial matches on 'kod'
    'productInfo.nazwa' => 'partial', // Allow searching by partial matches on 'nazwa'
])]
#[ORM\Entity]
class FetchProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: ProductInfo::class)]
    #[ORM\JoinColumn(name: "product_info_id", referencedColumnName: "id")]
    private ?ProductInfo $productInfo = null;

    // Getter and Setter methods for the relationship
    public function getProductInfo(): ?ProductInfo
    {
        return $this->productInfo;
    }

    public function setProductInfo(?ProductInfo $productInfo): self
    {
        $this->productInfo = $productInfo;
        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}