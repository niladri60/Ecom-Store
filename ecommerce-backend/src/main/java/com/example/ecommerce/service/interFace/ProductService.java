package com.example.ecommerce.service.interFace;

import com.example.ecommerce.dto.Response;

import java.math.BigDecimal;

public interface ProductService {
    Response createProduct(Long categoryId, String imageUrl, String name, String description, BigDecimal price);
    Response updateProduct(Long productId, Long categoryId, String imageUrl, String name, String description, BigDecimal price);
    Response deleteProduct(Long productId);
    Response getProductById(Long productId);
    Response getAllProducts();
    Response getProductsByCategory(Long categoryId);
    Response searchProduct(String searchValue);
}
