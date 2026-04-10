import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
export declare class PeminjamanController {
    private readonly peminjamanService;
    constructor(peminjamanService: PeminjamanService);
    create(dto: CreatePeminjamanDto): Promise<{
        id_student: number;
        id_buku: number;
        tgl_kembali: Date;
        status: string;
        id_peminjaman: number;
        tgl_pinjam: Date;
    }>;
    findAll(): Promise<({
        student: {
            name: string;
            kelas: string;
        };
        book: {
            code: string;
            title: string;
        };
    } & {
        id_student: number;
        id_buku: number;
        tgl_kembali: Date;
        status: string;
        id_peminjaman: number;
        tgl_pinjam: Date;
    })[]>;
    findOne(id: string): Promise<{
        student: {
            nis: string;
            name: string;
            email: string | null;
            kelas: string;
            jurusan: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        book: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            code: string;
            title: string;
            author: string;
            publisher: string;
            year: number;
            stock: number;
        };
    } & {
        id_student: number;
        id_buku: number;
        tgl_kembali: Date;
        status: string;
        id_peminjaman: number;
        tgl_pinjam: Date;
    }>;
    update(id: string, updatePeminjamanDto: UpdatePeminjamanDto): Promise<{
        id_student: number;
        id_buku: number;
        tgl_kembali: Date;
        status: string;
        id_peminjaman: number;
        tgl_pinjam: Date;
    }>;
    remove(id: string): Promise<{
        id_student: number;
        id_buku: number;
        tgl_kembali: Date;
        status: string;
        id_peminjaman: number;
        tgl_pinjam: Date;
    }>;
}
