package co.edu.usa.repository;

import co.edu.usa.model.Order;
import co.edu.usa.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    @Query("{description:?0}")
    List<Order> descriptionList(String description);

    @Query("{ price: { $gt:price }}")
    List<Order> priceList(Double price);
}
