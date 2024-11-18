package com.ecommerce.payment.vnpay;

import com.ecommerce.exception.OrderException;
import com.ecommerce.model.Order;
import com.ecommerce.model.PaymentDetails;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.response.ResponseObject;
import com.ecommerce.service.OrderService;
import com.ecommerce.user.domain.OrderStatus;
import com.ecommerce.user.domain.PaymentStatus;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("payment")
@RequiredArgsConstructor
public class PaymentControllerVNPay {

    private static final Logger logger = LoggerFactory.getLogger(PaymentControllerVNPay.class);
    private final PaymentServiceVNPay paymentServiceVNPay;
    private final OrderService orderService;
    private final OrderRepository orderRepository;

    @PostMapping("/vn-pay/{orderId}")
    public ResponseObject<?> pay(@PathVariable Long orderId, HttpServletRequest request) {
        try {
            Order order = orderService.findOrderById(orderId);
            if (order == null) {
                throw new OrderException("Order not found with ID: " + orderId);
            }

            // Generate unique transaction reference
            String vnpTxnRef = "ORDER-" + System.currentTimeMillis();
            order.getPaymentDetails().setPaymentId(vnpTxnRef);
            orderRepository.save(order);

            // Call VNPay service to create payment
            var paymentResponse = paymentServiceVNPay.createVnPayPayment(request, order, vnpTxnRef);
            return new ResponseObject<>(HttpStatus.OK, "Payment link created successfully.", paymentResponse);

        } catch (OrderException e) {
            logger.error("Order error: {}", e.getMessage(), e);
            return new ResponseObject<>(HttpStatus.BAD_REQUEST, e.getMessage(), null);
        } catch (Exception e) {
            logger.error("Unexpected error during payment creation: {}", e.getMessage(), e);
            return new ResponseObject<>(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", null);
        }
    }

    @GetMapping("/vn-pay-callback")
    public ResponseObject<?> payCallbackHandler(HttpServletRequest request, HttpServletResponse response) {
        try {
            logRequestParameters(request);

            // Kiểm tra nếu các tham số quan trọng còn thiếu


            // Tìm đơn hàng từ orderId
            Long orderId = Long.parseLong(request.getParameter("orderId"));
            Order order = orderRepository.findById(orderId).orElseThrow(() ->
                    new OrderException("Order not found for orderId: " + orderId));

            // Thực hiện xử lý callback
            processPaymentCallback(request, order);
            // Chuyển hướng về trang cửa hàng nếu thanh toán thành công
            String redirectUrl = String.format("http://localhost:3000/checkout?step=3&order_id=%d", orderId); // Thay bằng URL trang shop của bạn
            response.sendRedirect(redirectUrl);

            return new ResponseObject<>(HttpStatus.OK, "Payment processed successfully.", null);

        } catch (OrderException e) {
            logger.error("Payment callback error: {}", e.getMessage(), e);
            return new ResponseObject<>(HttpStatus.BAD_REQUEST, e.getMessage(), null);
        } catch (Exception e) {
            logger.error("Unexpected error during payment callback: {}", e.getMessage(), e);
            return new ResponseObject<>(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error", null);
        }
    }

    private void logRequestParameters(HttpServletRequest request) {
        request.getParameterMap().forEach((key, value) ->
                logger.info("{}: {}", key, String.join(", ", value))
        );
    }

    private void processPaymentCallback(HttpServletRequest request, Order order) {
        String status = request.getParameter("vnp_ResponseCode");
        if ("00".equals(status)) {
            PaymentDetails paymentDetails = order.getPaymentDetails();
            paymentDetails.setPaymentId(request.getParameter("vnp_TxnRef"));
            paymentDetails.setVnpTransactionNo(request.getParameter("vnp_TransactionNo"));
            paymentDetails.setVnpResponseCode(status);
            paymentDetails.setVnpPaymentDate(request.getParameter("vnp_PayDate"));
            paymentDetails.setVnpBankCode(request.getParameter("vnp_BankCode"));
            paymentDetails.setVnpCardType(request.getParameter("vnp_CardType"));
            paymentDetails.setPaymentStatus(PaymentStatus.COMPLETED);

            order.setOrderStatus(OrderStatus.PLACED);
        } else {
            order.setOrderStatus(OrderStatus.CANCELLED);
        }
        orderRepository.save(order);
    }
}
