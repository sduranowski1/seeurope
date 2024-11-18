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
//final class Version20241114163412 extends AbstractMigration
//{
//    public function getDescription(): string
//    {
//        return '';
//    }
//
//    public function up(Schema $schema): void
//    {
//        // this up() migration is auto-generated, please modify it to your needs
//        $this->addSql('CREATE TABLE fetch_product (id INT AUTO_INCREMENT NOT NULL, product_info_id INT DEFAULT NULL, INDEX IDX_4023DF1E8C52DA48 (product_info_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
//        $this->addSql('ALTER TABLE fetch_product ADD CONSTRAINT FK_4023DF1E8C52DA48 FOREIGN KEY (product_info_id) REFERENCES product_info (id)');
//        $this->addSql('ALTER TABLE product_info ADD CONSTRAINT FK_466113F653136F9F FOREIGN KEY (braid) REFERENCES brand (id)');
//        $this->addSql('CREATE INDEX IDX_466113F653136F9F ON product_info (braid)');
//    }
//
//    public function down(Schema $schema): void
//    {
//        // this down() migration is auto-generated, please modify it to your needs
//        $this->addSql('ALTER TABLE fetch_product DROP FOREIGN KEY FK_4023DF1E8C52DA48');
//        $this->addSql('DROP TABLE fetch_product');
//        $this->addSql('ALTER TABLE product_info DROP FOREIGN KEY FK_466113F653136F9F');
//        $this->addSql('DROP INDEX IDX_466113F653136F9F ON product_info');
//    }
//}
