package pl.lodz.p.it.handlers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.google.gson.Gson;
import org.json.JSONObject;
import pl.lodz.p.it.model.questions.Question;
import pl.lodz.p.it.model.tests.Test;
import pl.lodz.p.it.translator.YandexError;
import pl.lodz.p.it.translator.YandexTranslator;

import java.io.IOException;
import java.util.Map;

public class TranslateHandler {

    private static DynamoDBMapper dynamoDBMapper = new DynamoDBMapper(AmazonDynamoDBClientBuilder.standard().build());
    
    public String translateTestAndSave(Map<String, Object> input, Context context) {

        JSONObject j = new JSONObject(input);
        Gson g = new Gson();
        
        String fromLang = input.get("fromLang").toString();
        String toLang = input.get("toLang").toString();

        Test test = g.fromJson(j.toString(), Test.class);

        try {
            for (Question question : test.getQuestions()) {
                if (question.getQuestionType().equals("2")){
                    question.setQuestion(YandexTranslator.translateText(question.getQuestion(), fromLang, toLang));
                    for (int i = 0; i < question.getChoices().size(); i++) {
                        question.getChoices().set(i, YandexTranslator.translateText(question.getChoices().get(i), fromLang,
                                toLang));
                    }
                } else {
                    question.setQuestion(YandexTranslator.translateText(question.getQuestion(), fromLang, toLang));
                }
            }
        } catch (IOException | YandexError e) {
            e.printStackTrace();
        }

        test.setTestId(test.getTestId().substring(0, test.getTestId().length() - 2) + toLang);

        try {
            dynamoDBMapper.save(test);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error, test not added!";
        }
        return "Test added";

    }
}
