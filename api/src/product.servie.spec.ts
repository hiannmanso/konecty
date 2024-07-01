import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product/product.service';
import { PrismaService } from './prisma/prisma.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockProduct = {
    id: 1,
    name: 'Product 1',
    description: 'Description of Product 1',
    price: 100,
    category: 'Category 1',
    imageUrl: 'https://example.com/product1.jpg',
    createdAt: new Date('2024-07-01T03:27:47.189Z'),
    updatedAt: new Date('2024-07-01T03:27:47.189Z'),
  };

  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 100,
      category: 'Category 1',
      imageUrl: 'https://example.com/product1.jpg',
      createdAt: new Date('2024-07-01T03:27:47.189Z'),
      updatedAt: new Date('2024-07-01T03:27:47.189Z'),
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 150,
      category: 'Category 2',
      imageUrl: 'https://example.com/product2.jpg',
      createdAt: new Date('2024-07-01T03:27:47.189Z'),
      updatedAt: new Date('2024-07-01T03:27:47.189Z'),
    },
  ];
  const mockUpdateProductDto = {
    name: 'Updated Product',
    description: 'Updated Description',
    price: 120,
    category: 'Category 1',
    imageUrl: 'https://example.com/updated-product.jpg',
    createdAt: new Date('2024-07-01T03:27:47.189Z'),
    updatedAt: new Date('2024-07-01T03:27:47.189Z'),
  };
  const mockCategory = {
    id: 1,
    name: 'Category 1',
    createdAt: new Date('2024-07-01T03:27:47.189Z'),
    updatedAt: new Date('2024-07-01T03:27:47.189Z'),
  };

  const mockCreateProductDto = {
    name: 'New Product',
    description: 'Description of New Product',
    price: 99.99,
    category: 'Category 1',
    imageUrl: 'https://example.com/new-product.jpg',
    createdAt: new Date('2024-07-01T03:27:47.189Z'),
    updatedAt: new Date('2024-07-01T03:27:47.189Z'),
  };

  it('should return all products when no filters are provided', async () => {
    jest.spyOn(prisma.product, 'findMany').mockResolvedValue(mockProducts);

    const products = await service.getAllProducts();
    expect(products).toEqual(mockProducts);
  });

  it('should call prisma.product.findMany with correct where clause', async () => {
    const spyFindMany = jest
      .spyOn(prisma.product, 'findMany')
      .mockResolvedValue([]);

    await service.getAllProducts('Product 1', 'Category 1');

    expect(spyFindMany).toHaveBeenCalledWith({
      where: {
        name: { contains: 'Product 1', mode: 'insensitive' },
        category: { contains: 'Category 1', mode: 'insensitive' },
      },
    });
  });

  it('should return a product by ID', async () => {
    jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(mockProduct);

    const productId = 1;
    const product = await service.getProductById(productId);

    expect(product).toEqual(mockProduct);
    expect(prisma.product.findUnique).toBeCalledWith({
      where: { id: productId },
    });
  });

  it('should return null if product with given ID does not exist', async () => {
    jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null);

    const productId = 999; // Assuming product with ID 999 does not exist
    const product = await service.getProductById(productId);

    expect(product).toBeNull();
    expect(prisma.product.findUnique).toBeCalledWith({
      where: { id: productId },
    });
  });

  it('should create a new product', async () => {
    jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(mockCategory);

    const mockCreatedProduct = { ...mockCreateProductDto, id: 1 };
    jest.spyOn(prisma.product, 'create').mockResolvedValue(mockCreatedProduct);

    const createdProduct = await service.createProduct(mockCreateProductDto);

    expect(prisma.category.findUnique).toHaveBeenCalledWith({
      where: { name: mockCreateProductDto.category },
    });

    expect(prisma.product.create).toHaveBeenCalledWith({
      data: mockCreateProductDto,
    });

    expect(createdProduct).toEqual(mockCreatedProduct);
  });

  it('should create a new category and then create a new product', async () => {
    jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(null);

    jest.spyOn(prisma.category, 'create').mockResolvedValue(mockCategory);

    const mockCreatedProduct = { ...mockCreateProductDto, id: 1 };
    jest.spyOn(prisma.product, 'create').mockResolvedValue(mockCreatedProduct);

    const createdProduct = await service.createProduct(mockCreateProductDto);

    expect(prisma.category.findUnique).toHaveBeenCalledWith({
      where: { name: mockCreateProductDto.category },
    });

    expect(prisma.category.create).toHaveBeenCalledWith({
      data: { name: mockCreateProductDto.category },
    });

    expect(prisma.product.create).toHaveBeenCalledWith({
      data: mockCreateProductDto,
    });

    expect(createdProduct).toEqual(mockCreatedProduct);
  });
  it('should update a product', async () => {
    const productId = 1;
    const mockProductBeforeUpdate = {
      id: productId,
      name: 'Original Product',
      description: 'Original Description',
      price: 100,
      category: 'Category 1',
      imageUrl: 'https://example.com/original-product.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockProductAfterUpdate = {
      ...mockProductBeforeUpdate,
      ...mockUpdateProductDto,
    };

    jest
      .spyOn(prisma.product, 'update')
      .mockResolvedValue(mockProductAfterUpdate);

    const updatedProduct = await service.updateProduct(
      productId,
      mockUpdateProductDto,
    );

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: productId },
      data: mockUpdateProductDto,
    });

    expect(updatedProduct).toEqual(mockProductAfterUpdate);
  });
});
