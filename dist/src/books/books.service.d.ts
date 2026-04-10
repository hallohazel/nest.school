import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma.service';
export declare class BooksService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findAll(title?: string, author?: string): Promise<{
        id: number;
        code: string;
        title: string;
        author: string;
        publisher: string;
        year: number;
        stock: number;
    }[]>;
    findOne(id: number): Promise<{
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
    update(id: number, updateBookDto: UpdateBookDto): Promise<{
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
    remove(id: number): Promise<{
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
