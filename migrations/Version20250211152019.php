<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250211152019 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
//        $this->addSql('DROP INDEX `primary` ON enova_contractor');
//        $this->addSql('CREATE UNIQUE INDEX UNIQ_38F66DC8A2D7CD83 ON enova_contractor (id_enova)');
//        $this->addSql('ALTER TABLE enova_contractor ADD PRIMARY KEY (id)');
//        $this->addSql('ALTER TABLE product_info ADD english_title LONGTEXT DEFAULT NULL, ADD german_title LONGTEXT DEFAULT NULL, ADD couplingFilterId INT DEFAULT 0');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F653136F9F FOREIGN KEY (braid) REFERENCES brand (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F69ABFBB85 FOREIGN KEY (varid) REFERENCES variant (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F67D00A518 FOREIGN KEY (couplingFilterId) REFERENCES coupling_filter (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63632DFC5 FOREIGN KEY (catid) REFERENCES category (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F6CC64F614 FOREIGN KEY (scatid) REFERENCES subcategory (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63CF0C7D9 FOREIGN KEY (itypeid) REFERENCES item_type (id)');
//        $this->addSql('CREATE INDEX IDX_466113F653136F9F ON product_info (braid)');
//        $this->addSql('CREATE INDEX IDX_466113F69ABFBB85 ON product_info (varid)');
//        $this->addSql('CREATE INDEX IDX_466113F67D00A518 ON product_info (couplingFilterId)');
//        $this->addSql('CREATE INDEX IDX_466113F63632DFC5 ON product_info (catid)');
//        $this->addSql('CREATE INDEX IDX_466113F6CC64F614 ON product_info (scatid)');
//        $this->addSql('CREATE INDEX IDX_466113F63CF0C7D9 ON product_info (itypeid)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_38F66DC8A2D7CD83 ON enova_contractor');
        $this->addSql('DROP INDEX `PRIMARY` ON enova_contractor');
        $this->addSql('ALTER TABLE enova_contractor ADD PRIMARY KEY (id_enova)');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F653136F9F');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F69ABFBB85');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F67D00A518');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63632DFC5');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F6CC64F614');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63CF0C7D9');
        $this->addSql('DROP INDEX IDX_466113F653136F9F ON product_info');
        $this->addSql('DROP INDEX IDX_466113F69ABFBB85 ON product_info');
        $this->addSql('DROP INDEX IDX_466113F67D00A518 ON product_info');
        $this->addSql('DROP INDEX IDX_466113F63632DFC5 ON product_info');
        $this->addSql('DROP INDEX IDX_466113F6CC64F614 ON product_info');
        $this->addSql('DROP INDEX IDX_466113F63CF0C7D9 ON product_info');
        $this->addSql('ALTER TABLE product_info DROP english_title, DROP german_title, DROP couplingFilterId');
    }
}
