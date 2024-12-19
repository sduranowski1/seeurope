<?php

namespace App\Command;

use App\Controller\FetchProduct\EnovaProductsController;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:fetch-enova-products',
    description: 'Fetches products from the Enova system.'
)]
class FetchEnovaProductsCommand extends Command
{

    private EnovaProductsController $controller;

    public function __construct(EnovaProductsController $controller)
    {
        parent::__construct();
        $this->controller = $controller;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        try {
            $this->controller->fetchAndSaveProducts();
            $output->writeln('<info>Products fetched and saved successfully.</info>');
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $output->writeln('<error>Error fetching products: ' . $e->getMessage() . '</error>');
            return Command::FAILURE;
        }
    }
}
