<?php

// src/Controller/Api/BookController.php

namespace App\Controller\Api;

use App\Repository\BookRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/books", name="api_books_")
 */
class BookController
{
    private $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * @Route("/", name="list", methods={"GET"})
     */
    public function list(): JsonResponse
    {
        $books = $this->bookRepository->findAll();
        $totalCount = count($books);

        $response = new JsonResponse($books);
        $response->headers->set('X-Total-Count', $totalCount); // Set X-Total-Count header

        return $response;
    }
}
