<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241204122145 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE item_types_media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('DROP TABLE item_type_media_object');
        $this->addSql('ALTER TABLE item_type DROP FOREIGN KEY FK_44EE13D23DA5256D');
        $this->addSql('ALTER TABLE item_type ADD CONSTRAINT FK_44EE13D23DA5256D FOREIGN KEY (image_id) REFERENCES item_types_media_object (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE item_type DROP FOREIGN KEY FK_44EE13D23DA5256D');
        $this->addSql('CREATE TABLE item_type_media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE item_types_media_object');
        $this->addSql('ALTER TABLE item_type DROP FOREIGN KEY FK_44EE13D23DA5256D');
        $this->addSql('ALTER TABLE item_type ADD CONSTRAINT FK_44EE13D23DA5256D FOREIGN KEY (image_id) REFERENCES categories_media_object (id)');
    }
}
