package com.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.exception.ProductException;
import com.ecommerce.model.Product;
import com.ecommerce.model.Review;
import com.ecommerce.model.User;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.ReviewRepository;
import com.ecommerce.request.ReviewRequest;

@Service
public class ReviewServiceImplementation implements ReviewService {

	private final ReviewRepository reviewRepository;
	private final ProductService productService;
	private final ProductRepository productRepository;

	@Autowired
	private SentimentAnalysisService sentimentAnalysisService;

	public ReviewServiceImplementation(ReviewRepository reviewRepository,
									   ProductService productService,
									   ProductRepository productRepository) {
		this.reviewRepository = reviewRepository;
		this.productService = productService;
		this.productRepository = productRepository;
	}

	@Override
	public Review createReview(ReviewRequest req, User user) throws ProductException {
		// Lấy sản phẩm theo ID
		Product product = productService.findProductById(req.getProductId());
		if (product == null) {
			throw new ProductException("Product not found with ID: " + req.getProductId());
		}

		// Tạo đánh giá mới
		Review review = new Review();
		review.setUser(user);
		review.setProduct(product);
		review.setReview(req.getReview());
		review.setRating(req.getRating());
		review.setCreatedAt(LocalDateTime.now());

//		// Phân tích cảm xúc và lưu đánh giá
		saveReview(review);

		// Thêm đánh giá vào danh sách của sản phẩm (nếu cần)
		product.getReviews().add(review);
		productRepository.save(product);

		return review;
	}

	@Override
	public List<Review> getAllReview(Long productId) {
		// Lấy tất cả đánh giá của một sản phẩm
		return reviewRepository.getAllProductsReview(productId);
	}

	@Override
	public void saveReview(Review review) {
		if (review.getReview() == null || review.getReview().isEmpty()) {
			throw new IllegalArgumentException("Review text cannot be null or empty");
		}
		// Phân tích cảm xúc của bình luận
		try {
			String sentiment = sentimentAnalysisService.analyzeReviewSentiment(review.getReview());
			review.setSentiment(sentiment);
		} catch (Exception e) {
			// Ghi log lỗi hoặc thông báo người dùng
			throw new RuntimeException("Error analyzing sentiment: " + e.getMessage(), e);
		}


		// Lưu đánh giá vào repository
		reviewRepository.save(review);
	}
}
