package pl.lodz.p.it.model.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import pl.lodz.p.it.model.questions.Question;

import java.util.ArrayList;

@DynamoDBTable(tableName = "EmptyTests")
public class Test {

    private String testId;
    private ArrayList<Question> questions;

    public Test(ArrayList<Question> questions, String testId) {
        this.testId = testId;
        this.questions = questions;
    }

    public Test() {
    }

    @DynamoDBHashKey(attributeName = "TestId")
    public String getTestId() {
        return testId;
    }

    public void setTestId(String testId) {
        this.testId = testId;
    }

    @DynamoDBAttribute(attributeName = "Questions")
    public ArrayList<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(ArrayList<Question> questions) {
        this.questions = questions;
    }

    public void addQuestion(Question question) {
        questions.add(question);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Test{");
        sb.append("testId='").append(testId).append('\'');
        sb.append(", questions=").append(questions);
        sb.append('}');
        return sb.toString();
    }
}
