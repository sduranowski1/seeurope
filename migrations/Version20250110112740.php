<?php
//
//declare(strict_types=1);
//
//namespace DoctrineMigrations;
//
//use Doctrine\DBAL\Schema\Schema;
//use Doctrine\Migrations\AbstractMigration;
//
///**
// * Auto-generated Migration: Please modify to your needs!
// */
//final class Version20250110112740 extends AbstractMigration
//{
//    public function getDescription(): string
//    {
//        return '';
//    }
//
//    public function up(Schema $schema): void
//    {
//        // this up() migration is auto-generated, please modify it to your needs
//        $this->addSql('CREATE TABLE enova_address (id INT AUTO_INCREMENT NOT NULL, wojewodztwo VARCHAR(255) DEFAULT NULL, gmina VARCHAR(255) DEFAULT NULL, nr_domu VARCHAR(255) DEFAULT NULL, nr_lokalu VARCHAR(255) DEFAULT NULL, poczta VARCHAR(255) DEFAULT NULL, powiat VARCHAR(255) DEFAULT NULL, ulica VARCHAR(255) DEFAULT NULL, miejscowosc VARCHAR(255) DEFAULT NULL, kod_pocztowy VARCHAR(255) DEFAULT NULL, kraj VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
//        $this->addSql('ALTER TABLE enova_contractor ADD adres_id INT DEFAULT NULL, ADD adres_korespondencyjny_id INT DEFAULT NULL');
//        $this->addSql('ALTER TABLE enova_contractor ADD CONSTRAINT FK_38F66DC8F128501D FOREIGN KEY (adres_id) REFERENCES enova_address (id)');
//        $this->addSql('ALTER TABLE enova_contractor ADD CONSTRAINT FK_38F66DC8BCF7D015 FOREIGN KEY (adres_korespondencyjny_id) REFERENCES enova_address (id)');
//        $this->addSql('CREATE INDEX IDX_38F66DC8F128501D ON enova_contractor (adres_id)');
//        $this->addSql('CREATE INDEX IDX_38F66DC8BCF7D015 ON enova_contractor (adres_korespondencyjny_id)');
//        $this->addSql('ALTER TABLE enova_person DROP FOREIGN KEY FK_2611CC45B0265DC7');
//        $this->addSql('ALTER TABLE enova_person CHANGE id id INT NOT NULL, CHANGE nazwisko nazwisko VARCHAR(255) NOT NULL');
//        $this->addSql('DROP INDEX fk_2611cc45b0265dc7 ON enova_person');
//        $this->addSql('CREATE INDEX IDX_2611CC45B0265DC7 ON enova_person (contractor_id)');
//        $this->addSql('ALTER TABLE enova_person ADD CONSTRAINT FK_2611CC45B0265DC7 FOREIGN KEY (contractor_id) REFERENCES enova_contractor (id_enova)');
////        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F653136F9F FOREIGN KEY (braid) REFERENCES brand (id)');
////        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F69ABFBB85 FOREIGN KEY (varid) REFERENCES variant (id)');
////        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63632DFC5 FOREIGN KEY (catid) REFERENCES category (id)');
////        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F6CC64F614 FOREIGN KEY (scatid) REFERENCES subcategory (id)');
////        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63CF0C7D9 FOREIGN KEY (itypeid) REFERENCES item_type (id)');
////        $this->addSql('CREATE INDEX IDX_466113F653136F9F ON product_info (braid)');
////        $this->addSql('CREATE INDEX IDX_466113F69ABFBB85 ON product_info (varid)');
////        $this->addSql('CREATE INDEX IDX_466113F63632DFC5 ON product_info (catid)');
////        $this->addSql('CREATE INDEX IDX_466113F6CC64F614 ON product_info (scatid)');
////        $this->addSql('CREATE INDEX IDX_466113F63CF0C7D9 ON product_info (itypeid)');
//    }
//
//    public function down(Schema $schema): void
//    {
//        // this down() migration is auto-generated, please modify it to your needs
//        $this->addSql('ALTER TABLE enova_contractor DROP FOREIGN KEY FK_38F66DC8F128501D');
//        $this->addSql('ALTER TABLE enova_contractor DROP FOREIGN KEY FK_38F66DC8BCF7D015');
//        $this->addSql('DROP TABLE enova_address');
//        $this->addSql('DROP INDEX IDX_38F66DC8F128501D ON enova_contractor');
//        $this->addSql('DROP INDEX IDX_38F66DC8BCF7D015 ON enova_contractor');
//        $this->addSql('ALTER TABLE enova_contractor DROP adres_id, DROP adres_korespondencyjny_id');
//        $this->addSql('ALTER TABLE enova_person DROP FOREIGN KEY FK_2611CC45B0265DC7');
//        $this->addSql('ALTER TABLE enova_person CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE nazwisko nazwisko VARCHAR(255) DEFAULT NULL');
//        $this->addSql('DROP INDEX idx_2611cc45b0265dc7 ON enova_person');
//        $this->addSql('CREATE INDEX FK_2611CC45B0265DC7 ON enova_person (contractor_id)');
//        $this->addSql('ALTER TABLE enova_person ADD CONSTRAINT FK_2611CC45B0265DC7 FOREIGN KEY (contractor_id) REFERENCES enova_contractor (id_enova)');
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F653136F9F');
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F69ABFBB85');
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63632DFC5');
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F6CC64F614');
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63CF0C7D9');
//        $this->addSql('DROP INDEX IDX_466113F653136F9F ON product_info');
//        $this->addSql('DROP INDEX IDX_466113F69ABFBB85 ON product_info');
//        $this->addSql('DROP INDEX IDX_466113F63632DFC5 ON product_info');
//        $this->addSql('DROP INDEX IDX_466113F6CC64F614 ON product_info');
//        $this->addSql('DROP INDEX IDX_466113F63CF0C7D9 ON product_info');
//    }
//}
