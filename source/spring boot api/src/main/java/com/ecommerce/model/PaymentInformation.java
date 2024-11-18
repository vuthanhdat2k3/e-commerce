package com.ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "payment_information")
public class PaymentInformation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "card_number")
	private String cardNumber;

	@Column(name = "cardholder_name")
	private String cardholderName;

	@Column(name = "expiration_date")
	private LocalDate expirationDate;

	@Column(name = "cvv")
	private Integer cvv; // Bảo mật hơn so với String
}
