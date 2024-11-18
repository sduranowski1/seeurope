<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241115100642 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE product_info MODIFY varid INT DEFAULT 0');
        $this->addSql('ALTER TABLE product_info MODIFY braid INT DEFAULT 0');
        $this->addSql('ALTER TABLE product_info MODIFY catid INT DEFAULT 0');
    }

    public function down(Schema $schema): void
    {
        // Reverse the changes if needed (e.g., set them to NOT NULL)
        $this->addSql('ALTER TABLE product_info MODIFY varid INT NOT NULL DEFAULT 0');
        $this->addSql('ALTER TABLE product_info MODIFY braid INT NOT NULL DEFAULT 0');
        $this->addSql('ALTER TABLE product_info MODIFY catid INT NOT NULL DEFAULT 0');
    }

}
