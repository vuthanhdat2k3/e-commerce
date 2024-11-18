package com.ecommerce.model;

import com.ecommerce.user.domain.PaymentMethod;
import com.ecommerce.user.domain.PaymentStatus;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "payment_details")
public class PaymentDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private PaymentMethod paymentMethod;
	private PaymentStatus paymentStatus;
	private String paymentId; // VNPay transaction ID
	private String vnpTransactionNo; // VNPay transaction number
	private String vnpOrderInfo; // VNPay order information
	private String vnpResponseCode; // Response code from VNPay
	private String vnpPaymentDate; // Payment date in VNPay
	private String vnpBankCode; // Bank code used in VNPay
	private String vnpCardType; // Card type used in VNPay
}
