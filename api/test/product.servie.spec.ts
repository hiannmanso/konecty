import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const products = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          category: 'Category 1',
          price: 100,
          imageUrl: 'http://example.com/image.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(products);

      expect(await service.getAllProducts()).toEqual(products);
    });

    it('should filter products by name', async () => {
      const products = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          category: 'Category 1',
          price: 100,
          imageUrl: 'http://example.com/image.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(products);

      expect(await service.getAllProducts('Product 1')).toEqual(products);
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { name: { contains: 'Product 1', mode: 'insensitive' } },
      });
    });

    it('should filter products by category', async () => {
      const products = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          category: 'Category 1',
          price: 100,
          imageUrl: 'http://example.com/image.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(products);

      expect(await service.getAllProducts(undefined, 'Category 1')).toEqual(
        products,
      );
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { category: { contains: 'Category 1', mode: 'insensitive' } },
      });
    });

    it('should filter products by name and category', async () => {
      const products = [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          category: 'Category 1',
          price: 100,
          imageUrl: 'http://example.com/image.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(products);

      expect(await service.getAllProducts('Product 1', 'Category 1')).toEqual(
        products,
      );
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {
          name: { contains: 'Product 1', mode: 'insensitive' },
          category: { contains: 'Category 1', mode: 'insensitive' },
        },
      });
    });
  });

  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      const product = {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        category: 'Category 1',
        price: 100,
        imageUrl: 'http://example.com/image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(product);

      expect(await service.getProductById(1)).toEqual(product);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Product 1',
        description: 'Description 1',
        category: 'Category 1',
        price: 100,
        imageUrl: 'http://example.com/image.jpg',
      };
      const product = {
        id: 1,
        ...createProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.product, 'create').mockResolvedValue(product);

      expect(await service.createProduct(createProductDto)).toEqual(product);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const updateProductDto: UpdateProductDto = { name: 'Updated Product 1' };
      const product = {
        id: 1,
        name: 'Updated Product 1',
        description: 'Description 1',
        category: 'Category 1',
        price: 100,
        imageUrl: 'http://example.com/image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.product, 'update').mockResolvedValue(product);

      expect(await service.updateProduct(1, updateProductDto)).toEqual(product);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const product = {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        category: 'Category 1',
        price: 100,
        imageUrl: 'http://example.com/image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.product, 'delete').mockResolvedValue(product);

      expect(await service.deleteProduct(1)).toEqual(product);
    });
  });
});
