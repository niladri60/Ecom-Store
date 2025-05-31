package com.example.ecommerce.service.interFace;

import com.example.ecommerce.dto.CategoryDto;
import com.example.ecommerce.dto.Response;

public interface CategoryService {
    Response createCategory(CategoryDto categoryRequest);
    Response updateCategory(Long categoryId, CategoryDto categoryRequest);
    Response getAllCategories();
    Response getCategoryById(Long categoryId);
    Response deleteCategory(Long categoryId);
}
