package co.edu.usa.CRUD.SPRING.MONGO.rest;

import co.edu.usa.CRUD.SPRING.MONGO.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order/")
public class OrderRest {

    @Autowired
    private OrderService orderService;


}
