<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;
use Symfony\Component\PasswordHasher\Hasher\NativePasswordHasher;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241213144014 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Insert 10,000 user records into user_enova table with unique emails and hashed passwords';
    }

    public function up(Schema $schema): void
    {
        $hasher = new NativePasswordHasher();
        $password = $hasher->hash('Polska123!');

        // Batch insert
        $batchSize = 500; // Number of rows per batch
        for ($batch = 0; $batch < 20; $batch++) {
            $values = [];
            for ($i = $batch * $batchSize; $i < ($batch + 1) * $batchSize; $i++) {
                $email = sprintf('user%d@example.com', $i);
                $values[] = sprintf(
                    "('%s', '%s', '[\"ROLE_USER\"]')",
                    $email,
                    $password
                );
            }
            $this->addSql('INSERT INTO user_enova (email, password, roles) VALUES ' . implode(', ', $values));
        }
    }

    public function down(Schema $schema): void
    {
        // Delete the inserted rows
        $this->addSql("DELETE FROM user_enova WHERE email LIKE 'user%@example.com'");
    }
}
