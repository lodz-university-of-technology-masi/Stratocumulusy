package pl.lodz.p.it;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

public class Handler {
    static AmazonDynamoDB client = AmazonDynamoDBClientBuilder.standard().build();

    Question question = new Question("1","Co żołnierz ma w spodniach?", "O", "Chodzic XD");
    DynamoDBMapper mapper = new DynamoDBMapper(client);

    // Cos sie popsuło
    //mapper.save(question);


}
