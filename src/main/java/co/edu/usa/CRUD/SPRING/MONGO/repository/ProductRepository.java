package co.edu.usa.CRUD.SPRING.MONGO.repository;

import co.edu.usa.CRUD.SPRING.MONGO.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository  extends MongoRepository<Product,String> {
}
