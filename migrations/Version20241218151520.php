<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241218151520 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE enova_product (id INT NOT NULL, product_info_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, price NUMERIC(10, 2) DEFAULT NULL, description LONGTEXT DEFAULT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_6C88A8A68C52DA48 (product_info_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE enova_product ADD CONSTRAINT FK_6C88A8A68C52DA48 FOREIGN KEY (product_info_id) REFERENCES product_info (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enova_product DROP FOREIGN KEY FK_6C88A8A68C52DA48');
        $this->addSql('DROP TABLE enova_product');
    }
}
