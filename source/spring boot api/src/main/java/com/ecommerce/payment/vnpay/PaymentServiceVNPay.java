package com.ecommerce.payment.vnpay;

import com.ecommerce.config.VNPAYConfig;
import com.ecommerce.model.Order;
import com.ecommerce.util.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentServiceVNPay {
    private final VNPAYConfig vnPayConfig;
    @Value("${payment.vnPay.returnUrl}")
    private String vnp_ReturnUrl;

    public PaymentDTOVNPay.VNPayResponse createVnPayPayment(HttpServletRequest request, Order order, String vnpTxnRef) {
        try {
            // Tính toán số tiền (với đơn vị VNPay là VND * 100)
            long amount = (long) order.getTotalDiscountedPrice() * 100L;

            // Lấy thông tin bankCode từ request (nếu có)
            Optional<String> bankCodeOptional = Optional.ofNullable(request.getParameter("bankCode"));

            // Chuẩn bị các tham số cho VNPay
            Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
            vnpParamsMap.put("vnp_Amount", String.valueOf(amount));

            // Nếu có bankCode, thêm vào tham số
            bankCodeOptional.ifPresent(bankCode -> vnpParamsMap.put("vnp_BankCode", bankCode));

            // Lấy địa chỉ IP của client
            vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
            vnpParamsMap.put("vnp_TxnRef", vnpTxnRef);

            String vnpReturnUrlWithParams = this.vnp_ReturnUrl + "?paymentId=" + vnpTxnRef + "&orderId=" + String.valueOf(order.getId());
            vnpParamsMap.put("vnp_ReturnUrl", vnpReturnUrlWithParams);


            // Xây dựng URL thanh toán
            String paymentUrl = buildVNPayUrl(vnpParamsMap);

            // Trả về kết quả
            return PaymentDTOVNPay.VNPayResponse.builder()
                    .code("ok")
                    .message("success")
                    .paymentUrl(paymentUrl)
                    .build();
        } catch (Exception e) {
            // Log lỗi và trả về thông báo lỗi
            e.printStackTrace();
            return PaymentDTOVNPay.VNPayResponse.builder()
                    .code("error")
                    .message("Error occurred while creating VNPay payment: " + e.getMessage())
                    .build();
        }
    }

    // Method riêng để xây dựng URL VNPay
    private String buildVNPayUrl(Map<String, String> params) {
        String queryUrl = VNPayUtil.getPaymentURL(params, true);
        String hashData = VNPayUtil.getPaymentURL(params, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        return vnPayConfig.getVnp_PayUrl() + "?" + queryUrl + "&vnp_SecureHash=" + vnpSecureHash;
    }
}
