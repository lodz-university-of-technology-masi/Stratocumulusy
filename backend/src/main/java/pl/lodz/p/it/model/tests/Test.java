package pl.lodz.p.it.model.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import pl.lodz.p.it.model.questions.Question;

import java.util.ArrayList;

@DynamoDBDocument
@DynamoDBTable(tableName = "EmptyTests")
public class Test {

    private String testTitle;
    private String testId;
    private ArrayList<Question> questions;
    private String recruiterEmail;


    public Test(ArrayList<Question> questions, String testId, String testTitle) {
        this.testId = testId;
        this.questions = questions;
        this.testTitle = testTitle;
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

    @DynamoDBAttribute(attributeName = "TestTitle")
    public String getTestTitle() {
        return testTitle;
    }

    public void setTestTitle(String testTitle) {
        this.testTitle = testTitle;
    }

    public void addQuestion(Question question) {
        questions.add(question);
    }

    @DynamoDBAttribute(attributeName = "RecruiterEmail")
    public String getRecruiterEmail() {
        return recruiterEmail;
    }

    public void setRecruiterEmail(String recruiterEmail) {
        this.recruiterEmail = recruiterEmail;
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
