package co.edu.usa.CRUD.SPRING.MONGO.repository;

import co.edu.usa.CRUD.SPRING.MONGO.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {


}
