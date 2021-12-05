package co.edu.usa.CRUD.SPRING.MONGO.service;

import co.edu.usa.CRUD.SPRING.MONGO.exception.ResourceNotFoundException;
import co.edu.usa.CRUD.SPRING.MONGO.model.Product;
import co.edu.usa.CRUD.SPRING.MONGO.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProduct() {
        return productRepository.findAll();
    }

    public Product createProduct(Product user) {
        return productRepository.save(user);
    }

    public Product updateProduct(Product product) {
        Optional<Product> productM = productRepository.findById(product.getReference());
        if (productM.isPresent()) {
            Product productUpdate = productM.get();
            productUpdate.setReference(product.getReference());
            productUpdate.setCategory(product.getCategory());
            productUpdate.setDescription(product.getDescription());
            productUpdate.setAvailability(product.getAvailability());
            productUpdate.setPrice(product.getPrice());
            productUpdate.setQuantity(product.getQuantity());
            productUpdate.setPhotography(product.getPhotography());
            return productRepository.save(productUpdate);
        } else {
            throw new ResourceNotFoundException("Product with id: " + product.getReference() + " NotFound");
        }
    }

    public void deleteProduct(String id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            productRepository.delete(product.get());
        } else {
            throw new ResourceNotFoundException("Product with id: " + id + " NotFound");
        }
    }

    public Product getProductById(String id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return product.get();
        } else {
            throw new ResourceNotFoundException("Product with id: " + id + " NotFound");
        }
    }
}
