<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241202155322 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE variants_media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE variant ADD image_id INT DEFAULT NULL, ADD image_path VARCHAR(255) NOT NULL, ADD domain_image_path VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE variant ADD CONSTRAINT FK_F143BFAD3DA5256D FOREIGN KEY (image_id) REFERENCES brands_media_object (id)');
        $this->addSql('CREATE INDEX IDX_F143BFAD3DA5256D ON variant (image_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE variants_media_object');
        $this->addSql('ALTER TABLE variant DROP FOREIGN KEY FK_F143BFAD3DA5256D');
        $this->addSql('DROP INDEX IDX_F143BFAD3DA5256D ON variant');
        $this->addSql('ALTER TABLE variant DROP image_id, DROP image_path, DROP domain_image_path');
    }
}
