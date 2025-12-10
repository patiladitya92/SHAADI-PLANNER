package com.exam.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "vendor_list")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"vendor"})
public class VendorListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;              // listing id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;        // owner vendor

    @Column(nullable = false)
    private String title;         // e.g. "Haldi DJ Basic"

    @Column(length = 1000)
    private String description;          // description

    @Column(nullable = false, precision = 11, scale = 2)
    private BigDecimal price;     // package prices
    
    @Column(length=500, nullable=true)
    private String photoUrl;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private boolean deleted = false;
}


