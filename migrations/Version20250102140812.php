<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250102140812 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Add new columns to the tables
        $this->addSql('ALTER TABLE brand ADD polish_name VARCHAR(50) NOT NULL, ADD german_name VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE category ADD polish_name VARCHAR(50) NOT NULL, ADD german_name VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE subcategory ADD polish_sub_cat_name VARCHAR(50) NOT NULL, ADD german_sub_cat_name VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE item_type ADD polish_name VARCHAR(50) NOT NULL, ADD german_name VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE variant ADD polish_variant_name VARCHAR(50) NOT NULL, ADD german_variant_name VARCHAR(50) NOT NULL');

        // Ensure valid references before adding constraints
        $this->addSql('UPDATE product_info SET braid = NULL WHERE braid NOT IN (SELECT id FROM brand)');
        $this->addSql('UPDATE product_info SET varid = NULL WHERE varid NOT IN (SELECT id FROM variant)');
        $this->addSql('UPDATE product_info SET catid = NULL WHERE catid NOT IN (SELECT id FROM category)');
        $this->addSql('UPDATE product_info SET scatid = NULL WHERE scatid NOT IN (SELECT id FROM subcategory)');
        $this->addSql('UPDATE product_info SET itypeid = NULL WHERE itypeid NOT IN (SELECT id FROM item_type)');

        // Add foreign key constraints to product_info
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F653136F9F FOREIGN KEY (braid) REFERENCES brand (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F69ABFBB85 FOREIGN KEY (varid) REFERENCES variant (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63632DFC5 FOREIGN KEY (catid) REFERENCES category (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F6CC64F614 FOREIGN KEY (scatid) REFERENCES subcategory (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63CF0C7D9 FOREIGN KEY (itypeid) REFERENCES item_type (id) ON DELETE SET NULL');

        // Add indexes to foreign key columns for optimization
        $this->addSql('CREATE INDEX IDX_466113F653136F9F ON product_info (braid)');
        $this->addSql('CREATE INDEX IDX_466113F69ABFBB85 ON product_info (varid)');
        $this->addSql('CREATE INDEX IDX_466113F63632DFC5 ON product_info (catid)');
        $this->addSql('CREATE INDEX IDX_466113F6CC64F614 ON product_info (scatid)');
        $this->addSql('CREATE INDEX IDX_466113F63CF0C7D9 ON product_info (itypeid)');
    }


    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brand DROP polish_name, DROP german_name');
        $this->addSql('ALTER TABLE category DROP polish_name, DROP german_name');
        $this->addSql('ALTER TABLE item_type DROP polish_name, DROP german_name');
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
        $this->addSql('ALTER TABLE subcategory DROP polish_sub_cat_name, DROP german_sub_cat_name');
        $this->addSql('ALTER TABLE variant DROP polish_variant_name, DROP german_variant_name');
    }
}
