<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250307140031 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE enova_order_item (id INT AUTO_INCREMENT NOT NULL, enova_order_id INT NOT NULL, towar_enova_id INT NOT NULL, product_name VARCHAR(255) NOT NULL, price NUMERIC(10, 2) NOT NULL, quantity INT NOT NULL, currency VARCHAR(10) NOT NULL, INDEX IDX_2967A02E1AF2761C (enova_order_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE enova_order_item ADD CONSTRAINT FK_2967A02E1AF2761C FOREIGN KEY (enova_order_id) REFERENCES enova_order (id)');
        $this->addSql('ALTER TABLE enova_product_item DROP FOREIGN KEY FK_13E8604A3E09D97D');
        $this->addSql('DROP TABLE enova_product_item');
//        $this->addSql('DROP INDEX `primary` ON enova_contractor');
//        $this->addSql('CREATE UNIQUE INDEX UNIQ_38F66DC8A2D7CD83 ON enova_contractor (id_enova)');
//        $this->addSql('ALTER TABLE enova_contractor ADD PRIMARY KEY (id)');
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
//        $this->addSql('CREATE UNIQUE INDEX UNIQ_AE9077EBE7927C74 ON user_enova (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE enova_product_item (id INT AUTO_INCREMENT NOT NULL, enova_product_id INT NOT NULL, towar_enova_id INT NOT NULL, product_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, price NUMERIC(10, 2) NOT NULL, quantity INT NOT NULL, currency VARCHAR(10) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_13E8604A3E09D97D (enova_product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE enova_product_item ADD CONSTRAINT FK_13E8604A3E09D97D FOREIGN KEY (enova_product_id) REFERENCES enova_product (id)');
        $this->addSql('ALTER TABLE enova_order_item DROP FOREIGN KEY FK_2967A02E1AF2761C');
        $this->addSql('DROP TABLE enova_order_item');
        $this->addSql('DROP INDEX UNIQ_38F66DC8A2D7CD83 ON enova_contractor');
        $this->addSql('DROP INDEX `PRIMARY` ON enova_contractor');
        $this->addSql('ALTER TABLE enova_contractor ADD PRIMARY KEY (id_enova)');
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
        $this->addSql('DROP INDEX UNIQ_AE9077EBE7927C74 ON user_enova');
    }
}
