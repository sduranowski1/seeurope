<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241205105131 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE item_type ADD scid INT DEFAULT NULL');
        $this->addSql('ALTER TABLE item_type ADD CONSTRAINT FK_44EE13D2ECBFD0B8 FOREIGN KEY (scid) REFERENCES subcategory (id)');
        $this->addSql('CREATE INDEX IDX_44EE13D2ECBFD0B8 ON item_type (scid)');
        $this->addSql('ALTER TABLE product_info ADD itypeid INT DEFAULT 0 NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE item_type DROP FOREIGN KEY FK_44EE13D2ECBFD0B8');
        $this->addSql('DROP INDEX IDX_44EE13D2ECBFD0B8 ON item_type');
        $this->addSql('ALTER TABLE item_type DROP scid');
        $this->addSql('ALTER TABLE product_info DROP itypeid');
    }
}
