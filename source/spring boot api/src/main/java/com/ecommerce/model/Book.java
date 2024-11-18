package com.ecommerce.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("Book")
@Getter
@Setter
public class Book extends Product {

    @Column(name = "author")
    private String author;

    // Getters and setters...
}
