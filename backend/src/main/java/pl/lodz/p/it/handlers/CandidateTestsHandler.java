package pl.lodz.p.it.handlers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.lambda.runtime.Context;
import com.google.gson.Gson;
import org.json.JSONObject;
import pl.lodz.p.it.model.tests.CandidateTests;
import pl.lodz.p.it.model.tests.Test;

import java.util.Map;

/*

{
  "candidateEmail": "sdsd@wp.pl",
  "tests": [
    {
      "testTitle": "elo",
      "testId": "997"
    },
    {
      "testTitle": "Tytul testu - halo",
      "testId": "998"
    },
    {
      "testTitle": "ty no nie wiem ",
      "testId": "999"
    }
  ]
}

 */


public class CandidateTestsHandler {

    private static DynamoDBMapper dynamoDBMapper = new DynamoDBMapper(AmazonDynamoDBClientBuilder.standard().build());

    public String addCandidateTestsHandler(Map<String, Object> input, Context context){

        JSONObject j = new JSONObject(input);
        Gson g = new Gson();

        CandidateTests candidateTests = g.fromJson(j.toString(), CandidateTests.class);

        try {
            dynamoDBMapper.save(candidateTests);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error, CandidateTests not added!";
        }
        return "CandidateTests added";
    }
    public CandidateTests getCandidateTestsHandler(Map<String, Object> input, Context context){
        return dynamoDBMapper.load(CandidateTests.class, input.get("candidateEmail").toString());
    }

    public String deleteCandidateTestsHandler(Map<String, Object> input, Context context) {
        CandidateTests candidateTests = new CandidateTests();
        candidateTests.setCandidateEmail(input.get("candidateEmail").toString());
        try {
            dynamoDBMapper.delete(candidateTests);
        } catch (Exception e) {
            e.printStackTrace();
            return "error - item not deleted!";
        }
        return "item deleted";
    }

    public PaginatedScanList<CandidateTests> getAllCandidateTests(Map<String, Object> input, Context context) {
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        PaginatedScanList<CandidateTests> candidateTests = dynamoDBMapper.scan(CandidateTests.class, scanExpression);
        return candidateTests;
    }
}
