package pl.lodz.p.it.model.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import pl.lodz.p.it.model.questions.AnwserdQuestions;
import pl.lodz.p.it.model.questions.Question;

import java.util.ArrayList;

@DynamoDBDocument
@DynamoDBTable(tableName = "SolvedTests")
public class SolvedTests {

    private String testTitle;
    private String testId;
    private ArrayList<AnwserdQuestions> questions;
    private String candidateEmail;
    private String points;
    private String recruiterEmail;

    public SolvedTests(ArrayList<AnwserdQuestions> questions, String testId, String testTitle) {
        this.testId = testId;
        this.questions = questions;
        this.testTitle = testTitle;
    }

    public SolvedTests() {
    }

    @DynamoDBHashKey(attributeName = "TestId")
    public String getTestId() {
        return testId;
    }

    public void setTestId(String testId) {
        this.testId = testId;
    }

    @DynamoDBAttribute(attributeName = "Questions")
    public ArrayList<AnwserdQuestions> getQuestions() {
        return questions;
    }

    public void setQuestions(ArrayList<AnwserdQuestions> questions) {
        this.questions = questions;
    }

    @DynamoDBAttribute(attributeName = "CandidateEmail")
    public String getCandidateEmail() {
        return candidateEmail;
    }

    public void setCandidateEmail(String candidateEmail) {
        this.candidateEmail = candidateEmail;
    }

    @DynamoDBAttribute(attributeName = "Points")
    public String getPoints() {
        return points;
    }

    public void setPoints(String points) {
        this.points = points;
    }

    @DynamoDBAttribute(attributeName = "RecruterEmail")
    public String getRecruterEmail() {
        return recruiterEmail;
    }

    public void setRecruterEmail(String recruterEmail) {
        this.recruiterEmail = recruterEmail;
    }

    @DynamoDBAttribute(attributeName = "TestTitle")
    public String getTestTitle() {
        return testTitle;
    }

    public void setTestTitle(String testTitle) {
        this.testTitle = testTitle;
    }

    public void addQuestion(AnwserdQuestions question) {
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
