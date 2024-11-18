<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241115154909 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fetch_product DROP product_name, DROP description, DROP created_at');
        $this->addSql('ALTER TABLE fetch_product ADD CONSTRAINT FK_4023DF1E8C52DA48 FOREIGN KEY (product_info_id) REFERENCES product_info (id)');
        $this->addSql('CREATE INDEX IDX_4023DF1E8C52DA48 ON fetch_product (product_info_id)');
        $this->addSql('ALTER TABLE product_info ADD image_id INT DEFAULT NULL, CHANGE braid braid INT DEFAULT 0 NOT NULL, CHANGE varid varid INT DEFAULT 0 NOT NULL, CHANGE catid catid INT DEFAULT 0 NOT NULL');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id)');
        $this->addSql('CREATE INDEX IDX_466113F63DA5256D ON product_info (image_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fetch_product DROP FOREIGN KEY FK_4023DF1E8C52DA48');
        $this->addSql('DROP INDEX IDX_4023DF1E8C52DA48 ON fetch_product');
        $this->addSql('ALTER TABLE fetch_product ADD product_name VARCHAR(255) NOT NULL, ADD description TEXT DEFAULT NULL, ADD created_at DATETIME DEFAULT CURRENT_TIMESTAMP');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63DA5256D');
        $this->addSql('DROP INDEX IDX_466113F63DA5256D ON product_info');
        $this->addSql('ALTER TABLE product_info DROP image_id, CHANGE braid braid INT DEFAULT 0, CHANGE varid varid INT DEFAULT 0, CHANGE catid catid INT DEFAULT 0');
    }
}
