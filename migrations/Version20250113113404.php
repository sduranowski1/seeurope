<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250113113404 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
//        $this->addSql('ALTER TABLE brand DROP polish_name, DROP german_name');
//        $this->addSql('ALTER TABLE enova_contractor ADD location_id INT DEFAULT NULL');
//        $this->addSql('ALTER TABLE enova_contractor ADD CONSTRAINT FK_38F66DC864D218E FOREIGN KEY (location_id) REFERENCES enova_location (id)');
//        $this->addSql('CREATE INDEX IDX_38F66DC864D218E ON enova_contractor (location_id)');
        $this->addSql('ALTER TABLE enova_location ADD id INT AUTO_INCREMENT NOT NULL, DROP PRIMARY KEY, ADD PRIMARY KEY (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F653136F9F FOREIGN KEY (braid) REFERENCES brand (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F69ABFBB85 FOREIGN KEY (varid) REFERENCES variant (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63632DFC5 FOREIGN KEY (catid) REFERENCES category (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F6CC64F614 FOREIGN KEY (scatid) REFERENCES subcategory (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63CF0C7D9 FOREIGN KEY (itypeid) REFERENCES item_type (id)');
//        $this->addSql('CREATE INDEX IDX_466113F653136F9F ON product_info (braid)');
//        $this->addSql('CREATE INDEX IDX_466113F69ABFBB85 ON product_info (varid)');
//        $this->addSql('CREATE INDEX IDX_466113F63632DFC5 ON product_info (catid)');
//        $this->addSql('CREATE INDEX IDX_466113F6CC64F614 ON product_info (scatid)');
//        $this->addSql('CREATE INDEX IDX_466113F63CF0C7D9 ON product_info (itypeid)');
        $this->addSql('ALTER TABLE variant DROP polish_variant_name, DROP german_variant_name');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brand ADD polish_name VARCHAR(50) NOT NULL, ADD german_name VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE enova_contractor DROP FOREIGN KEY FK_38F66DC864D218E');
        $this->addSql('DROP INDEX IDX_38F66DC864D218E ON enova_contractor');
        $this->addSql('ALTER TABLE enova_contractor DROP location_id');
        $this->addSql('ALTER TABLE enova_location MODIFY id INT NOT NULL');
        $this->addSql('DROP INDEX `PRIMARY` ON enova_location');
        $this->addSql('ALTER TABLE enova_location DROP id');
        $this->addSql('ALTER TABLE enova_location ADD PRIMARY KEY (kod)');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F653136F9F');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F69ABFBB85');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63632DFC5');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F6CC64F614');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63CF0C7D9');
        $this->addSql('DROP INDEX IDX_466113F653136F9F ON product_info');
        $this->addSql('DROP INDEX IDX_466113F69ABFBB85 ON product_info');
        $this->addSql('DROP INDEX IDX_466113F63632DFC5 ON product_info');
        $this->addSql('DROP INDEX IDX_466113F6CC64F614 ON product_info');
        $this->addSql('DROP INDEX IDX_466113F63CF0C7D9 ON product_info');
        $this->addSql('ALTER TABLE variant ADD polish_variant_name VARCHAR(50) NOT NULL, ADD german_variant_name VARCHAR(50) NOT NULL');
    }
}
