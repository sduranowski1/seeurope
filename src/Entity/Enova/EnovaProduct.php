<?php

// src/Entity/FetchProduct.php
namespace App\Entity\Enova;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\FetchProduct\FetchProductByCodeController;
use App\Controller\FetchProduct\FetchProductByIdController;
use App\Controller\FetchProduct\FetchProductsController;
use App\Entity\Enova\ProductInfo;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

//use App\Entity\Enova\ProductInfo;

// Import the ProductInfo entity

//#[ApiResource(
//    operations: [
//        new Post(
//            uriTemplate: '/PanelWWW_API/DajTowarWgId',
//            controller: FetchProductByIdController::class,
//            openapi: new Model\Operation(
//                summary: 'Fetch an individual product details by parameter',
//                description: 'Fetch the product details based on the provided "parametr". This will return product information.',
//                requestBody: new Model\RequestBody(
//                    content: new \ArrayObject([
//                        'application/json' => [
//                            'schema' => [
//                                'type' => 'object',
//                                'properties' => [
//                                    'parametr' => ['type' => 'integer', 'example' => 0]
//                                ]
//                            ],
//                            'example' => [
//                                'parametr' => 0
//                            ]
//                        ]
//                    ])
//                )
//            ),
//            paginationEnabled: false,
//            description: 'Fetch an individual product data based on parameter.', // We don't need an output entity
//            output: false,   // We don't need to read anything from the entity
//            read: false,
//        ),
//        new Post(
//            uriTemplate: '/PanelWWW_API/DajTowarWgKod',
//            controller: FetchProductByCodeController::class,
//            openapi: new Model\Operation(
//                summary: 'Fetch an individual product details by parameter',
//                description: 'Fetch the product details based on the provided "parametr". This will return product information.',
//                requestBody: new Model\RequestBody(
//                    content: new \ArrayObject([
//                        'application/json' => [
//                            'schema' => [
//                                'type' => 'object',
//                                'properties' => [
//                                    'parametr' => ['type' => 'integer', 'example' => 0]
//                                ]
//                            ],
//                            'example' => [
//                                'parametr' => 0
//                            ]
//                        ]
//                    ])
//                )
//            ),
//            paginationEnabled: false,
//            description: 'Fetch an individual product data based on parameter.', // We don't need an output entity
//            output: false,   // We don't need to read anything from the entity
//            read: false,
//        ),
//        new Post(
//            uriTemplate: '/PanelWWW_API/DajTowary',
//            controller: FetchProductsController::class,
//            openapi: new Model\Operation(
//                summary: 'Fetch products data based on given parameters.',
//                description: 'Fetch products data based on parameters like strona, limit, poleSortowane, etc. This will return product information.',
//                requestBody: new Model\RequestBody(
//                    content: new \ArrayObject([
//                        'application/json' => [
//                            'schema' => [
//                                'type' => 'object',
//                                'properties' => [
//                                    'strona' => ['type' => 'integer', 'example' => 0],
//                                    'limit' => ['type' => 'integer', 'example' => 0],
//                                    'poleSortowane' => ['type' => 'string', 'example' => 'string'],
//                                    'czyRosnaco' => ['type' => 'integer', 'example' => 0],
//                                    'dataAktualizacji' => ['type' => 'string', 'format' => 'date-time', 'example' => '2024-11-07T11:44:00.099Z'],
//                                    'pokazCeny' => ['type' => 'boolean', 'example' => true],
//                                ],
//                                'additionalProperties' => false, // Allow extra properties if needed
//                            ],
//                            'example' => [
//                                'strona' => 0,
//                                'limit' => 0,
//                                'poleSortowane' => 'string',
//                                'czyRosnaco' => 0,
//                                'dataAktualizacji' => '2024-11-07T11:44:00.099Z',
//                                'pokazCeny' => true,
//                            ],
//                        ]
//                    ])
//                )
//            ),
//            paginationEnabled: true,
//            paginationItemsPerPage: 10,
//            description: 'Fetch products data based on parameters.',
//            output: false,   // No output entity needed
//            read: false,
//        ),
//    ]
//)]
#[ApiResource(
    normalizationContext: ['groups' => ['enovaProduct:read']],
    denormalizationContext: ['groups' => ['enovaProduct:create']]

)]
#[ApiFilter(SearchFilter::class, properties: [
    'productInfo.code' => 'partial', // Allow searching by partial matches on 'kod'
    'productInfo.name' => 'partial', // Allow searching by partial matches on 'nazwa'
])]
#[ORM\Entity]
class EnovaProduct
{
    #[ORM\Id]
//    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[ORM\Column(type: "integer")]
    #[Groups(['enovaProduct:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: ProductInfo::class)]
    #[ORM\JoinColumn(name: "product_info_id", referencedColumnName: "id")]
    #[Groups(['enovaProduct:read', 'enovaProduct:create'])]
    private ?ProductInfo $productInfo = null;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(['enovaProduct:read', 'enovaProduct:create', 'enovaProduct:update'])]
    private ?string $name = null;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(['enovaProduct:read', 'enovaProduct:create', 'enovaProduct:update'])]
    private ?string $code = null;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(['enovaProduct:read', 'enovaProduct:create', 'enovaProduct:update'])]
    private ?string $ean = null;

    #[ORM\Column(type: "string", length: 50, nullable: true)]
    #[Groups(['enovaProduct:read', 'enovaProduct:create', 'enovaProduct:update'])]
    private ?string $unit = null;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['enovaProduct:read', 'enovaProduct:create', 'enovaProduct:update'])]
    private ?int $quantity = null;

    #[ORM\Column(type: "string", length: 50, nullable: true)]
    #[Groups(['enovaProduct:read', 'enovaProduct:create', 'enovaProduct:update'])]
    private ?string $stockStatus = null;

    #[ORM\Column(type: "json", nullable: true)]
    #[Groups(['enovaProduct:read', 'enovaProduct:create', 'enovaProduct:update'])]
    private ?array $features = [];

    #[ORM\Column(type: "json", nullable: true)]
    #[Groups(['enovaProduct:read', 'enovaProduct:create', 'enovaProduct:update'])]
    private ?array $priceList = [];

    #[ORM\Column(type: "json", nullable: true)]
    #[Groups(['enovaProduct:read', 'enovaProduct:create', 'enovaProduct:update'])]
    private ?array $individualPrices = [];

    // Additional fields can be added here as needed
    #[ORM\Column(type: "datetime", nullable: true)]
    #[Groups(['enovaProduct:read', 'enovaProduct:create', 'enovaProduct:update'])]
    private ?\DateTimeInterface $updatedAt = null;

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

    // Getter and Setter for name
    public function getName(): ?string
    {
        return $this->name;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(?string $code): void
    {
        $this->code = $code;
    }



    public function getEan(): ?string
    {
        return $this->ean;
    }

    public function setEan(?string $ean): self
    {
        $this->ean = $ean;
        return $this;
    }

    public function getUnit(): ?string
    {
        return $this->unit;
    }

    public function setUnit(?string $unit): self
    {
        $this->unit = $unit;
        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(?int $quantity): self
    {
        $this->quantity = $quantity;
        return $this;
    }

    public function getStockStatus(): ?string
    {
        return $this->stockStatus;
    }

    public function setStockStatus(?string $stockStatus): self
    {
        $this->stockStatus = $stockStatus;
        return $this;
    }

    public function getFeatures(): ?array
    {
        return $this->features;
    }

    public function setFeatures(?array $features): self
    {
        $this->features = $features;
        return $this;
    }

    public function getPriceList(): ?array
    {
        return $this->priceList;
    }

    public function setPriceList(?array $priceList): self
    {
        $this->priceList = $priceList;
        return $this;
    }

    public function getIndividualPrices(): ?array
    {
        return $this->individualPrices;
    }

    public function setIndividualPrices(?array $individualPrices): self
    {
        $this->individualPrices = $individualPrices;
        return $this;
    }

    // Getter and Setter for updatedAt
    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }
}