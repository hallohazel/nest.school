import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma.service';
export declare class StudentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateStudentDto): Promise<{
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(nis?: string, name?: string): Promise<{
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, dto: UpdateStudentDto): Promise<{
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        nis: string;
        name: string;
        email: string | null;
        kelas: string;
        jurusan: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
