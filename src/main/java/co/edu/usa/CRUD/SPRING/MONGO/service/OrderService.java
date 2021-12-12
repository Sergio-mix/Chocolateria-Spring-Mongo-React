package co.edu.usa.CRUD.SPRING.MONGO.service;


import co.edu.usa.CRUD.SPRING.MONGO.exception.ResourceNotFoundException;
import co.edu.usa.CRUD.SPRING.MONGO.model.Order;
import co.edu.usa.CRUD.SPRING.MONGO.model.Product;
import co.edu.usa.CRUD.SPRING.MONGO.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        if (order.getId() == null)
            order.setId(getNext());
        return orderRepository.save(order);
    }

    public List<Order> allOrder() {
        return orderRepository.findAll();
    }

    public void deleteOrder(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            orderRepository.delete(order.get());
        } else {
            throw new ResourceNotFoundException("Order with id: " + id + " NotFound");
        }
    }

    public Order getOrderById(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        return order.orElse(null);
    }

    public List<Order> allOrder_zone(String zone) {
        return orderRepository.zone(zone);
    }

    public Order updateOrder(Order order) {
        Optional<Order> orderM = orderRepository.findById(order.getId());
        if (orderM.isPresent()) {
            Order orderUpdate = orderM.get();
            orderUpdate.setStatus(order.getStatus());
            return orderRepository.save(orderUpdate);
        } else {
            throw new ResourceNotFoundException("Order with id: " + order.getId() + " NotFound");
        }
    }

    public Long getNext() {
        Order last = orderRepository.findTopByOrderByIdDesc();
        if (last != null) {
            long lastNum = last.getId();
            return lastNum + 1;
        } else {
            return 1L;
        }
    }
}
