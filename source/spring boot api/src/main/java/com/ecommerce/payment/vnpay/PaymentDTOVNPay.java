package com.ecommerce.payment.vnpay;

import lombok.Builder;

public abstract class PaymentDTOVNPay {
    @Builder
    public static class VNPayResponse {
        public String code;
        public String message;
        public String paymentUrl;
    }
}