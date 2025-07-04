package com.example.ecommerce.service.impleMentation;

import com.example.ecommerce.dto.OrderItemDto;
import com.example.ecommerce.dto.OrderRequest;
import com.example.ecommerce.dto.Response;
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.entity.OrderItem;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.exceptions.NotFoundException;
import com.example.ecommerce.mapper.EntityDtoMapper;
import com.example.ecommerce.repositories.OrderItemRepo;
import com.example.ecommerce.repositories.OrderRepo;
import com.example.ecommerce.repositories.ProductRepo;
import com.example.ecommerce.service.interFace.OrderItemService;
import com.example.ecommerce.service.interFace.UserService;
import com.example.ecommerce.specification.OrderItemSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final ProductRepo productRepo;
    private final UserService userService;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response placeOrder(OrderRequest orderRequest) {

        User user = userService.getLoginUser();

        List<OrderItem> orderItems = orderRequest.getItems().stream().map(orderItemRequest -> {
            Product product = productRepo.findById(orderItemRequest.getProductId())
                    .orElseThrow(() -> new NotFoundException("Product Not Found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(orderItemRequest.getQuantity());
            orderItem.setPrice(product.getPrice().multiply(BigDecimal.valueOf(orderItemRequest.getQuantity())));
            orderItem.setStatus(OrderStatus.PENDING);
            orderItem.setUser(user);
            return orderItem;

        }).collect(Collectors.toList());

        BigDecimal totalPrice = orderRequest.getTotalPrice() != null && orderRequest.getTotalPrice().compareTo(BigDecimal.ZERO) > 0
                ? orderRequest.getTotalPrice()
                : orderItems.stream().map(OrderItem::getPrice).reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setOrderItemList(orderItems);
        order.setTotalPrice(totalPrice);

        orderItems.forEach(orderItem -> orderItem.setOrder(order));

        orderRepo.save(order);

        Response response = new Response();
        response.setStatus(200);
        response.setMessage("Order was successfully placed");
        return response;
    }

    @Override
    public Response updateOrderItemStatus(Long orderItemId, String status) {
        OrderItem orderItem = orderItemRepo.findById(orderItemId)
                .orElseThrow(() -> new NotFoundException("Order Item not found"));

        orderItem.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        orderItemRepo.save(orderItem);

        Response response = new Response();
        response.setStatus(200);
        response.setMessage("Order status updated successfully");
        return response;
    }

    @Override
    public Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable) {
        Specification<OrderItem> spec = null;

        if (status != null) {
            spec = OrderItemSpecification.hasStatus(status);
        }

        if (startDate != null && endDate != null) {
            spec = (spec == null ? OrderItemSpecification.createdBetween(startDate, endDate)
                    : spec.and(OrderItemSpecification.createdBetween(startDate, endDate)));
        }

        if (itemId != null) {
            spec = (spec == null ? OrderItemSpecification.hasItemId(itemId)
                    : spec.and(OrderItemSpecification.hasItemId(itemId)));
        }

        Page<OrderItem> orderItemPage = orderItemRepo.findAll(spec, pageable);

        if (orderItemPage.isEmpty()) {
            throw new NotFoundException("No Order Found");
        }

        List<OrderItemDto> orderItemDtos = orderItemPage.getContent().stream()
                .map(entityDtoMapper::mapOrderItemToDtoPlusProductAndUser)
                .collect(Collectors.toList());

        Response response = new Response();
        response.setStatus(200);
        response.setOrderItemList(orderItemDtos);
        response.setTotalPage(orderItemPage.getTotalPages());
        response.setTotalElement(orderItemPage.getTotalElements());
        return response;
    }
}
