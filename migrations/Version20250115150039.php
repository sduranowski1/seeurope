<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250115150039 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enova_contractor CHANGE adres_id adres_id VARCHAR(255) DEFAULT NULL, CHANGE adres_korespondencyjny_id adres_korespondencyjny_id VARCHAR(255) DEFAULT NULL, CHANGE kod kod VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE enova_contractor ADD CONSTRAINT FK_38F66DC8F128501D FOREIGN KEY (adres_id) REFERENCES enova_address (id)');
        $this->addSql('ALTER TABLE enova_contractor ADD CONSTRAINT FK_38F66DC8BCF7D015 FOREIGN KEY (adres_korespondencyjny_id) REFERENCES enova_address (id)');
        $this->addSql('ALTER TABLE enova_location CHANGE adres_location_id adres_location_id VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE enova_location ADD CONSTRAINT FK_C9F392EF526363DC FOREIGN KEY (adres_location_id) REFERENCES enova_address (id)');
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
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE enova_contractor DROP FOREIGN KEY FK_38F66DC8F128501D');
        $this->addSql('ALTER TABLE enova_contractor DROP FOREIGN KEY FK_38F66DC8BCF7D015');
        $this->addSql('ALTER TABLE enova_contractor CHANGE adres_id adres_id INT DEFAULT NULL, CHANGE adres_korespondencyjny_id adres_korespondencyjny_id INT DEFAULT NULL, CHANGE kod kod VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE enova_location DROP FOREIGN KEY FK_C9F392EF526363DC');
        $this->addSql('ALTER TABLE enova_location CHANGE adres_location_id adres_location_id INT DEFAULT NULL');
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
    }
}
