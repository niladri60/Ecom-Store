package com.example.ecommerce.service.impleMentation;

import com.example.ecommerce.dto.ProductDto;
import com.example.ecommerce.dto.Response;
import com.example.ecommerce.entity.Category;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.exceptions.NotFoundException;
import com.example.ecommerce.mapper.EntityDtoMapper;
import com.example.ecommerce.repositories.CategoryRepo;
import com.example.ecommerce.repositories.ProductRepo;
import com.example.ecommerce.service.interFace.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response createProduct(Long categoryId, String imageUrl, String name, String description, BigDecimal price) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category not found"));

        Product product = new Product();
        product.setCategory(category);
        product.setPrice(price);
        product.setName(name);
        product.setDescription(description);
        product.setImageUrl(imageUrl);

        productRepo.save(product);

        Response response = new Response();
        response.setStatus(200);
        response.setMessage("Product successfully created");
        return response;
    }

    @Override
    public Response updateProduct(Long productId, Long categoryId, String imageUrl, String name, String description, BigDecimal price) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found"));

        if (categoryId != null) {
            Category category = categoryRepo.findById(categoryId)
                    .orElseThrow(() -> new NotFoundException("Category not found"));
            product.setCategory(category);
        }

        if (name != null) product.setName(name);
        if (price != null) product.setPrice(price);
        if (description != null) product.setDescription(description);
        if (imageUrl != null && !imageUrl.isEmpty()) product.setImageUrl(imageUrl);

        productRepo.save(product);

        Response response = new Response();
        response.setStatus(200);
        response.setMessage("Product updated successfully");
        return response;
    }

    @Override
    public Response deleteProduct(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found"));

        productRepo.delete(product);

        Response response = new Response();
        response.setStatus(200);
        response.setMessage("Product deleted successfully");
        return response;
    }

    @Override
    public Response getProductById(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found"));

        ProductDto productDto = entityDtoMapper.mapProductToDtoBasic(product);

        Response response = new Response();
        response.setStatus(200);
        response.setProduct(productDto);
        return response;
    }

    @Override
    public Response getAllProducts() {
        List<ProductDto> productList = productRepo.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        Response response = new Response();
        response.setStatus(200);
        response.setProductList(productList);
        return response;
    }

    @Override
    public Response getProductsByCategory(Long categoryId) {
        List<Product> products = productRepo.findByCategoryId(categoryId);

        if (products.isEmpty()) {
            throw new NotFoundException("No Products found for this category");
        }

        List<ProductDto> productDtoList = products.stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        Response response = new Response();
        response.setStatus(200);
        response.setProductList(productDtoList);
        return response;
    }

    @Override
    public Response searchProduct(String searchValue) {
        List<Product> products = productRepo.findByNameContainingOrDescriptionContaining(searchValue, searchValue);

        if (products.isEmpty()) {
            throw new NotFoundException("No Products Found");
        }

        List<ProductDto> productDtoList = products.stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        Response response = new Response();
        response.setStatus(200);
        response.setProductList(productDtoList);
        return response;
    }
}
