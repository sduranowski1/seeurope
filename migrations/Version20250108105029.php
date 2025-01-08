<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250108105029 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE brand (id INT AUTO_INCREMENT NOT NULL, image_id INT DEFAULT NULL, name VARCHAR(50) NOT NULL, polish_name VARCHAR(50) NOT NULL, german_name VARCHAR(50) NOT NULL, image_path VARCHAR(255) NOT NULL, domain_image_path VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_1C52F9583DA5256D (image_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE brands_media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categories_media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, image_id INT DEFAULT NULL, name VARCHAR(50) NOT NULL, polish_name VARCHAR(50) NOT NULL, german_name VARCHAR(50) NOT NULL, image_path VARCHAR(255) NOT NULL, domain_image_path VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_64C19C13DA5256D (image_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE enova_contractor (id_enova INT NOT NULL, nazwa VARCHAR(255) NOT NULL, PRIMARY KEY(id_enova)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE enova_person (id INT NOT NULL, contractor_id INT NOT NULL, imie VARCHAR(255) NOT NULL, nazwisko VARCHAR(255) NOT NULL, INDEX IDX_2611CC45B0265DC7 (contractor_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE enova_product (id INT NOT NULL, product_info_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, code VARCHAR(255) DEFAULT NULL, ean VARCHAR(255) DEFAULT NULL, unit VARCHAR(50) DEFAULT NULL, quantity INT DEFAULT NULL, stock_status VARCHAR(50) DEFAULT NULL, features JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', price_list JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', individual_prices JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', updated_at DATETIME DEFAULT NULL, INDEX IDX_6C88A8A68C52DA48 (product_info_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fetch_contractor (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, INDEX IDX_D2C1571DA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fetch_product (id INT AUTO_INCREMENT NOT NULL, product_info_id INT DEFAULT NULL, INDEX IDX_4023DF1E8C52DA48 (product_info_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE item_type (id INT AUTO_INCREMENT NOT NULL, scid INT DEFAULT NULL, image_id INT DEFAULT NULL, name VARCHAR(50) NOT NULL, polish_name VARCHAR(50) NOT NULL, german_name VARCHAR(50) NOT NULL, image_path VARCHAR(255) NOT NULL, domain_image_path VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_44EE13D2ECBFD0B8 (scid), INDEX IDX_44EE13D23DA5256D (image_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE item_types_media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, item_no VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, price INT NOT NULL, quantity INT NOT NULL, unit VARCHAR(50) NOT NULL, model VARCHAR(255) NOT NULL, bid INT DEFAULT NULL, vid INT DEFAULT NULL, category VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product_info (id INT AUTO_INCREMENT NOT NULL, braid INT DEFAULT 0 NOT NULL, varid INT DEFAULT 0 NOT NULL, catid INT DEFAULT 0 NOT NULL, scatid INT DEFAULT 0 NOT NULL, itypeid INT DEFAULT 0 NOT NULL, image_id INT DEFAULT NULL, description LONGTEXT DEFAULT NULL, polish_description LONGTEXT DEFAULT NULL, german_description LONGTEXT DEFAULT NULL, image_path VARCHAR(255) NOT NULL, INDEX IDX_466113F653136F9F (braid), INDEX IDX_466113F69ABFBB85 (varid), INDEX IDX_466113F63632DFC5 (catid), INDEX IDX_466113F6CC64F614 (scatid), INDEX IDX_466113F63CF0C7D9 (itypeid), INDEX IDX_466113F63DA5256D (image_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE products_media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE subcategories_media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE subcategory (id INT AUTO_INCREMENT NOT NULL, cid INT DEFAULT NULL, image_id INT DEFAULT NULL, sub_cat_name VARCHAR(50) NOT NULL, polish_sub_cat_name VARCHAR(50) NOT NULL, german_sub_cat_name VARCHAR(50) NOT NULL, image_path VARCHAR(255) NOT NULL, domain_image_path VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_DDCA4484B30D9C4 (cid), INDEX IDX_DDCA4483DA5256D (image_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE submission (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(50) NOT NULL, surname VARCHAR(50) NOT NULL, company VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, zip_code VARCHAR(10) NOT NULL, country VARCHAR(20) NOT NULL, phone INT NOT NULL, machine_type VARCHAR(255) NOT NULL, consdiered_products VARCHAR(255) NOT NULL, message LONGTEXT NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', enabled TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_DB055AF3E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE token (id INT AUTO_INCREMENT NOT NULL, token VARCHAR(1000) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_enova (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, password VARCHAR(255) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', UNIQUE INDEX UNIQ_AE9077EBE7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE variant (id INT AUTO_INCREMENT NOT NULL, bid INT DEFAULT NULL, image_id INT DEFAULT NULL, variantname VARCHAR(50) NOT NULL, polish_variant_name VARCHAR(50) NOT NULL, german_variant_name VARCHAR(50) NOT NULL, image_path VARCHAR(255) NOT NULL, domain_image_path VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_F143BFAD4AF2B3F3 (bid), INDEX IDX_F143BFAD3DA5256D (image_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE variants_media_object (id INT AUTO_INCREMENT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE brand ADD CONSTRAINT FK_1C52F9583DA5256D FOREIGN KEY (image_id) REFERENCES brands_media_object (id)');
        $this->addSql('ALTER TABLE category ADD CONSTRAINT FK_64C19C13DA5256D FOREIGN KEY (image_id) REFERENCES categories_media_object (id)');
        $this->addSql('ALTER TABLE enova_person ADD CONSTRAINT FK_2611CC45B0265DC7 FOREIGN KEY (contractor_id) REFERENCES enova_contractor (id_enova)');
        $this->addSql('ALTER TABLE enova_product ADD CONSTRAINT FK_6C88A8A68C52DA48 FOREIGN KEY (product_info_id) REFERENCES product_info (id)');
        $this->addSql('ALTER TABLE fetch_contractor ADD CONSTRAINT FK_D2C1571DA76ED395 FOREIGN KEY (user_id) REFERENCES user_enova (id)');
        $this->addSql('ALTER TABLE fetch_product ADD CONSTRAINT FK_4023DF1E8C52DA48 FOREIGN KEY (product_info_id) REFERENCES product_info (id)');
        $this->addSql('ALTER TABLE item_type ADD CONSTRAINT FK_44EE13D2ECBFD0B8 FOREIGN KEY (scid) REFERENCES subcategory (id)');
        $this->addSql('ALTER TABLE item_type ADD CONSTRAINT FK_44EE13D23DA5256D FOREIGN KEY (image_id) REFERENCES item_types_media_object (id)');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F653136F9F FOREIGN KEY (braid) REFERENCES brand (id)');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F69ABFBB85 FOREIGN KEY (varid) REFERENCES variant (id)');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63632DFC5 FOREIGN KEY (catid) REFERENCES category (id)');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F6CC64F614 FOREIGN KEY (scatid) REFERENCES subcategory (id)');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63CF0C7D9 FOREIGN KEY (itypeid) REFERENCES item_type (id)');
        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F63DA5256D FOREIGN KEY (image_id) REFERENCES products_media_object (id)');
        $this->addSql('ALTER TABLE subcategory ADD CONSTRAINT FK_DDCA4484B30D9C4 FOREIGN KEY (cid) REFERENCES category (id)');
        $this->addSql('ALTER TABLE subcategory ADD CONSTRAINT FK_DDCA4483DA5256D FOREIGN KEY (image_id) REFERENCES subcategories_media_object (id)');
        $this->addSql('ALTER TABLE variant ADD CONSTRAINT FK_F143BFAD4AF2B3F3 FOREIGN KEY (bid) REFERENCES brand (id)');
        $this->addSql('ALTER TABLE variant ADD CONSTRAINT FK_F143BFAD3DA5256D FOREIGN KEY (image_id) REFERENCES variants_media_object (id)');
    }
 
    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brand DROP FOREIGN KEY FK_1C52F9583DA5256D');
        $this->addSql('ALTER TABLE category DROP FOREIGN KEY FK_64C19C13DA5256D');
        $this->addSql('ALTER TABLE enova_person DROP FOREIGN KEY FK_2611CC45B0265DC7');
        $this->addSql('ALTER TABLE enova_product DROP FOREIGN KEY FK_6C88A8A68C52DA48');
        $this->addSql('ALTER TABLE fetch_contractor DROP FOREIGN KEY FK_D2C1571DA76ED395');
        $this->addSql('ALTER TABLE fetch_product DROP FOREIGN KEY FK_4023DF1E8C52DA48');
        $this->addSql('ALTER TABLE item_type DROP FOREIGN KEY FK_44EE13D2ECBFD0B8');
        $this->addSql('ALTER TABLE item_type DROP FOREIGN KEY FK_44EE13D23DA5256D');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F653136F9F');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F69ABFBB85');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63632DFC5');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F6CC64F614');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63CF0C7D9');
        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F63DA5256D');
        $this->addSql('ALTER TABLE subcategory DROP FOREIGN KEY FK_DDCA4484B30D9C4');
        $this->addSql('ALTER TABLE subcategory DROP FOREIGN KEY FK_DDCA4483DA5256D');
        $this->addSql('ALTER TABLE variant DROP FOREIGN KEY FK_F143BFAD4AF2B3F3');
        $this->addSql('ALTER TABLE variant DROP FOREIGN KEY FK_F143BFAD3DA5256D');
        $this->addSql('DROP TABLE brand');
        $this->addSql('DROP TABLE brands_media_object');
        $this->addSql('DROP TABLE categories_media_object');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE enova_contractor');
        $this->addSql('DROP TABLE enova_person');
        $this->addSql('DROP TABLE enova_product');
        $this->addSql('DROP TABLE fetch_contractor');
        $this->addSql('DROP TABLE fetch_product');
        $this->addSql('DROP TABLE item_type');
        $this->addSql('DROP TABLE item_types_media_object');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE product_info');
        $this->addSql('DROP TABLE products_media_object');
        $this->addSql('DROP TABLE subcategories_media_object');
        $this->addSql('DROP TABLE subcategory');
        $this->addSql('DROP TABLE submission');
        $this->addSql('DROP TABLE token');
        $this->addSql('DROP TABLE user_enova');
        $this->addSql('DROP TABLE variant');
        $this->addSql('DROP TABLE variants_media_object');
    }
}
