package com.example.ecommerce.service.interFace;

import com.example.ecommerce.dto.AddressDto;
import com.example.ecommerce.dto.Response;

public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
    Response deleteAddressById(Long addressId);
}
