import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(title?: string, author?: string): Promise<{
        id: number;
        code: string;
        title: string;
        author: string;
        publisher: string;
        year: number;
        stock: number;
    }[]>;
    findOne(id: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        code: string;
        title: string;
        author: string;
        publisher: string;
        year: number;
        stock: number;
    }>;
    create(createBookDto: CreateBookDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        code: string;
        title: string;
        author: string;
        publisher: string;
        year: number;
        stock: number;
    }>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        code: string;
        title: string;
        author: string;
        publisher: string;
        year: number;
        stock: number;
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        code: string;
        title: string;
        author: string;
        publisher: string;
        year: number;
        stock: number;
    }>;
}
