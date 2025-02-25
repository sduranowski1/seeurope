<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250225141602 extends AbstractMigration
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
        $this->addSql('ALTER TABLE features_list DROP FOREIGN KEY FK_A0DD47473B69A9AF');
        $this->addSql('ALTER TABLE features_list DROP FOREIGN KEY FK_A0DD4747CE11AAC7');
        $this->addSql('ALTER TABLE features_list DROP FOREIGN KEY FK_A0DD474712469DE2');
        $this->addSql('ALTER TABLE features_list DROP FOREIGN KEY FK_A0DD47475DC6FE57');
        $this->addSql('DROP INDEX fk_a0dd47473b69a9af ON features_list');
        $this->addSql('CREATE INDEX IDX_A0DD47473B69A9AF ON features_list (variant_id)');
        $this->addSql('DROP INDEX fk_a0dd474712469de2 ON features_list');
        $this->addSql('CREATE INDEX IDX_A0DD474712469DE2 ON features_list (category_id)');
        $this->addSql('DROP INDEX fk_a0dd47475dc6fe57 ON features_list');
        $this->addSql('CREATE INDEX IDX_A0DD47475DC6FE57 ON features_list (subcategory_id)');
        $this->addSql('DROP INDEX fk_a0dd4747ce11aac7 ON features_list');
        $this->addSql('CREATE INDEX IDX_A0DD4747CE11AAC7 ON features_list (item_type_id)');
        $this->addSql('ALTER TABLE features_list ADD CONSTRAINT FK_A0DD47473B69A9AF FOREIGN KEY (variant_id) REFERENCES variant (id)');
        $this->addSql('ALTER TABLE features_list ADD CONSTRAINT FK_A0DD4747CE11AAC7 FOREIGN KEY (item_type_id) REFERENCES item_type (id)');
        $this->addSql('ALTER TABLE features_list ADD CONSTRAINT FK_A0DD474712469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE features_list ADD CONSTRAINT FK_A0DD47475DC6FE57 FOREIGN KEY (subcategory_id) REFERENCES subcategory (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F653136F9F FOREIGN KEY (braid) REFERENCES brand (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F69ABFBB85 FOREIGN KEY (varid) REFERENCES variant (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F69613832D FOREIGN KEY (coupling_filter_id) REFERENCES coupling_filter (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F6C75F89DD FOREIGN KEY (machine_filter_id) REFERENCES machine_filter (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63632DFC5 FOREIGN KEY (catid) REFERENCES category (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F6CC64F614 FOREIGN KEY (scatid) REFERENCES subcategory (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63CF0C7D9 FOREIGN KEY (itypeid) REFERENCES item_type (id)');
//        $this->addSql('CREATE INDEX IDX_466113F653136F9F ON product_info (braid)');
//        $this->addSql('CREATE INDEX IDX_466113F69ABFBB85 ON product_info (varid)');
//        $this->addSql('CREATE INDEX IDX_466113F69613832D ON product_info (coupling_filter_id)');
//        $this->addSql('CREATE INDEX IDX_466113F6C75F89DD ON product_info (machine_filter_id)');
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
        $this->addSql('ALTER TABLE features_list DROP FOREIGN KEY FK_A0DD47473B69A9AF');
        $this->addSql('ALTER TABLE features_list DROP FOREIGN KEY FK_A0DD474712469DE2');
        $this->addSql('ALTER TABLE features_list DROP FOREIGN KEY FK_A0DD47475DC6FE57');
        $this->addSql('ALTER TABLE features_list DROP FOREIGN KEY FK_A0DD4747CE11AAC7');
        $this->addSql('DROP INDEX idx_a0dd4747ce11aac7 ON features_list');
        $this->addSql('CREATE INDEX FK_A0DD4747CE11AAC7 ON features_list (item_type_id)');
        $this->addSql('DROP INDEX idx_a0dd47473b69a9af ON features_list');
        $this->addSql('CREATE INDEX FK_A0DD47473B69A9AF ON features_list (variant_id)');
        $this->addSql('DROP INDEX idx_a0dd474712469de2 ON features_list');
        $this->addSql('CREATE INDEX FK_A0DD474712469DE2 ON features_list (category_id)');
        $this->addSql('DROP INDEX idx_a0dd47475dc6fe57 ON features_list');
        $this->addSql('CREATE INDEX FK_A0DD47475DC6FE57 ON features_list (subcategory_id)');
        $this->addSql('ALTER TABLE features_list ADD CONSTRAINT FK_A0DD47473B69A9AF FOREIGN KEY (variant_id) REFERENCES variant (id)');
        $this->addSql('ALTER TABLE features_list ADD CONSTRAINT FK_A0DD474712469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE features_list ADD CONSTRAINT FK_A0DD47475DC6FE57 FOREIGN KEY (subcategory_id) REFERENCES subcategory (id)');
        $this->addSql('ALTER TABLE features_list ADD CONSTRAINT FK_A0DD4747CE11AAC7 FOREIGN KEY (item_type_id) REFERENCES item_type (id)');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F653136F9F');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F69ABFBB85');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F69613832D');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F6C75F89DD');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63632DFC5');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F6CC64F614');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63CF0C7D9');
        $this->addSql('DROP INDEX IDX_466113F653136F9F ON product_info');
        $this->addSql('DROP INDEX IDX_466113F69ABFBB85 ON product_info');
        $this->addSql('DROP INDEX IDX_466113F69613832D ON product_info');
        $this->addSql('DROP INDEX IDX_466113F6C75F89DD ON product_info');
        $this->addSql('DROP INDEX IDX_466113F63632DFC5 ON product_info');
        $this->addSql('DROP INDEX IDX_466113F6CC64F614 ON product_info');
        $this->addSql('DROP INDEX IDX_466113F63CF0C7D9 ON product_info');
    }
}
