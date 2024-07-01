import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(name?: string, category?: string) {
    const where = {
      ...(name && { name: { contains: name, mode: 'insensitive' as const } }),
      ...(category && {
        category: { contains: category, mode: 'insensitive' as const },
      }),
    };
    return this.prisma.product.findMany({ where });
  }

  async getProductById(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct(data: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { name: data.category },
    });
    if (!category) {
      await this.prisma.category.create({
        data: {
          name: data.category,
        },
      });
    }
    return this.prisma.product.create({ data });
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
