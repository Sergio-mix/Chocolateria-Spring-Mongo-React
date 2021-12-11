package co.edu.usa.CRUD.SPRING.MONGO.rest;

import co.edu.usa.CRUD.SPRING.MONGO.model.Order;
import co.edu.usa.CRUD.SPRING.MONGO.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order/")
public class OrderRest {

    @Autowired
    private OrderService orderService;

    @PostMapping("new")
    @ResponseStatus(HttpStatus.CREATED)
    public void createOrder(Order order) {
        orderService.createOrder(order);
    }

    @GetMapping("all")
    @ResponseStatus(HttpStatus.OK)
    public List<Order> allOrder() {
        return orderService.allOrder();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("update")
    private void updateOreder(@RequestBody Order order) {
        orderService.updateOrder(order);
    }


    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    private void removeOrder(@PathVariable("id") Long id) {
        orderService.deleteOrder(id);
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    private Order getOrder(@PathVariable("id") Long id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("zona/{zone}")
    @ResponseStatus(HttpStatus.OK)
    public List<Order> allzone(@PathVariable("zone") String zone) {
        return orderService.allOrder_zone(zone);
    }

}
