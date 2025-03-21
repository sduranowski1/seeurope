<?php

namespace App\Command;

use App\Controller\FetchContractor\EnovaContractorsController;
use App\Controller\FetchProduct\EnovaProductsController;
use App\Controller\TestEnovaContractor\TestEnovaContractorController;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:fetch-enova-contractors',
    description: 'Fetches contractors from the Enova system.'
)]
class FetchEnovaContractorsCommand extends Command
{

//    private EnovaContractorsController $controller;
    private TestEnovaContractorController $controller;

//    public function __construct(EnovaContractorsController $controller)
    public function __construct(TestEnovaContractorController $controller)
    {
        parent::__construct();
        $this->controller = $controller;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        try {
            $this->controller->fetchAndSaveContractors();
            $output->writeln('<info>Contractors fetched and saved successfully.</info>');
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $output->writeln('<error>Error fetching contractors: ' . $e->getMessage() . '</error>');
            return Command::FAILURE;
        }
    }
}
