package com.exam.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exam.dto.RegisterReq;
import com.exam.dto.UserProfileRes;
import com.exam.entities.Customer;
import com.exam.entities.Role;
import com.exam.entities.User;
import com.exam.entities.Vendor;
import com.exam.exception.BadRequestException;
import com.exam.exception.ConflictException;
import com.exam.exception.ResourceNotFoundException;
import com.exam.repository.CustomerRepo;
import com.exam.repository.ServiceCatRepo;
import com.exam.repository.UserRepo;
import com.exam.repository.VendorRepo;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AuthService {
    
    private final UserRepo userRepo;
    private final CustomerRepo customerRepo;
    private final VendorRepo vendorRepo;
    private final PasswordEncoder passwordEncoder;
    private final ServiceCatRepo serviceCatRepo;
    private final EmailService emailService;
    public void register(RegisterReq dto) {
        // 1. Check email unique
        if (userRepo.existsByEmail(dto.getEmail())) {
            throw new ConflictException("Email already registered");
        }
        
        // 2. Create USER
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setPhone(dto.getPhone());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));  // ✅ SAFE
        user.setRole(Role.valueOf(dto.getRole()));
        user.setDeleted(false);
        User savedUser = userRepo.save(user);
        
        // 3. Create Profile (role-specific)
        switch (dto.getRole()) {
            case "ROLE_CUSTOMER" -> customerRepo.save(createCustomer(savedUser, dto));
            case "ROLE_VENDOR" -> vendorRepo.save(createVendor(savedUser, dto));
            default -> throw new BadRequestException("Invalid role");
        }
    }
    
    private Customer createCustomer(User user, RegisterReq dto) {
        Customer c = new Customer();
        c.setUser(user);
        c.setCity(dto.getCity());
        c.setAddr(dto.getAddr());
        c.setState(dto.getState());
        c.setDeleted(false);
        return c;
    }
    

    private Vendor createVendor(User user, RegisterReq dto) {
        Vendor v = new Vendor();
        v.setUser(user);
        v.setBizname(dto.getBizname());         
        v.setAddr(dto.getAddr());                
        v.setCity(dto.getCity());                
        v.setState(dto.getState());               
        v.setCat(serviceCatRepo.findById(dto.getCatId())
            .orElseThrow(() -> new BadRequestException("Invalid category ID")));
        v.setAvail(true);
        v.setDeleted(false);
        return v;
    }

	public UserProfileRes getUserProfile(String email) {
    User user = userRepo.findByEmailIgnoreCase(email)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    
    UserProfileRes res = new UserProfileRes();
    res.setId(user.getId());
    res.setEmail(user.getEmail());
    res.setName(user.getName());
    res.setPhone(user.getPhone());
    res.setRole(user.getRole().name());
    
   
    if ("ROLE_CUSTOMER".equals(user.getRole().name())) {
        customerRepo.findByUserId(user.getId()).ifPresent(cust -> {
            res.setCustomerId(cust.getId());
            res.setCustomerCity(cust.getCity());
        });
    }
    
    else if ("ROLE_VENDOR".equals(user.getRole().name())) {
        vendorRepo.findByUserId(user.getId()).ifPresent(vendor -> {
            res.setVendorId(vendor.getId());
            res.setVendorBizname(vendor.getBizname());
            res.setVendorCity(vendor.getCity());
            res.setVendorAvailable(vendor.isAvail());
        });
    }
    
    return res;
}
	
	
	public void forgotPassword(String email) {
        User user = userRepo.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new ResourceNotFoundException("Email not registered"));
        
        
        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
        userRepo.save(user);
        
     
        emailService.sendResetPasswordEmail(user.getEmail(), resetToken, user.getName());
    }
	
	
	public void resetPassword(String token, String newPassword) {
        User user = userRepo.findByResetToken(token)
            .orElseThrow(() -> new BadRequestException("Invalid token"));
        
        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Token expired");
        }
        
        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepo.save(user);
    }
}
