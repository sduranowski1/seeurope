<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241204103503 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63DA5256D');
//        $this->addSql('CREATE TABLE products_media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
//        $this->addSql('DROP TABLE media_object');
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63DA5256D');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63DA5256D FOREIGN KEY (image_id) REFERENCES products_media_object (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63DA5256D');
//        $this->addSql('CREATE TABLE media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
//        $this->addSql('DROP TABLE products_media_object');
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63DA5256D');
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63DA5256D');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63DA5256D FOREIGN KEY (image_id) REFERENCES media_object (id)');
    }
}
