<?php

namespace App\Controller\ContractorFetchTrigger;

use App\Command\FetchEnovaContractorsCommand;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\KernelInterface;

#[AsController]
class EnovaContractorController extends AbstractController
{
    private $fetchEnovaContractorsCommand;

    public function __construct(FetchEnovaContractorsCommand $fetchEnovaContractorsCommand)
    {
        $this->fetchEnovaContractorsCommand = $fetchEnovaContractorsCommand;
    }

    public function fetchEnovaProducts(): JsonResponse
    {
        // Create input and output for the command
        $input = new ArrayInput([]);
        $output = new BufferedOutput();

        // Run the command
        $this->fetchEnovaContractorsCommand->run($input, $output);

        return new JsonResponse(['message' => 'Enova contractor fetch triggered successfully.']);
    }
}
