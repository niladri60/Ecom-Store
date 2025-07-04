package com.example.ecommerce.service.impleMentation;

import com.example.ecommerce.dto.AddressDto;
import com.example.ecommerce.dto.Response;
import com.example.ecommerce.entity.Address;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.repositories.AddressRepo;
import com.example.ecommerce.service.interFace.AddressService;
import com.example.ecommerce.service.interFace.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepo addressRepo;
    private final UserService userService;

    @Override
    public Response saveAndUpdateAddress(AddressDto addressDto) {
        User user = userService.getLoginUser();
        Address address = user.getAddress();

        boolean isNewAddress = false;

        if (address == null) {
            address = new Address();
            address.setUser(user);
            isNewAddress = true;
        }

        if (addressDto.getStreet() != null) address.setStreet(addressDto.getStreet());
        if (addressDto.getCity() != null) address.setCity(addressDto.getCity());
        if (addressDto.getState() != null) address.setState(addressDto.getState());
        if (addressDto.getZipCode() != null) address.setZipCode(addressDto.getZipCode());
        if (addressDto.getCountry() != null) address.setCountry(addressDto.getCountry());

        addressRepo.save(address);

        String message = isNewAddress ? "Address successfully created" : "Address successfully updated";

        Response response = new Response();
        response.setStatus(200);
        response.setMessage(message);
        return response;
    }
}
