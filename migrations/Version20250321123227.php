<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250321123227 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE test_enova_address (id INT AUTO_INCREMENT NOT NULL, wojewodztwo VARCHAR(255) DEFAULT NULL, gmina VARCHAR(255) DEFAULT NULL, nr_domu VARCHAR(50) DEFAULT NULL, nr_lokalu VARCHAR(50) DEFAULT NULL, poczta VARCHAR(255) DEFAULT NULL, powiat VARCHAR(255) DEFAULT NULL, ulica VARCHAR(255) DEFAULT NULL, miejscowosc VARCHAR(255) DEFAULT NULL, kod_pocztowy VARCHAR(20) DEFAULT NULL, kraj VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE enova_contractor DROP FOREIGN KEY FK_38F66DC8BCF7D015');
        $this->addSql('ALTER TABLE enova_contractor ADD CONSTRAINT FK_38F66DC8BCF7D015 FOREIGN KEY (adres_korespondencyjny_id) REFERENCES enova_address (id)');
        $this->addSql('ALTER TABLE enova_order_item CHANGE towar_enova_id towar_enova_id INT NOT NULL');
//        $this->addSql('ALTER TABLE product_info CHANGE id id INT NOT NULL');
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
        $this->addSql('ALTER TABLE test_enova_contact_person ADD adres_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE test_enova_contact_person ADD CONSTRAINT FK_54E64645F128501D FOREIGN KEY (adres_id) REFERENCES test_enova_address (id)');
        $this->addSql('CREATE INDEX IDX_54E64645F128501D ON test_enova_contact_person (adres_id)');
        $this->addSql('ALTER TABLE test_enova_contractor ADD adres_id INT DEFAULT NULL, ADD adres_korespondencyjny_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE test_enova_contractor ADD CONSTRAINT FK_3E3E16E7F128501D FOREIGN KEY (adres_id) REFERENCES test_enova_address (id)');
        $this->addSql('ALTER TABLE test_enova_contractor ADD CONSTRAINT FK_3E3E16E7BCF7D015 FOREIGN KEY (adres_korespondencyjny_id) REFERENCES test_enova_address (id)');
        $this->addSql('CREATE INDEX IDX_3E3E16E7F128501D ON test_enova_contractor (adres_id)');
        $this->addSql('CREATE INDEX IDX_3E3E16E7BCF7D015 ON test_enova_contractor (adres_korespondencyjny_id)');
        $this->addSql('ALTER TABLE test_enova_location ADD adres_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE test_enova_location ADD CONSTRAINT FK_B6BF6AE2F128501D FOREIGN KEY (adres_id) REFERENCES test_enova_address (id)');
        $this->addSql('CREATE INDEX IDX_B6BF6AE2F128501D ON test_enova_location (adres_id)');
//        $this->addSql('ALTER TABLE user_enova DROP FOREIGN KEY FK_AE9077EB1DEF328D');
//        $this->addSql('ALTER TABLE user_enova ADD CONSTRAINT FK_AE9077EB1DEF328D FOREIGN KEY (enova_person_id) REFERENCES enova_person (id)');
//        $this->addSql('CREATE UNIQUE INDEX UNIQ_AE9077EBE7927C74 ON user_enova (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE test_enova_contact_person DROP FOREIGN KEY FK_54E64645F128501D');
        $this->addSql('ALTER TABLE test_enova_contractor DROP FOREIGN KEY FK_3E3E16E7F128501D');
        $this->addSql('ALTER TABLE test_enova_contractor DROP FOREIGN KEY FK_3E3E16E7BCF7D015');
        $this->addSql('ALTER TABLE test_enova_location DROP FOREIGN KEY FK_B6BF6AE2F128501D');
        $this->addSql('DROP TABLE test_enova_address');
        $this->addSql('ALTER TABLE enova_contractor DROP FOREIGN KEY FK_38F66DC8BCF7D015');
        $this->addSql('ALTER TABLE enova_contractor ADD CONSTRAINT FK_38F66DC8BCF7D015 FOREIGN KEY (adres_korespondencyjny_id) REFERENCES enova_address (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE enova_order_item CHANGE towar_enova_id towar_enova_id INT DEFAULT NULL');
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
        $this->addSql('ALTER TABLE product_info CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('DROP INDEX IDX_54E64645F128501D ON test_enova_contact_person');
        $this->addSql('ALTER TABLE test_enova_contact_person DROP adres_id');
        $this->addSql('DROP INDEX IDX_3E3E16E7F128501D ON test_enova_contractor');
        $this->addSql('DROP INDEX IDX_3E3E16E7BCF7D015 ON test_enova_contractor');
        $this->addSql('ALTER TABLE test_enova_contractor DROP adres_id, DROP adres_korespondencyjny_id');
        $this->addSql('DROP INDEX IDX_B6BF6AE2F128501D ON test_enova_location');
        $this->addSql('ALTER TABLE test_enova_location DROP adres_id');
        $this->addSql('ALTER TABLE user_enova DROP FOREIGN KEY FK_AE9077EB1DEF328D');
        $this->addSql('DROP INDEX UNIQ_AE9077EBE7927C74 ON user_enova');
        $this->addSql('ALTER TABLE user_enova ADD CONSTRAINT FK_AE9077EB1DEF328D FOREIGN KEY (enova_person_id) REFERENCES enova_person (id) ON UPDATE CASCADE ON DELETE CASCADE');
    }
}
