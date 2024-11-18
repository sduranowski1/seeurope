<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241115110727 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Loop to insert 10,000 rows into the product_info table
        for ($i = 0; $i < 10000; $i++) {
            $this->addSql('INSERT INTO product_info (braid, catid, varid) VALUES (0, 0, 0)');
        }
    }

    public function down(Schema $schema): void
    {
        // You can add logic here to revert the insertions, if needed
        $this->addSql('DELETE FROM product_info WHERE braid = 0 AND catid = 0 AND varid = 0');
    }
}
