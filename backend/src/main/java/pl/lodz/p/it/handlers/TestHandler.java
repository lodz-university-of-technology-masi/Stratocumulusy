package pl.lodz.p.it.handlers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.lambda.runtime.Context;
import com.google.gson.Gson;
import org.json.JSONObject;
import pl.lodz.p.it.model.tests.Test;

import java.util.Map;

/*
Format json'a - przyklad

{
    "testTitle":"Tytul testu - halo",
	"testId":"5",
	"questions":[
		{
		"QuestionID":"1",
		"question":"Jakie masz hobby?",
		"questionType":"1",
		"correctAnswer":""
		},
		{
		"QuestionID":"2",
		"question":"co to jest tuńczyk?",
		"questionType":"2",
		"correctAnswer":"ryba",
		"choices":[
			"ryba",
			"ptak",
			"koń",
			"jaszczurka"
			]},
		{
		"QuestionID":"3",
		"question":"ile to 2+2?",
		"questionType":"3",
		"correctAnswer":"4"
		}
	]
}
 */



public class TestHandler {

    private static DynamoDBMapper dynamoDBMapper = new DynamoDBMapper(AmazonDynamoDBClientBuilder.standard().build());

    public String addTestHandler(Map<String, Object> input, Context context){

        JSONObject j = new JSONObject(input);
        Gson g = new Gson();

        Test test = g.fromJson(j.toString(), Test.class);

        try {
            dynamoDBMapper.save(test);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error, test not added!";
        }
        return "Test added";
    }

    public Test getTestHandler(Map<String, Object> input, Context context){
        return dynamoDBMapper.load(Test.class, input.get("testId").toString());
    }

    public String deleteTestHandler(Map<String, Object> input, Context context) {
        Test test = new Test();
        test.setTestId(input.get("testId").toString());
        try {
            dynamoDBMapper.delete(test);
        } catch (Exception e) {
            e.printStackTrace();
            return "error - item not deleted!";
        }
        return "item deleted";
    }

    public PaginatedScanList<Test> getAllTests(Map<String, Object> input, Context context) {
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        PaginatedScanList<Test> tests = dynamoDBMapper.scan(Test.class, scanExpression);
        return tests;
    }
}
