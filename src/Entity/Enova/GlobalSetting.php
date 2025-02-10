<?php
// src/Entity/GlobalSetting.php
namespace App\Entity\Enova;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Controller\Admin\GlobalSettingsController;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource(
    operations: [
        new Get(
            uriTemplate: '/global_settings',
            controller: GlobalSettingsController::class,
        ),
        new Post(
            uriTemplate: '/global_settings/{id}',
            controller: GlobalSettingsController::class,
        )
    ]
)]
class GlobalSetting
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private string $sortField = 'id';

    #[ORM\Column(length: 4)]
    private string $sortOrder = 'asc';

    public function getId(): ?int
    {
        return $this->id;
    } // or 'desc'


    public function getSortField(): string
    {
        return $this->sortField;
    }

    public function setSortField(string $sortField): void
    {
        $this->sortField = $sortField;
    }

    public function getSortOrder(): string
    {
        return $this->sortOrder;
    }

    public function setSortOrder(string $sortOrder): void
    {
        $this->sortOrder = $sortOrder;
    }
}
