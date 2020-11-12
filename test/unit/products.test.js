const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

// generate mock function to spy productModel(toBeCalled, toBeCalledWith)
productModel.create = jest.fn();

// 여러 개의 테스트에 공통된 Code가 있다면 beforeEach 안에 넣어 반복을 줄여준다.
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest;
  res = httpMocks.createResponse;
  next = null;
});

describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function');
  });
  it('should call productModel.create', async () => {
    await productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });
  it('should return 201 status code', async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });
});
