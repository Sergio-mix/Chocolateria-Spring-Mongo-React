package co.edu.usa.CRUD.SPRING.MONGO.rest;

import co.edu.usa.CRUD.SPRING.MONGO.model.Product;
import co.edu.usa.CRUD.SPRING.MONGO.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chocolate/")
public class ProductRest {

    @Autowired
    private ProductService ProductService;

    @GetMapping("all")
    @ResponseStatus(HttpStatus.OK)
    private List<Product> allProduct() {
        return ProductService.getProduct();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("new")
    private void createPrduct(@RequestBody Product product) {
        ProductService.createProduct(product);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("update")
    private void updateProduct(@RequestBody Product product) {
        ProductService.updateProduct(product);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    private void removeProduct(@PathVariable("id") String id) {
        ProductService.deleteProduct(id);
    }

    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    private void getProduct(@PathVariable("id") String id) {
        ProductService.getProductById(id);
    }


}
