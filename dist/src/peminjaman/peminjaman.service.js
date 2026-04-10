"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeminjamanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PeminjamanService = class PeminjamanService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.$transaction(async (tx) => {
            const student = await tx.student.findUnique({
                where: { id: dto.id_student },
            });
            if (!student)
                throw new common_1.NotFoundException('Siswa tidak ditemukan');
            const book = await tx.book.findUnique({
                where: { id: dto.id_buku },
            });
            if (!book)
                throw new common_1.NotFoundException('Buku tidak ditemukan');
            if (book.stock <= 0) {
                throw new common_1.BadRequestException('Stok buku habis! Tidak bisa pinjam.');
            }
            await tx.book.update({
                where: { id: dto.id_buku },
                data: { stock: { decrement: 1 } },
            });
            return tx.peminjaman.create({
                data: {
                    id_student: dto.id_student,
                    id_buku: dto.id_buku,
                    tgl_pinjam: new Date(),
                    tgl_kembali: new Date(dto.tgl_kembali),
                    status: 'DIPINJAM',
                },
            });
        });
    }
    async findAll() {
        return this.prisma.peminjaman.findMany({
            include: {
                student: { select: { name: true, kelas: true } },
                book: { select: { title: true, code: true } },
            },
            orderBy: { id_peminjaman: 'desc' },
        });
    }
    async findOne(id) {
        const data = await this.prisma.peminjaman.findUnique({
            where: { id_peminjaman: id },
            include: { student: true, book: true },
        });
        if (!data)
            throw new common_1.NotFoundException('Data peminjaman tidak ditemukan');
        return data;
    }
    async update(id, dto) {
        if (dto.status === 'KEMBALI') {
            return this.prisma.$transaction(async (tx) => {
                const pinjam = await tx.peminjaman.findUnique({
                    where: { id_peminjaman: id },
                });
                if (!pinjam)
                    throw new common_1.NotFoundException('Transaksi tidak ditemukan');
                if (pinjam.status === 'DIPINJAM') {
                    await tx.book.update({
                        where: { id: pinjam.id_buku },
                        data: { stock: { increment: 1 } },
                    });
                }
                return tx.peminjaman.update({
                    where: { id_peminjaman: id },
                    data: { status: 'KEMBALI' },
                });
            });
        }
        return this.prisma.peminjaman.update({
            where: { id_peminjaman: id },
            data: dto,
        });
    }
    async remove(id) {
        return this.prisma.peminjaman.delete({
            where: { id_peminjaman: id },
        });
    }
};
exports.PeminjamanService = PeminjamanService;
exports.PeminjamanService = PeminjamanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PeminjamanService);
//# sourceMappingURL=peminjaman.service.js.map