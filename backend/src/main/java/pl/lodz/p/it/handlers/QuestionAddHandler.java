package pl.lodz.p.it.handlers;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.*;
import com.google.gson.Gson;
import org.json.JSONObject;
import pl.lodz.p.it.model.Question;

import java.util.Map;

public class QuestionAddHandler {
    private static DynamoDBMapper dynamoDBMapper = new DynamoDBMapper(AmazonDynamoDBClientBuilder.standard().build());

    public String addQuestionHandler(Map<String, Object> input, Context context){
        Question question1 = new Question(input.get("QuestionID").toString(), input.get("question").toString(), input.get(
                "questionType").toString(), input.get("correctAnswer").toString());
        dynamoDBMapper.save(question1);
        JSONObject jsonObject = new JSONObject();
        jsonObject.append("error", "ok!");
        return jsonObject.toString();
    }

    public String getQuestionHandler(Map<String, Object> input, Context context){

        Question question = dynamoDBMapper.load(Question.class, input.get("QuestionID").toString());
        JSONObject jsonObject = new JSONObject();
        Gson gson = new Gson();

        return gson.toJson(question);
    }

}
