<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240711143218 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product ADD surname VARCHAR(50) NOT NULL, ADD company VARCHAR(255) NOT NULL, ADD address VARCHAR(255) NOT NULL, ADD zip_code VARCHAR(10) NOT NULL, ADD country VARCHAR(20) NOT NULL, ADD phone INT NOT NULL, ADD machine_type VARCHAR(255) NOT NULL, ADD consdiered_products VARCHAR(255) NOT NULL, ADD message LONGTEXT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product DROP surname, DROP company, DROP address, DROP zip_code, DROP country, DROP phone, DROP machine_type, DROP consdiered_products, DROP message');
    }
}
