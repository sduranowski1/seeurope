<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250225175656 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category ADD capacity TINYINT(1) NOT NULL, ADD depth TINYINT(1) NOT NULL, ADD dimension TINYINT(1) NOT NULL, ADD equipment_side TINYINT(1) NOT NULL, ADD existing_fork TINYINT(1) NOT NULL, ADD height TINYINT(1) NOT NULL, ADD information TINYINT(1) NOT NULL, ADD length TINYINT(1) NOT NULL, ADD machine_side TINYINT(1) NOT NULL, ADD masa_do TINYINT(1) NOT NULL, ADD masa_od TINYINT(1) NOT NULL, ADD model TINYINT(1) NOT NULL, ADD more_information TINYINT(1) NOT NULL, ADD opis_wc TINYINT(1) NOT NULL, ADD product TINYINT(1) NOT NULL, ADD recommended_machine_weight TINYINT(1) NOT NULL, ADD type TINYINT(1) NOT NULL, ADD variant TINYINT(1) NOT NULL, ADD volume TINYINT(1) NOT NULL, ADD weight TINYINT(1) NOT NULL, ADD width TINYINT(1) NOT NULL');
//        $this->addSql('DROP INDEX `primary` ON enova_contractor');
//        $this->addSql('CREATE UNIQUE INDEX UNIQ_38F66DC8A2D7CD83 ON enova_contractor (id_enova)');
//        $this->addSql('ALTER TABLE enova_contractor ADD PRIMARY KEY (id)');
        $this->addSql('ALTER TABLE item_type ADD capacity TINYINT(1) NOT NULL, ADD depth TINYINT(1) NOT NULL, ADD dimension TINYINT(1) NOT NULL, ADD equipment_side TINYINT(1) NOT NULL, ADD existing_fork TINYINT(1) NOT NULL, ADD height TINYINT(1) NOT NULL, ADD information TINYINT(1) NOT NULL, ADD length TINYINT(1) NOT NULL, ADD machine_side TINYINT(1) NOT NULL, ADD masa_do TINYINT(1) NOT NULL, ADD masa_od TINYINT(1) NOT NULL, ADD model TINYINT(1) NOT NULL, ADD more_information TINYINT(1) NOT NULL, ADD opis_wc TINYINT(1) NOT NULL, ADD product TINYINT(1) NOT NULL, ADD recommended_machine_weight TINYINT(1) NOT NULL, ADD type TINYINT(1) NOT NULL, ADD variant TINYINT(1) NOT NULL, ADD volume TINYINT(1) NOT NULL, ADD weight TINYINT(1) NOT NULL, ADD width TINYINT(1) NOT NULL');
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
        $this->addSql('ALTER TABLE subcategory ADD capacity TINYINT(1) NOT NULL, ADD depth TINYINT(1) NOT NULL, ADD dimension TINYINT(1) NOT NULL, ADD equipment_side TINYINT(1) NOT NULL, ADD existing_fork TINYINT(1) NOT NULL, ADD height TINYINT(1) NOT NULL, ADD information TINYINT(1) NOT NULL, ADD length TINYINT(1) NOT NULL, ADD machine_side TINYINT(1) NOT NULL, ADD masa_do TINYINT(1) NOT NULL, ADD masa_od TINYINT(1) NOT NULL, ADD model TINYINT(1) NOT NULL, ADD more_information TINYINT(1) NOT NULL, ADD opis_wc TINYINT(1) NOT NULL, ADD product TINYINT(1) NOT NULL, ADD recommended_machine_weight TINYINT(1) NOT NULL, ADD type TINYINT(1) NOT NULL, ADD variant TINYINT(1) NOT NULL, ADD volume TINYINT(1) NOT NULL, ADD weight TINYINT(1) NOT NULL, ADD width TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE variant ADD capacity TINYINT(1) NOT NULL, ADD depth TINYINT(1) NOT NULL, ADD dimension TINYINT(1) NOT NULL, ADD equipment_side TINYINT(1) NOT NULL, ADD existing_fork TINYINT(1) NOT NULL, ADD height TINYINT(1) NOT NULL, ADD information TINYINT(1) NOT NULL, ADD length TINYINT(1) NOT NULL, ADD machine_side TINYINT(1) NOT NULL, ADD masa_do TINYINT(1) NOT NULL, ADD masa_od TINYINT(1) NOT NULL, ADD model TINYINT(1) NOT NULL, ADD more_information TINYINT(1) NOT NULL, ADD opis_wc TINYINT(1) NOT NULL, ADD product TINYINT(1) NOT NULL, ADD recommended_machine_weight TINYINT(1) NOT NULL, ADD type TINYINT(1) NOT NULL, ADD variant TINYINT(1) NOT NULL, ADD volume TINYINT(1) NOT NULL, ADD weight TINYINT(1) NOT NULL, ADD width TINYINT(1) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category DROP capacity, DROP depth, DROP dimension, DROP equipment_side, DROP existing_fork, DROP height, DROP information, DROP length, DROP machine_side, DROP masa_do, DROP masa_od, DROP model, DROP more_information, DROP opis_wc, DROP product, DROP recommended_machine_weight, DROP type, DROP variant, DROP volume, DROP weight, DROP width');
        $this->addSql('DROP INDEX UNIQ_38F66DC8A2D7CD83 ON enova_contractor');
        $this->addSql('DROP INDEX `PRIMARY` ON enova_contractor');
        $this->addSql('ALTER TABLE enova_contractor ADD PRIMARY KEY (id_enova)');
        $this->addSql('ALTER TABLE item_type DROP capacity, DROP depth, DROP dimension, DROP equipment_side, DROP existing_fork, DROP height, DROP information, DROP length, DROP machine_side, DROP masa_do, DROP masa_od, DROP model, DROP more_information, DROP opis_wc, DROP product, DROP recommended_machine_weight, DROP type, DROP variant, DROP volume, DROP weight, DROP width');
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
        $this->addSql('ALTER TABLE subcategory DROP capacity, DROP depth, DROP dimension, DROP equipment_side, DROP existing_fork, DROP height, DROP information, DROP length, DROP machine_side, DROP masa_do, DROP masa_od, DROP model, DROP more_information, DROP opis_wc, DROP product, DROP recommended_machine_weight, DROP type, DROP variant, DROP volume, DROP weight, DROP width');
        $this->addSql('ALTER TABLE variant DROP capacity, DROP depth, DROP dimension, DROP equipment_side, DROP existing_fork, DROP height, DROP information, DROP length, DROP machine_side, DROP masa_do, DROP masa_od, DROP model, DROP more_information, DROP opis_wc, DROP product, DROP recommended_machine_weight, DROP type, DROP variant, DROP volume, DROP weight, DROP width');
    }
}
