package co.edu.usa.CRUD.SPRING.MONGO.repository;

import co.edu.usa.CRUD.SPRING.MONGO.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, Long> {
    @Query("{vendedor_zone:?0}")
    List<Order> zone(String zone);

    Order findTopByOrderByIdDesc();
}
