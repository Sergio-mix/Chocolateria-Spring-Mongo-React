package co.edu.usa.CRUD.SPRING.MONGO.service;

import co.edu.usa.CRUD.SPRING.MONGO.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    
}
