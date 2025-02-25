<?php

namespace App\Controller\ProductFetchTrigger;

use App\Command\FetchEnovaProductsCommand;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\KernelInterface;

#[AsController]
class EnovaProductController extends AbstractController
{
    private $fetchEnovaProductsCommand;

    public function __construct(FetchEnovaProductsCommand $fetchEnovaProductsCommand)
    {
        $this->fetchEnovaProductsCommand = $fetchEnovaProductsCommand;
    }
    public function fetchEnovaProducts(): JsonResponse
    {
        // Create input and output for the command
        $input = new ArrayInput([]);
        $output = new BufferedOutput();

        // Run the command
        $this->fetchEnovaProductsCommand->run($input, $output);

        return new JsonResponse(['message' => 'Enova product fetch triggered successfully.']);
    }
}
