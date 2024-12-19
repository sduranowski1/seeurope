<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241219103708 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enova_product DROP FOREIGN KEY FK_6C88A8A68C52DA48');
        $this->addSql('DROP INDEX IDX_6C88A8A68C52DA48 ON enova_product');
        $this->addSql('ALTER TABLE enova_product ADD ean VARCHAR(255) DEFAULT NULL, ADD unit VARCHAR(50) DEFAULT NULL, ADD stock_status VARCHAR(50) DEFAULT NULL, ADD features JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', ADD price_list JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', ADD individual_prices JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', DROP price, DROP description, CHANGE name name VARCHAR(255) NOT NULL, CHANGE product_info_id quantity INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enova_product ADD price NUMERIC(10, 2) DEFAULT NULL, ADD description LONGTEXT DEFAULT NULL, DROP ean, DROP unit, DROP stock_status, DROP features, DROP price_list, DROP individual_prices, CHANGE name name VARCHAR(255) DEFAULT NULL, CHANGE quantity product_info_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE enova_product ADD CONSTRAINT FK_6C88A8A68C52DA48 FOREIGN KEY (product_info_id) REFERENCES product_info (id)');
        $this->addSql('CREATE INDEX IDX_6C88A8A68C52DA48 ON enova_product (product_info_id)');
    }
}
