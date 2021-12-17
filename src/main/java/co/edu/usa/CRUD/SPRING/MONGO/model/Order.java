package co.edu.usa.CRUD.SPRING.MONGO.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Id;

import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "orderS")
public class Order {

    @Id
    private Long id;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date registerDay;

    private String status;

    private User salesMan;

    private Map<String, Product> products;

    private Map<String, Integer> quantities;
}
