<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241219131208 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enova_product DROP FOREIGN KEY FK_6C88A8A6BF396750');
        $this->addSql('ALTER TABLE enova_product ADD product_info_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE enova_product ADD CONSTRAINT FK_6C88A8A68C52DA48 FOREIGN KEY (product_info_id) REFERENCES product_info (id)');
        $this->addSql('CREATE INDEX IDX_6C88A8A68C52DA48 ON enova_product (product_info_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enova_product DROP FOREIGN KEY FK_6C88A8A68C52DA48');
        $this->addSql('DROP INDEX IDX_6C88A8A68C52DA48 ON enova_product');
        $this->addSql('ALTER TABLE enova_product DROP product_info_id');
        $this->addSql('ALTER TABLE enova_product ADD CONSTRAINT FK_6C88A8A6BF396750 FOREIGN KEY (id) REFERENCES product_info (id)');
    }
}
