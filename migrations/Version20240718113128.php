<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240718113128 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY fk_products_brands');
        $this->addSql('DROP INDEX fk_products_brands ON product');
        $this->addSql('ALTER TABLE product CHANGE bid bid VARCHAR(50) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product CHANGE bid bid INT NOT NULL');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT fk_products_brands FOREIGN KEY (bid) REFERENCES brand (id) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('CREATE INDEX fk_products_brands ON product (bid)');
    }
}
