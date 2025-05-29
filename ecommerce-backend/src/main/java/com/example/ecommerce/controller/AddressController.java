package com.example.ecommerce.controller;

import com.example.ecommerce.dto.AddressDto;
import com.example.ecommerce.dto.Response;
import com.example.ecommerce.service.interFace.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @PostMapping("/save")
    public ResponseEntity<Response> saveAndUpdateAddress(@RequestBody AddressDto addressDto) {
        return ResponseEntity.ok(addressService.saveAndUpdateAddress(addressDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteAddressById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(addressService.deleteAddressById(id));
    }
}
