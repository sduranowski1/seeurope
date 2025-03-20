<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250320173056 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE enova_contractor (id INT NOT NULL, adres_id VARCHAR(255) DEFAULT NULL, adres_korespondencyjny_id VARCHAR(255) DEFAULT NULL, id_enova INT NOT NULL, kod VARCHAR(255) NOT NULL, nazwa VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, cena_kontrahenta_nazwa VARCHAR(255) NOT NULL, telefon VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_38F66DC8A2D7CD83 (id_enova), INDEX IDX_38F66DC8F128501D (adres_id), INDEX IDX_38F66DC8BCF7D015 (adres_korespondencyjny_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE enova_location (id INT NOT NULL, adres_location_id VARCHAR(255) DEFAULT NULL, id_enova INT NOT NULL, kod VARCHAR(50) DEFAULT NULL, nazwa VARCHAR(255) DEFAULT NULL, e_mail VARCHAR(255) DEFAULT NULL, INDEX IDX_C9F392EF526363DC (adres_location_id), INDEX IDX_C9F392EFA2D7CD83 (id_enova), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE enova_person (id INT NOT NULL, contractor_id INT NOT NULL, imie VARCHAR(255) NOT NULL, nazwisko VARCHAR(255) NOT NULL, stanowisko VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, tel_komorkowy VARCHAR(255) NOT NULL, dostep_do_www TINYINT(1) NOT NULL, prawo_do_zamowien TINYINT(1) NOT NULL, INDEX IDX_2611CC45B0265DC7 (contractor_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE enova_contractor ADD CONSTRAINT FK_38F66DC8F128501D FOREIGN KEY (adres_id) REFERENCES enova_address (id)');
        $this->addSql('ALTER TABLE enova_contractor ADD CONSTRAINT FK_38F66DC8BCF7D015 FOREIGN KEY (adres_korespondencyjny_id) REFERENCES enova_address (id)');
        $this->addSql('ALTER TABLE enova_location ADD CONSTRAINT FK_C9F392EF526363DC FOREIGN KEY (adres_location_id) REFERENCES enova_address (id)');
        $this->addSql('ALTER TABLE enova_location ADD CONSTRAINT FK_C9F392EFA2D7CD83 FOREIGN KEY (id_enova) REFERENCES enova_contractor (id_enova)');
        $this->addSql('ALTER TABLE enova_person ADD CONSTRAINT FK_2611CC45B0265DC7 FOREIGN KEY (contractor_id) REFERENCES enova_contractor (id_enova)');
//        $this->addSql('ALTER TABLE enova_order_item CHANGE towar_enova_id towar_enova_id INT NOT NULL');
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
//        $this->addSql('ALTER TABLE user_enova DROP FOREIGN KEY FK_AE9077EB1DEF328D');
//        $this->addSql('ALTER TABLE user_enova ADD CONSTRAINT FK_AE9077EB1DEF328D FOREIGN KEY (enova_person_id) REFERENCES enova_person (id)');
//        $this->addSql('CREATE UNIQUE INDEX UNIQ_AE9077EBE7927C74 ON user_enova (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_enova DROP FOREIGN KEY FK_AE9077EB1DEF328D');
        $this->addSql('ALTER TABLE enova_contractor DROP FOREIGN KEY FK_38F66DC8F128501D');
        $this->addSql('ALTER TABLE enova_contractor DROP FOREIGN KEY FK_38F66DC8BCF7D015');
        $this->addSql('ALTER TABLE enova_location DROP FOREIGN KEY FK_C9F392EF526363DC');
        $this->addSql('ALTER TABLE enova_location DROP FOREIGN KEY FK_C9F392EFA2D7CD83');
        $this->addSql('ALTER TABLE enova_person DROP FOREIGN KEY FK_2611CC45B0265DC7');
        $this->addSql('DROP TABLE enova_contractor');
        $this->addSql('DROP TABLE enova_location');
        $this->addSql('DROP TABLE enova_person');
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
        $this->addSql('ALTER TABLE user_enova DROP FOREIGN KEY FK_AE9077EB1DEF328D');
        $this->addSql('DROP INDEX UNIQ_AE9077EBE7927C74 ON user_enova');
        $this->addSql('ALTER TABLE user_enova ADD CONSTRAINT FK_AE9077EB1DEF328D FOREIGN KEY (enova_person_id) REFERENCES enova_person (id) ON UPDATE CASCADE ON DELETE CASCADE');
    }
}
