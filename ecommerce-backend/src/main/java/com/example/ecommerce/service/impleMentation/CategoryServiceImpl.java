package com.example.ecommerce.service.impleMentation;

import com.example.ecommerce.dto.CategoryDto;
import com.example.ecommerce.dto.Response;
import com.example.ecommerce.entity.Category;
import com.example.ecommerce.exceptions.NotFoundException;
import com.example.ecommerce.mapper.EntityDtoMapper;
import com.example.ecommerce.repositories.CategoryRepo;
import com.example.ecommerce.service.interFace.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepo categoryRepo;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response createCategory(CategoryDto categoryRequest) {
        Category category = new Category();
        category.setName(categoryRequest.getName());
        categoryRepo.save(category);

        Response response = new Response();
        response.setStatus(200);
        response.setMessage("Category created successfully");
        return response;
    }

    @Override
    public Response updateCategory(Long categoryId, CategoryDto categoryRequest) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category Not Found"));
        category.setName(categoryRequest.getName());
        categoryRepo.save(category);

        Response response = new Response();
        response.setStatus(200);
        response.setMessage("Category updated successfully");
        return response;
    }

    @Override
    public Response getAllCategories() {
        List<Category> categories = categoryRepo.findAll();
        List<CategoryDto> categoryDtoList = categories.stream()
                .map(entityDtoMapper::mapCategoryToDtoBasic)
                .collect(Collectors.toList());

        Response response = new Response();
        response.setStatus(200);
        response.setCategoryList(categoryDtoList);
        return response;
    }

    @Override
    public Response getCategoryById(Long categoryId) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category Not Found"));
        CategoryDto categoryDto = entityDtoMapper.mapCategoryToDtoBasic(category);

        Response response = new Response();
        response.setStatus(200);
        response.setCategory(categoryDto);
        return response;
    }

    @Override
    public Response deleteCategory(Long categoryId) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category Not Found"));
        categoryRepo.delete(category);

        Response response = new Response();
        response.setStatus(200);
        response.setMessage("Category was deleted successfully");
        return response;
    }
}
